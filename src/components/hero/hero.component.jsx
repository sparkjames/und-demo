import './hero.styles.scss';

import HeroContent from '../../content/hero.json';

import { useRef } from 'react';

import YouTube from 'react-youtube';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
  
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroMessage from '../heroMessage/heroMessage.component';

gsap.registerPlugin(useGSAP,ScrollTrigger);

// controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1
const youtubeOptions = {
	height: '480',
	width: '720',
	playerVars: {
		// https://developers.google.com/youtube/player_parameters
		autoplay: 1,
		loop: 1,
		controls: 0,
		showinfo: 0,
		mute: 1,
	},
};
const youtubeID = 'AaBW0bOkOv4';

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

	const backgroundVideoOnEnd = (e) => {
		e.target.playVideo();
	};

	return (
		<section className="hero">

			{ HeroContent.primaryHeading && 
			<div className="hero-intro">

				<YouTube className="hero-backgroundContainer" videoId={youtubeID} opts={youtubeOptions} onEnd={backgroundVideoOnEnd} />

				<div className="hero-introContainer container">
					<h1 className="hero-primaryHeading">
						{HeroContent.primaryHeading.split(' ').map( (word) => {
							return (
								<span className="hero-primaryHeadingWord">
									{ word }
								</span>
							);
						})}
					</h1>
				</div>

			</div>
			}

			{ HeroContent.content.length > 0 && 
			<div className="hero-slides" ref={heroSlides} style={ { width: `calc(100% * ${HeroContent.content.length})` } }>
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
