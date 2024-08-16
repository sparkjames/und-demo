import './hero.styles.scss';

import HeroContent from '../../content/hero.json';

const Hero = () => {
	return (
		<section className="hero">

			<h1 className="hero-primaryHeading">
				{HeroContent.primaryHeading}
			</h1>

			{ HeroContent.content.map( (heroSection, i) => {
				const { heading, subheading, description, backgroundImage, backgroundColor } = heroSection;
				return (
					<div key={i} className={`hero-message hero-message-${i}`} style={{backgroundColor: backgroundColor}}>
						
						{ backgroundImage &&
						<img className="hero-backgroundImage" src={backgroundImage} width="1280" height="720" alt="TODO temporary placeholder" />
						}

						<div className="hero-messageContainer container">
							<h2 className="hero-heading">{heading}</h2>
							{ subheading && 
							<p className="hero-subheading">{subheading}</p>
							}
							<p className="hero-description">{description}</p>
						</div>

					</div>
				);
			}) }

			<div className="hero-cta">
				<a href={HeroContent.cta.url}className="hero-ctaLink">{HeroContent.cta.title}</a>
			</div>

    </section>
	);
};

export default Hero;
