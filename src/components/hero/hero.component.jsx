import './hero.styles.scss';

import HeroContent from '../../content/hero.json';

const Hero = () => {
	return (
		<section className="hero">

			<h1 className="hero-primaryHeading container">
				{HeroContent.primaryHeading}
			</h1>

			{ HeroContent.content.map( (heroSection, i) => {
				const { heading, subheading, description, contentImage, backgroundImage, backgroundColor, textColor } = heroSection;
				return (
					<div key={i} className={`hero-message hero-message-${i} hero-message--${textColor}`} style={{backgroundColor: backgroundColor}}>
						<div className="hero-messageContainer container">

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
			}) }

			<div className="hero-cta">
				<a href={HeroContent.cta.url} className="hero-ctaLink">{HeroContent.cta.title}</a>
			</div>

    </section>
	);
};

export default Hero;
