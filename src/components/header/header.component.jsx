import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/images/logotype-full-compressed.svg';

import HeaderNav from '../../content/header-nav.json';

const Header = () => {
	return (
		<header className="siteHeader">
			<div className="siteHeader-container container">

				<a href="#0" className="siteHeader-logoLink" title="University of North Dakota Homepage">
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
