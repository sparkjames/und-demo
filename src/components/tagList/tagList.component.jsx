import './tagList.styles.scss';

import Tag from '../tag/tag.component';

const TagList = ( {tags} ) => {

	return (
		<div className="recentPosts-tags">
			{
				tags.length && tags.map( (tag) =>
				<Tag tag={tag}></Tag>
				)
			}
		</div>
	);

};

export default TagList;
