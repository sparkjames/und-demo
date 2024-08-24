import './tag.styles.scss';

import { TagFiltersContext } from '../../contexts/tagFilters.context';
import { useContext, useEffect } from 'react';

const Tag = ( { tag } ) => {

	const { selectedTags, onTagSelected, onTagDeselected } = useContext( TagFiltersContext );

	const handleTagChange = (e) => {
		if ( e.target.checked ) {
			onTagSelected( tag.name );
		} else {
			onTagDeselected( tag.name );
		}
	};

	useEffect( () => {
		// Update which checkboxes are checked since the tags can be selected by clicking the message text too. The checkbox state should match those clicks.

	}, [selectedTags]);

	return (
		<div className="tag">
			<label className="tag-label">
				<input type="checkbox" className="tag-checkbox" value={tag.name} onChange={handleTagChange} checked={ selectedTags.indexOf(tag.name) >= 0 } />
				<span className="tag-name">{tag.name}</span> <span className="tag-quantity">{tag.quantity}</span>
			</label>
		</div>
	);

};

export default Tag;
