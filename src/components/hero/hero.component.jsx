import './hero.styles.scss';

const Hero = () => {
	return (
		<section className="hero">
      <div className="hero-container container">

        <h1 className="hero-primaryHeading">Leading with Purpose</h1>

        <div className="hero-message hero-message-1">
          <h2 className="hero-heading">President's Endorsement</h2>
          <p className="hero-subheading">Message from the President</p>
          <p className="hero-description">We are thrilled to announce our unwavering support for the University's latest social media campaign. This initiative signifies a crucial opportunity for our community to unite, interact, and effect significant change. Have thoughts or feedback on our campaign goals? We'd love to hear from you!</p>
        </div>

        <div className="hero-message hero-message-2">
          <h2 className="hero-heading">Campaign Goals</h2>
          <p className="hero-subheading">Empowering Engagement:</p>
          <p className="hero-description">Our primary aim is to foster a vibrant online community where every voice is heard and valued. Through active participation and collaboration, we can amplify our collective impact and bring about positive change.</p>
        </div>

        <div className="hero-message hero-message-3">
          <h2 className="hero-heading">Promoting Diversity and Inclusion:</h2>
          <p className="hero-description">Diversity is our strength, and inclusivity is our foundation. We strive to create an inclusive online space that celebrates diverse perspectives, cultures, and experiences. Together, we can build a community where everyone feels welcome and respected.</p>
        </div>

        <div className="hero-message hero-message-4">
          <h2 className="hero-heading">Driving Innovation:</h2>
          <p className="hero-subheading">Message from the President</p>
          <p className="hero-description">Innovation drives progress, and social media is a powerful tool for sparking creativity and innovation. We encourage innovative thinking and bold ideas that push the boundaries of what's possible. Let's harness the power of social media to drive positive change and innovation in our community and beyond.</p>
        </div>

        <div className="hero-cta">
          <a href="https://und.edu/social-media" className="hero-ctaLink">Share your thoughts and feedback.</a>
        </div>

      </div>
    </section>
	);
};

export default Hero;
