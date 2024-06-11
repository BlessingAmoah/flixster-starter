import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="copyright">
        © {new Date().getFullYear()} BlessingA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
