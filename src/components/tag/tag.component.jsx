import './tag.styles.scss';

const Tag = ( { tag } ) => {

	return (
		<div className="tag">{tag.name} {tag.quantity}</div>
	);

};

export default Tag;
