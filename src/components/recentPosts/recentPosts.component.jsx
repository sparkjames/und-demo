import './recentPosts.styles.scss';

import { useEffect, useState, useContext } from 'react';

import { TagFiltersContext } from '../../contexts/tagFilters.context';
import PostCard from '../postCard/postCard.component';
import TagList from '../tagList/tagList.component';

/**
 * Using React Responsive Masonry for the layout.
 * @link https://blog.logrocket.com/create-responsive-masonry-layouts-react-app/
 */
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const RecentPosts = () => {

	const [posts, setPosts] = useState([]);

	// Get the array of selected tags to filter the grid of posts.
	const { selectedTags } = useContext( TagFiltersContext );

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

	return (
		<section className="recentPosts">
			<div className="recentPosts-container container">

				<h2 className="recentPosts-primaryHeading">Recent Posts</h2>

				<div className="recentPosts-body">

					<TagList posts={posts}></TagList>

					{ posts && 
					<ResponsiveMasonry
					columnsCountBreakPoints={{ 500: 2, 850: 3, 1250: 4 }}>
						<Masonry columnsCount={4} gutter="40px" className="recentPosts-grid">
							{/* TODO Filter this output via selectedTags */}
							{ posts && posts.filter( (post) => {
								let useThisPost = true;
								if ( selectedTags.length > 0 ) {
									useThisPost = false;
									selectedTags.forEach( (selectedTag) => {
										if ( post.message.includes(selectedTag) ) {
											useThisPost = true;
										}
									});
								}
								return useThisPost;
							}).map( (thisPost) => {
							return (
								<PostCard key={thisPost.id} post={thisPost}></PostCard>
							);
						})}
						</Masonry>
					</ResponsiveMasonry>
					}

				</div>

			</div>
    </section>
	);
};

export default RecentPosts;
