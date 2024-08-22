import './footer.styles.scss';
import { ReactComponent as Logo } from '../../assets/images/logotype-fullw-compressed.svg';

import MainNav from '../../content/main-nav.json';

const Footer = () => {
	return (
		<section className="siteFooter">
			<div className="siteFooter-container container">

				<div className="siteFooter-column siteFooter-column--nav">
					{ MainNav.links.length > 0 && 
					<nav className="siteFooter-nav">
						{ MainNav.links.map( (navLink, i) => {
							return (
							<a key={i} href={navLink.url} className="siteFooter-navLink">{navLink.title}</a>
							)
						})}
					</nav>
					}
				</div>

				<div className="siteFooter-column siteFooter-column--info">

					<a href="/" className="siteFooter-logoLink" title="University of North Dakota Homepage">
						<Logo className="siteFooter-logo"></Logo>
					</a>

					<p className="siteFooter-contactInfo">
						<a href="mailto:UND.info@UND.edu" className="siteFooter-emailLink">UND.info@UND.edu</a>
						<a href="tel:7017773000" className="siteFooter-phoneLink">701.777.3000</a>
					</p>

					<p className="siteFooter-copyright">&copy; 2024 University of North Dakota - Grand Forks, ND - Member of ND University System</p>

				</div>
				{/* TODO add bg imafe on left side, uses slashes graphic? */}
      
			</div>
    </section>
	);
};

export default Footer;
