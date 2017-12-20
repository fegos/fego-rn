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
							// location.pathname eg: 'components/ui/Button', 不是'/components/ui/Button'没有前面的'/'
							let link = item.link;
							// 如果链接以'/'开头则把'/'去掉
							if (link[0] === '/') link = link.substring(1, link.length)
							/**
							 * active 的判断方法：
							 * 1. 如果 pathname === link, 则肯定当前这个 item active
							 * 2. 如果 pathname !== link, 可能的情况如下：
							 * 		2.1 pathname === components/ui/Button, 
							 * 			link === components/ui
							 * 		2.2 以及由于nsip-rn项目文件夹名的特殊性导致的:
							 * 			当 pathname === components/nativeUI/EditText
							 * 			link === components/native 的 item 不应该处于 active 态
							 * 			link === components/nativeUI 的 item 应该处于 active 态
							 */
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