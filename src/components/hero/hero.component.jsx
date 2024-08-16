import './hero.styles.scss';

import HeroContent from '../../content/hero.json';

const Hero = () => {
	return (
		<section className="hero">
      <div className="hero-container container">

        <h1 className="hero-primaryHeading">
					{HeroContent.primaryHeading}
				</h1>

				{ HeroContent.content.map( (heroSection, i) => {
					return (
						<div key={i} className={`hero-message hero-message-${i}`}>
							<h2 className="hero-heading">{heroSection.heading}</h2>
							{ heroSection.subheading && 
							<p className="hero-subheading">{heroSection.subheading}</p>
							}
							<p className="hero-description">{heroSection.description}</p>
						</div>
					);
				}) }

        <div className="hero-cta">
          <a href={HeroContent.cta.url}className="hero-ctaLink">{HeroContent.cta.title}</a>
        </div>

      </div>
    </section>
	);
};

export default Hero;
