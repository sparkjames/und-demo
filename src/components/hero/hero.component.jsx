import './hero.styles.scss';

import HeroContent from '../../content/hero.json';

import { useRef } from 'react';

import YouTube from 'react-youtube';

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
  
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeroMessage from '../heroMessage/heroMessage.component';

gsap.registerPlugin(useGSAP,ScrollTrigger);

/**
 * Set up some defaults for the YouTube embed, which 
 * will remove everything like the play button, position
 * bar, and add looping.
 */
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

	/**
	 * When the YouTube background video loads, trigger the
	 * animations on the hero intro by adding a class to the hero.
	 * CSS will do the transition animations.
	 */
	const backgroundVideoOnReady = () => {
		heroRef.current.classList.add('is-viewed');
	};

	/**
	 * Set up a scroll trigger to allow the hero messages 
	 * to scroll horizontally. The "slides" get placed horizontally
	 * via CSS. GSAP uses the mouse scrolling to do translateX on
	 * all the panels, giving the appearance of horizontal scroll.
	 */
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
				end: () => "+=" + heroSlides.current.offsetWidth
			}
		});

	}, { scope: heroSlides });

	/**
	 * The video does not honor the loop=1 parameter,
	 * so force the video to replay when it finishes playing.
	 * 
	 * @param {Event} e Event from addEventListener.
	 */
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
						{HeroContent.primaryHeading.split(' ').map( (word, i) => {
							/**
							 * Separate the primary heading by word and letter so
							 * the styles and animations can be done.
							 */
							return (
								<span key={i} className="hero-primaryHeadingWord">
									{ word.split('').map( (letter, j) => {
										heroLetterDelay = heroLetterDelay + 0.1;
											return (
												<span key={j} className="hero-primaryHeadingLetter" style={{transitionDelay:`${heroLetterDelay}s`}}>{ letter }</span>
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
