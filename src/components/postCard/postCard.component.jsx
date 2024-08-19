import './postCard.styles.scss';

const PostCard = ( {post} ) => {

	// Pull all of the post properties.
	const { date, message, author, image, username, location, likes, reposts } = post;

	// Format the date to be more readable.
	const dateObj = new Date( date );
	const humanReadableDate = dateObj.toLocaleDateString( 'en-US', {
		dateStyle: "medium",
	});
	const humanReadableTime = dateObj.toLocaleTimeString( 'en-US', {
		timeStyle: "short"
	} );

	return (
		<article className="postCard">
			<header className="postCard-header">
				<p className="postCard-date">{ `${humanReadableDate} at ${humanReadableTime}` }</p>
				<p className="postCard-location">{ location }</p>
			</header>

			<p className="postCard-message">{ message }</p>

			<footer className="postCard-footer">

				<div className="postCard-userInfo">
					{ image &&
					<figure className="postCard-figure">
						<img className="postCard-image" src={ image } alt={ `Avatar for ${username}` } />
					</figure>
					}
					<h4 className="postCard-author">{ author }</h4>
					<p className="postCard-username">@{ username }</p>
				</div>

				<div className="postCard-engagement">
					<div className="postCard-likes">{ `${likes} like${likes > 1 ? 's' : ''}` }</div>
					<div className="postCard-reposts">{ `${reposts} repost${reposts > 1 ? 's' : ''}` }</div>
				</div>

			</footer>
      
    </article>
	);
};

export default PostCard;
