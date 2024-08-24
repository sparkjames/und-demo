import './recentPosts.styles.scss';

import GridOnIcon from '@mui/icons-material/GridOn';
import GridViewIcon from '@mui/icons-material/GridView';

import { useEffect, useState, useContext } from 'react';

import { TagFiltersContext } from '../../contexts/tagFilters.context';
import { PostSearchFilterContext } from '../../contexts/postSearchFilter.context';

import PostCard from '../postCard/postCard.component';
import PostSearch from '../postSearch/postSearch.component';
import TagList from '../tagList/tagList.component';

/**
 * Using React Responsive Masonry for the layout.
 * @link https://blog.logrocket.com/create-responsive-masonry-layouts-react-app/
 */
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const RecentPosts = () => {

	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [postViewType, setPostViewType] = useState('detailed');
	const [columnBreakpoints, setColumnBreakpoints] = useState({ 820: 2, 1120: 3, 1360: 4 })

	// Get the array of selected tags to filter the grid of posts.
	const { selectedTags } = useContext( TagFiltersContext );

	// Get the value of the search filter.
	const { postSearchFilter } = useContext( PostSearchFilterContext );

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
	 * Keep a copy of the posts array that gets filtered by the search field and tags.
	 */
	useEffect( () => {

		const newFilteredPosts = posts
			// Filter the posts by the selected tags.
			.filter( (post) => {
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
			})
			// And filter the posts that match the search input value.
			.filter( (post) => {
				if ( postSearchFilter ) {
					if ( post.message.toLowerCase().includes(postSearchFilter.toLowerCase()) ) {
						return true;
					}
					return false;
				}
				return true;
			});

			setFilteredPosts( newFilteredPosts );

	}, [posts, postSearchFilter, selectedTags]);

	const viewControlOnChange = (e) => {
		setPostViewType( e.target.value );
	};

	useEffect( () => {
		const detailedBreakpoints = { 820: 2, 1120: 3, 1360: 4 };
		const condensedBreakpoints = { 720: 2, 1020: 3, 1260: 4 };

		if ( postViewType === 'condensed' ) {
			setColumnBreakpoints(condensedBreakpoints);

		} else {
			setColumnBreakpoints(detailedBreakpoints);
		}
	}, [postViewType]);

	return (
		<section className={`recentPosts recentPosts--${postViewType}`}>
			<div className="recentPosts-container container">

				<header className="recentPosts-header">

					<h2 className="recentPosts-primaryHeading">Recent Posts</h2>

					<div className="recentPosts-viewControls">

						<label className="recentPosts-viewControl recentPosts-viewControl--condensed" title="Switch to Condensed View">
							<input type="radio" className="recentPosts-viewControlRadio" name="viewControl" value="condensed" onClick={viewControlOnChange} />
							<i className="recentPosts-viewControlIcon"><GridOnIcon></GridOnIcon></i>
						</label>

						<label className="recentPosts-viewControl recentPosts-viewControl--detailed" title="Switch to Detailed View">
							<input type="radio" className="recentPosts-viewControlRadio" name="viewControl" value="detailed" onClick={viewControlOnChange} defaultChecked />
							<i className="recentPosts-viewControlIcon"><GridViewIcon></GridViewIcon></i>
						</label>

					</div>

				</header>

				<div className="recentPosts-body">

					<aside className="recentPosts-sidebar">
						<PostSearch></PostSearch>

						<TagList posts={posts}></TagList>
					</aside>

					{ filteredPosts.length > 0 && 
					<ResponsiveMasonry
					columnsCountBreakPoints={columnBreakpoints} className="recentPosts-gridContainer">
						<Masonry columnsCount={4} gutter="40px" className="recentPosts-grid">
							{ filteredPosts.map( (thisPost) => {
								return (
										<PostCard key={thisPost.id} post={thisPost} viewType={postViewType}></PostCard>
									);
								})
							}
						</Masonry>
					</ResponsiveMasonry>
					}
					
					{ ! filteredPosts.length && 
					<div className="recentPosts-noResults">
						<p className="recentPosts-noResultsMessage">No results.</p>
					</div>
					}

				</div>

			</div>
    </section>
	);
};

export default RecentPosts;
