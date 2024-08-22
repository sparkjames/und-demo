import './postCard.styles.scss';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ReplayIcon from '@mui/icons-material/Replay';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

			<p className="postCard-message">{ message }</p>

			<div className="postCard-userInfo">
				{ image &&
				<figure className="postCard-figure">
					<img className="postCard-image" src={ image } alt={ `Avatar for ${username}` } />
				</figure>
				}
				<h4 className="postCard-author">{ author }</h4>
				<p className="postCard-username">@{ username }</p>
			</div>

			<p className="postCard-date">{ `${humanReadableDate} at ${humanReadableTime}` }</p>

			<footer className="postCard-footer">

				<div className="postCard-engagement">

					<button className="postCard-engagementButton postCard-engagementButton--likes" type="button">
						<i className="postCard-icon"><ThumbUpIcon></ThumbUpIcon></i>
						<div className="postCard-tooltip">{ `${likes} like${likes > 1 ? 's' : ''}` }</div>
					</button>

					<button className="postCard-engagementButton postCard-engagementButton--reposts" type="button">
						<i className="postCard-icon"><ReplayIcon></ReplayIcon></i>
						<div className="postCard-tooltip">{ `${reposts} repost${reposts > 1 ? 's' : ''}` }</div>
					</button>

					<button className="postCard-engagementButton postCard-engagementButton--location" type="button">
						<i className="postCard-icon"><LocationOnIcon></LocationOnIcon></i>
						<div className="postCard-tooltip">Posted from { location }</div>
					</button>

				</div>

			</footer>
      
    </article>
	);
};

export default PostCard;
