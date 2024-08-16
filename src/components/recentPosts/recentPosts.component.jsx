import { useEffect, useState } from 'react';
import './recentPosts.styles.scss';

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
					<p>{thisPost.message}</p>
				);
			})}
    </section>
	);
};

export default RecentPosts;
