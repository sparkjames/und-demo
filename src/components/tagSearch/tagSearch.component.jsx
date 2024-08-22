import './tagSearch.styles.scss';

const TagSearch = () => {

	const searchInputOnChange = (e) => {

	};

	return (
		<div className="tagSearch">
			<input onChange={searchInputOnChange} className="tagSearch-input" type="search" placeholder="Type to search posts&hellip;" />
		</div>
	);

};

export default TagSearch;
