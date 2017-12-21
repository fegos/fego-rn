import React, { Component } from 'react';
import { Link } from 'bisheng/router';

export default class Header extends Component {
	render() {
		let { themeConfig, location } = this.props;
		let pathname = location.pathname;
		return (
			<header id='header'>
				<div className='container f-cb'>
					<div className='to-home f-fl'>
						<Link to={themeConfig.rootLink}>{themeConfig.siteTitle}</Link>
					</div>
					<div className='nav f-fr'>
						<ul className='f-cb' role='navigation'>
						{themeConfig.navigation.map((item, index) => {
							let link = item.link;
							if (link[0] === '/') link = link.substring(1, link.length)
							let active = (pathname === link) || 
								(pathname.startsWith(link) && pathname[link.length] === '/')
							
							return (
								<li key={index} 
									className={active ? 'nav-item nav-item-active' : 'nav-item'}>
									<Link to={link}>{item.title}</Link>
								</li>
							)
						})}
						</ul>
					</div>
				</div>
			</header>
		);
	}
}