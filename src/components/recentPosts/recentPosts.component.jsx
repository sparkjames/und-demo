import './recentPosts.styles.scss';

import { useEffect, useState } from 'react';

import PostCard from '../postCard/postCard.component';

// TODO
// https://github.com/andreasbm/masonry-layout

const RecentPosts = () => {

	const [posts, setPosts] = useState([]);

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

				{ posts && 
				<div className="recentPosts-grid">
					{ posts && posts.map( (thisPost) => {
					return (
						<PostCard key={thisPost.id} post={thisPost}></PostCard>
					);
				})}
				</div>
				}

			</div>
    </section>
	);
};

export default RecentPosts;
