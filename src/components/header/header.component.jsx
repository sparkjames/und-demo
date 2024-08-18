import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/images/logotype-full-compressed.svg';

import HeaderNav from '../../content/header-nav.json';
import { useEffect } from 'react';

const Header = () => {

	useEffect( () => {
		// There is a CSS custom property `--header-height` that controls the size/position of the mega nav. The height must be updated when the window is resized or scrolled, since the height of the header can change after either of those events.
		const update_header_height_property = () => {
			let header_height = document.querySelector('.siteHeader').clientHeight;
			if( header_height ){
				document.documentElement.style.setProperty( '--header-height', header_height + 'px' );
			}
		};

		document.addEventListener('DOMContentLoaded', function() {
			update_header_height_property();
		}, false);

		window.addEventListener('resize', update_header_height_property, {passive: true});
		window.addEventListener('scroll', update_header_height_property, {passive: true});

	}, []);

	return (
		<header className="siteHeader">
			<div className="siteHeader-container container">

				<a href="/" className="siteHeader-logoLink" title="University of North Dakota Homepage">
					<Logo></Logo>
				</a>

				{ HeaderNav.links.length > 0 && 
				<nav className="siteHeader-nav">
					{ HeaderNav.links.map( (navLink, i) => {
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
