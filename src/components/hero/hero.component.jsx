import './hero.styles.scss';

import HeroContent from '../../content/hero.json';

import { useRef } from 'react';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
  
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroMessage from '../heroMessage/heroMessage.component';

gsap.registerPlugin(useGSAP,ScrollTrigger);

const Hero = () => {

	const heroMessageContainer = useRef();
	const heroMessages = useRef([]);

	useGSAP( () => {
		console.log('START GSAP');
		console.log('heroMessageContainer = ', heroMessageContainer.current);
		console.log('heroMessages = ', heroMessages.current);

		// let sections = gsap.utils.toArray(".panel");

		// gsap.to('.hero-message:not(.hero-message-0)', {
		// 	xPercent: -100 * (HeroContent.content.length - 1),
		// 	ease: "none",
		// 	scrollTrigger: {
		// 		trigger: ".hero-message-1",
		// 		pin: true,
		// 		scrub: 1,
		// 		// snap: 1 / (HeroContent.content.length - 1),
		// 		end: () => "+=" + heroMessageContainer.current.offsetWidth
		// 	}
		// });

	}, { scope: heroMessageContainer });

	return (
		<section className="hero" ref={heroMessageContainer}>

			<h1 className="hero-primaryHeading container">
				{HeroContent.primaryHeading}
			</h1>

			{ HeroContent.content.map( (heroMessage, i) => {
				// const { heading, subheading, description, contentImage, backgroundImage, backgroundColor, textColor } = heroMessage;
				return (
					<HeroMessage key={i} message={heroMessage}></HeroMessage>
					// <div key={i} className={`hero-message hero-message-${i} hero-message--${textColor}`} style={{backgroundColor: backgroundColor}}>
					// 	<div className="hero-messageContainer container">

					// 		{ backgroundImage &&
					// 		<div className="hero-backgroundImageContainer">
					// 			<img className="hero-backgroundImage" src={ backgroundImage } width="1280" height="720" alt="TODO temporary placeholder" />
					// 		</div>
					// 		}

					// 		<div className="hero-contentContainer">

					// 			{ contentImage &&
					// 			<img className="hero-contentImage" src={ contentImage } width="268" height="400" alt="TODO temporary placeholder" />
					// 			}

					// 			<h2 className="hero-heading">{heading}</h2>
					// 			{ subheading && 
					// 			<p className="hero-subheading">{subheading}</p>
					// 			}
					// 			<p className="hero-description">{description}</p>
					// 		</div>

					// 	</div>
					// </div>
				);
			}) }

			<div className="hero-cta">
				<a href={HeroContent.cta.url} className="hero-ctaLink">{HeroContent.cta.title}</a>
			</div>

    </section>
	);
};

export default Hero;
