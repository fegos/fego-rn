import React from 'react';

export default function Footer(props) {
  return (
    <footer id="footer">
      <p className="copyright">powered by @{props.copyright}</p>
    </footer>
  );
}
