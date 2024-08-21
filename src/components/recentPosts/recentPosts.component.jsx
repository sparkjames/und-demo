import './recentPosts.styles.scss';

import { useEffect, useState } from 'react';

import PostCard from '../postCard/postCard.component';
import TagList from '../tagList/tagList.component';

// https://blog.logrocket.com/create-responsive-masonry-layouts-react-app/
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// TODO
// https://github.com/andreasbm/masonry-layout

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

const RecentPosts = () => {

	const [posts, setPosts] = useState([]);
	const [tags, setTags] = useState([]);

	/**
	 * Fetch the social media posts when the app starts.
	 */
	useEffect( () => {

		/**
		 * The social media endpoint needs a start date and end date 
		 * in YYYY-MM-DD format. Use today's date and the date from
		 * two days ago for these values.
		 */
		const todayDate = new Date();
		const twoDaysAgoDate = new Date();
		twoDaysAgoDate.setDate( twoDaysAgoDate.getDate() - 2);

		const startDate = twoDaysAgoDate.toISOString().split('T')[0];
		const endDate = todayDate.toISOString().split('T')[0];

		const fetchPosts = async () => {
			
			fetch(`https://apps.und.edu/demo/public/index.php/post?from=${startDate}&to=${endDate}`)
				.then( (response) => response.json() )
				.then( (newPosts) => setPosts( Array.from(newPosts) ) )
				.catch( (error) => console.error(error) );

		};
		fetchPosts();
	}, []);

	/**
	 * Scan for tags when the posts are updated.
	 */
	useEffect( () => {
		if ( posts.length ){
			let newTags = [];

			const tagPattern = /#[\S][^,; ]+/g;

			posts.forEach( (post) => {
				const matches = post.message.matchAll( tagPattern );
				// console.log( 'matches = ', matches );

				for ( const match of matches ) {
					// console.log(`Found ${match[0]}`,);
					// console.log('match = ', match);
					newTags = addTag( newTags, match[0] );
				}
			});

			console.table(newTags);
			setTags(newTags);

		}
	}, [posts]);

	return (
		<section className="recentPosts">
			<div className="recentPosts-container container">

				<h2 className="recentPosts-primaryHeading">Recent Posts</h2>

				<TagList tags={tags}></TagList>

				{ posts && 
				<ResponsiveMasonry
        columnsCountBreakPoints={{ 500: 2, 850: 3, 1250: 4 }}
      	>
					<Masonry columnsCount={4} gutter="40px" className="recentPosts-grid">
						{ posts && posts.map( (thisPost) => {
						return (
							<PostCard key={thisPost.id} post={thisPost}></PostCard>
						);
					})}
					</Masonry>
				</ResponsiveMasonry>
				}

			</div>
    </section>
	);
};

export default RecentPosts;
