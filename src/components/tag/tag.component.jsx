import './tag.styles.scss';

import { TagFiltersContext } from '../../contexts/tagFilters.context';
import { useContext } from 'react';

const Tag = ( { tag } ) => {

	const { onTagSelected, onTagDeselected } = useContext( TagFiltersContext );

	const handleTagChange = (e) => {
		if ( e.target.checked ) {
			onTagSelected( tag.name );
		} else {
			onTagDeselected( tag.name );
		}
	};

	return (
		<div className="tag">
			<label>
				<input type="checkbox" className="tag-checkbox" value={tag.name} onChange={handleTagChange} />
				<span className="tag-name">{tag.name}</span> <span className="tag-quantity">{tag.quantity}</span>
			</label>
		</div>
	);

};

export default Tag;
