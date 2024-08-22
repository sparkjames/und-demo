import './postSearch.styles.scss';

const PostSearch = () => {

	const searchInputOnChange = (e) => {

	};

	return (
		<div className="postSearch">
			<input onChange={searchInputOnChange} className="postSearch-input" type="search" placeholder="Search for posts&hellip;" />
		</div>
	);

};

export default PostSearch;
