import { useEffect, useState } from 'react';
import './recentArticles.styles.scss';

const RecentArticles = () => {

	const [articles, setArticles] = useState([]);

	useEffect( () => {
		const fetchArticles = async () => {
			
			fetch("https://apps.und.edu/demo/public/index.php/post?from=2024-08-12&to=2024-08-14")
				.then( (response) => response.json() )
				.then( (newArticles) => setArticles( Array.from(newArticles) ) )
				.catch( (error) => console.error(error) );

		};
		fetchArticles();
	}, []);

	return (
		<section className="recentArticles">
      { articles && articles.map( (thisArticle) => {
				return (
					<p>{thisArticle.message}</p>
				);
			})}
    </section>
	);
};

export default RecentArticles;
