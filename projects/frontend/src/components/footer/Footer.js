import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="interlink-footer">
                    <a href="http://www.interlink.com.ar" target="_blank" rel="noopener noreferrer">
                        Made with <img src="/images/heart-emoji.png" alt="love" /> by Interlink
                    </a>
                </div>
                <div className="twitter">
                    <a href="https://twitter.com/interlinklatam" target="_blank" rel="noopener noreferrer">
                        <img src="/images/twitter-logo.png" alt="Twitter" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;