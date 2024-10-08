import './tagList.styles.scss';

import Tag from '../tag/tag.component';
import { useEffect, useState } from 'react';

/**
 * Handle building the array of tags to display.
 * @param {*} tags 
 * @param {*} tagNameToAdd 
 * @returns 
 */
const addTag = ( tags = [], tagNameToAdd ) => {

	// Check if the tagNameToAdd already exists in the array.
	const existingTag = tags.find( (tag) => tag.name === tagNameToAdd );

	// If the tag exists, increment the quantity...
	if ( existingTag ) {
		return tags.map( (tag) => 
			tag.name === tagNameToAdd ? {...tag, quantity: tag.quantity + 1 } : tag
		);
	}
	
	// ... otherwise return an array with the added tag.
	return [...tags, {
		name: tagNameToAdd,
		quantity: 1,
	}]
};

const TagList = ( {posts} ) => {

	const [tags, setTags] = useState([]);
	const [showAllTags, setShowAllTags] = useState(undefined);

	/**
	 * Toggle whether or not all the tags are showing, or just the top 10.
	 */
	const onClickToggleShowAll = (e) => {
		if ( showAllTags ) {
			setShowAllTags(undefined);
		} else {
			setShowAllTags(10);
		}
	};

	/**
	 * Scan for tags when the posts are updated.
	 */
	useEffect( () => {
		if ( posts.length ){
			let newTags = [];

			const tagPattern = /#[\S][^,;!.? ]+/g;

			posts.forEach( (post) => {
				const matches = post.message.matchAll( tagPattern );
				// console.log( 'matches = ', matches );

				for ( const match of matches ) {
					newTags = addTag( newTags, match[0] );
				}
			});

			// console.table(newTags);
			setTags(newTags);

		}
	}, [posts]);

	// console.log('showAllTags = ', showAllTags);
	// console.log(tags.slice(showAllTags));

	return (
		<div className="recentPosts-tags">
			{
				// Output the tags ordered by quantity.
				tags.length && tags
				.sort( (a, b) => b.quantity - a.quantity )
				.slice(0, showAllTags)
				.map( (tag, i) =>
				<Tag key={i} tag={tag}></Tag>
				)
			}

			<button className="recentPosts-toggleShowAll" type="button" onClick={onClickToggleShowAll}>
				{ showAllTags ? 'Show all' : 'Show fewer' }
			</button>
		</div>
	);

};

export default TagList;
