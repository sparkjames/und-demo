import './heroMessage.styles.scss';

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
