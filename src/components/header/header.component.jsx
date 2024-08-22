import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/images/logotype-full-compressed.svg';

import MainNav from '../../content/main-nav.json';

import { useEffect, useRef, useState } from 'react';

import { jp_scrollDirection } from '../../assets/js/jpScrollDirection';

const Header = () => {

	const headerEl = useRef(null);
	const [headerIsScrolledPast, setHeaderIsScrolledPast] = useState(false);
	const [headerIsSticky, setHeaderIsSticky] = useState(true);

	useEffect( () => {
		// There is a CSS custom property `--header-height` that controls the size/position of the mega nav. The height must be updated when the window is resized or scrolled, since the height of the header can change after either of those events.
		const update_header_height_property = () => {
			let header_height = headerEl.current.clientHeight;
			if( header_height ){
				document.documentElement.style.setProperty( '--header-height', header_height + 'px' );
			}
		};

		document.addEventListener( 'DOMContentLoaded', () => {
			update_header_height_property();
		}, false);

		window.addEventListener( 'resize', update_header_height_property, {passive: true});
		window.addEventListener( 'scroll', update_header_height_property, {passive: true});

		/**
		 * Show/hide the sticky header depending on if the user is scrolling up or down.
		 */
		const checkHeaderStatus = () => {
			const scrollTop = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
			// console.log('header height = ', headerEl.current.clientHeight);
			// console.log('scrollTop = ', scrollTop);
			if ( scrollTop > headerEl.current.clientHeight ){
				setHeaderIsScrolledPast( true );

				if ( jp_scrollDirection === 'up' ){
					setHeaderIsSticky( true );
				} else {
					setHeaderIsSticky( false );
				}

			} else {
				setHeaderIsScrolledPast( false );
				setHeaderIsSticky( true );
			}
		};
		window.addEventListener( 'scroll', checkHeaderStatus, {passive: true});

	}, []);

	return (
		<header className={`siteHeader ${headerIsScrolledPast ? 'is-scrolled-past' : '' } ${headerIsSticky ? 'is-sticky' : '' }`} ref={headerEl}>
			<div className="siteHeader-container container">

				<a href="/" className="siteHeader-logoLink" title="University of North Dakota Homepage">
					<Logo className="siteHeader-logo"></Logo>
				</a>

				{ MainNav.links.length > 0 && 
				<nav className="siteHeader-nav">
					{ MainNav.links.map( (navLink, i) => {
						return (
						<a key={i} href={navLink.url} className="siteHeader-navLink">{navLink.title}</a>
						)
					})}
				</nav>
				}

			</div>
		</header>
	);
};

export default Header;
