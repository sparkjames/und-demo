import './hero.styles.scss';

import HeroContent from '../../content/hero.json';

import { useEffect, useRef } from 'react';

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

let heroLetterDelay = 0;

const Hero = () => {

	const heroRef = useRef();
	const heroSlides = useRef();

	const backgroundVideoOnReady = () => {
		heroRef.current.classList.add('is-viewed');
	};

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
				scrub: 0.01,
				// snap: 1 / (sections.length - 1),
				// snap: {
				// 	snapTo: 1 / (sections.length - 1), // snap to the closest slide
				// 	duration: { min: 0.2, max: 0.5 }, // the snap animation should be at least 0.2 seconds, but no more than 1 second1 (determined by velocity)
				// 	delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
				// 	ease: 'power1.inOut', // the ease of the snap animation ("power3" by default),
				// 	inertia: false,
				// },
				end: () => "+=" + heroSlides.current.offsetWidth
			}
		});

	}, { scope: heroSlides });

	const backgroundVideoOnEnd = (e) => {
		e.target.playVideo();
	};

	return (
		<section className="hero" ref={heroRef}>

			{ HeroContent.primaryHeading && 
			<div className="hero-intro">

				<YouTube className="hero-backgroundContainer" videoId={youtubeID} opts={youtubeOptions} onEnd={backgroundVideoOnEnd} onReady={backgroundVideoOnReady} />

				<div className="hero-introContainer container">
					<h1 className="hero-primaryHeading">
						{HeroContent.primaryHeading.split(' ').map( (word) => {
							return (
								<span className="hero-primaryHeadingWord">
									{ word.split('').map( (letter) => {
										heroLetterDelay = heroLetterDelay + 0.1;
											return (
												<span className="hero-primaryHeadingLetter" style={{transitionDelay:`${heroLetterDelay}s`}}>{ letter }</span>
											);
										})
									}
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
