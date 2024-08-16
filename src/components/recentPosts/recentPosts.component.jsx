import './recentPosts.styles.scss';

import { useEffect, useState } from 'react';

import PostCard from '../postCard/postCard.component';

const RecentPosts = () => {

	const [posts, setPosts] = useState([]);

	useEffect( () => {
		const fetchPosts = async () => {
			
			fetch("https://apps.und.edu/demo/public/index.php/post?from=2024-08-12&to=2024-08-14")
				.then( (response) => response.json() )
				.then( (newPosts) => setPosts( Array.from(newPosts) ) )
				.catch( (error) => console.error(error) );

		};
		fetchPosts();
	}, []);

	return (
		<section className="recentPosts">
      { posts && posts.map( (thisPost) => {
				return (
					<PostCard key={thisPost.id} post={thisPost}></PostCard>
				);
			})}
    </section>
	);
};

export default RecentPosts;
