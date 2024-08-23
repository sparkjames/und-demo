import './hero.styles.scss';

import HeroContent from '../../content/hero.json';

import { useRef } from 'react';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
  
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroMessage from '../heroMessage/heroMessage.component';

gsap.registerPlugin(useGSAP,ScrollTrigger);

const Hero = () => {

	const heroSlides = useRef();

	useGSAP( () => {
		// console.log('START GSAP');
		// console.log('heroMessages = ', heroSlides.current);

		let sections = gsap.utils.toArray(".hero-message");

		gsap.to(sections, {
			xPercent: -100 * (sections.length - 1),
			ease: "none",
			scrollTrigger: {
				trigger: heroSlides.current,
				pin: true,
				scrub: 1,
				// snap: 1 / (sections.length - 1),
				end: () => "+=" + heroSlides.current.offsetWidth
			}
		});



	}, { scope: heroSlides });

	return (
		<section className="hero">

			<div className="hero-intro">
				<h1 className="hero-primaryHeading container">
					{HeroContent.primaryHeading}
				</h1>
			</div>

			{ HeroContent.content.length > 0 && 
			<div className="hero-slides" ref={heroSlides} style={ { width: `calc(100% * ${HeroContent.content.length})` } }>
				<h1>TEST</h1>
				{ HeroContent.content.map( (heroMessage, i) => {
					return (
						<HeroMessage key={i} message={heroMessage}></HeroMessage>
					);
			}) }
			</div>
			}

			<div className="hero-cta">
				<a href={HeroContent.cta.url} className="hero-ctaLink">{HeroContent.cta.title}</a>
			</div>

    </section>
	);
};

export default Hero;
