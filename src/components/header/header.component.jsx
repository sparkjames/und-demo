import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/images/logotype-full-compressed.svg';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import MainNav from '../../content/main-nav.json';

import { Fragment, useEffect, useRef, useState } from 'react';

import { jp_scrollDirection } from '../../assets/js/jpScrollDirection';

const Header = () => {

	const headerEl = useRef(null);
	const [headerIsScrolledPast, setHeaderIsScrolledPast] = useState(false);
	const [headerIsSticky, setHeaderIsSticky] = useState(true);
	const [mobileNavIsVisible, setMobileNavIsVisible] = useState(false);

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

	/**
	 * Toggle the mobile nav when it's visible.
	 */
	const toggleNavOnClick = () => {
		if ( mobileNavIsVisible ) {
			document.documentElement.classList.remove('nav-is-open');

		} else {
			document.documentElement.classList.add('nav-is-open');
		}
		
		setMobileNavIsVisible( ! mobileNavIsVisible );
	};

	return (
		<header className={`siteHeader ${headerIsScrolledPast ? 'is-scrolled-past' : '' } ${headerIsSticky ? 'is-sticky' : '' }`} ref={headerEl}>
			<div className="siteHeader-container container">

				<a href="/" className="siteHeader-logoLink" title="University of North Dakota Homepage">
					<Logo className="siteHeader-logo"></Logo>
				</a>

				{ MainNav.links.length > 0 && 
				<Fragment>
					<button className="siteHeader-toggleNav" type="button" onClick={toggleNavOnClick}>
						<MenuIcon className="siteHeader-toggleNavIcon"></MenuIcon>
					</button>
					<nav className="siteHeader-nav">
						<button className="siteHeader-toggleNav siteHeader-toggleNav--close" type="button" onClick={toggleNavOnClick}>
							<CloseIcon className="siteHeader-toggleNavIcon"></CloseIcon>
						</button>
						{ MainNav.links.map( (navLink, i) => {
							return (
							<a key={i} href={navLink.url} className="siteHeader-navLink">{navLink.title}</a>
							)
						})}
					</nav>
				</Fragment>
				}

			</div>
		</header>
	);
};

export default Header;
