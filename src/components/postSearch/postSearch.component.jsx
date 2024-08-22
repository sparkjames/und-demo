import { useContext, useRef } from 'react';
import './postSearch.styles.scss';

import { PostSearchFilterContext } from '../../contexts/postSearchFilter.context';

const PostSearch = () => {

	const searchUpdateTimeoutRef = useRef( null );

	const { setPostSearchFilter } = useContext( PostSearchFilterContext );

	const searchInputOnChange = ( e ) => {

		clearTimeout(searchUpdateTimeoutRef.current);
		searchUpdateTimeoutRef.current = setTimeout( () => {
			setPostSearchFilter( e.target.value );
		}, 300 );

	};

	return (
		<div className="postSearch">
			<input onChange={searchInputOnChange} className="postSearch-input" type="search" placeholder="Search for posts&hellip;" />
		</div>
	);

};

export default PostSearch;
