import React from 'react';
import { Link } from 'bisheng/router';

export default function Header(props) {
  const { themeConfig, location } = props;
  const { pathname } = location;
  return (
    <header id="header">
      <div className="container f-cb">
        <div className="to-home f-fl">
          <Link to={themeConfig.rootLink}>{themeConfig.siteTitle}</Link>
        </div>
        <div className="nav f-fr">
          <ul className="f-cb" role="navigation">
            {themeConfig.navigation.map((item) => {
              let { link } = item;
              if (link[0] === '/') link = link.substring(1, link.length);
              const active = (pathname === link) || (pathname.startsWith(link) && pathname[link.length] === '/');
              return (
                <li
                  key={link}
                  className={active ? 'nav-item nav-item-active' : 'nav-item'}
                >
                  <Link to={link}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
