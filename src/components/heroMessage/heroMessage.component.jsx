import './heroMessage.styles.scss';

// TODO Get new images with portrait orientation for the other slides. Need to be big enough for the single column layout at ~800px.

// Sub ~500px screens have some wonky heroMessage heights.

const HeroMessage = ( {message} ) => {
	const { heading, subheading, description, contentImage, imageAlt, backgroundColor, textColor } = message;

	return (
		<div className={`hero-message hero-message--${textColor}`} style={{backgroundColor: backgroundColor}}>
			<div className="hero-messageContainer container">

				<div className="hero-messageArrow"></div>

				{ contentImage &&
				<div className="hero-contentImageContainer">
					<img className="hero-contentImage" src={ contentImage } width="1280" height="720" alt={imageAlt} />
				</div>
				}

				<div className="hero-contentContainer">

					<h2 className="hero-heading">{heading}</h2>
					{ subheading && 
					<p className="hero-subheading">{subheading}</p>
					}
					<p className="hero-description">{description}</p>
				</div>

			</div>
		</div>
	);
};

export default HeroMessage;
