import './heroMessage.styles.scss';

const HeroMessage = ( {message} ) => {
	const { heading, subheading, description, contentImage, backgroundImage, backgroundColor, textColor } = message;
	
	// TODO: The image around here called "backgroundImage" turned into a "slideImage", change the name when possible.

	return (
		<div className={`hero-message hero-message--${textColor}`} style={{backgroundColor: backgroundColor}}>
			<div className="hero-messageContainer container">

				<div className="hero-messageArrow"></div>

				{ backgroundImage &&
				<div className="hero-backgroundImageContainer">
					<img className="hero-backgroundImage" src={ backgroundImage } width="1280" height="720" alt="TODO temporary placeholder" />
				</div>
				}

				<div className="hero-contentContainer">

					{ contentImage &&
					<img className="hero-contentImage" src={ contentImage } width="268" height="400" alt="TODO temporary placeholder" />
					}

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
