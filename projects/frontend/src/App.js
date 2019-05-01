import React, {useState} from 'react';
import './App.css';

function App() {
    const [urlLink, setUrlLink] = useState("");

    const links = [
        { id: 1, link: 'https://intershrink.paris/ouioui', counter: 1676},
        { id: 2, link: 'https://intershrink.paris/m4r1aN', counter: 120},
        { id: 3, link: 'https://intershrink.paris/2JCMTS', counter: 1150},
        { id: 4, link: 'https://intershrink.paris/z58IK0', counter: 1000},
        { id: 5, link: 'https://intershrink.paris/R4bad3', counter: 900}
    ];

    return (
        <div>
            <header className="header flex-center">
                <div className="content">
                    <a className="interlink-logo" href="http://www.interlink.com.ar" target="_blank" rel="noopener noreferrer">
                        <img src="/images/interlink-logo-white.png" alt="Interlink"/>
                    </a>
                    <div className="message">
                        <div className="title">Shrink your link!</div>
                        <p className="sub-title">A long URL is always a problem. It's hard to remember and share.</p>
                    </div>

                    <div className="form">
                        <form>
                            <input type="text"
                                   placeholder="Paste the link to shrink it"
                                   value={urlLink}
                                   onChange={e => setUrlLink(e.target.value)}
                            />
                            <button>SHRINK</button>
                        </form>
                    </div>
                </div>
            </header>

            <div className="flex-center">
                <div className="top-title">Top 5</div>

                <div className="ranking">
                    {links.map((item) => (
                        <div key={item.id} className="row">
                            <div className="link">
                                <a href={item.link} target="_blank" rel="noopener noreferrer">
                                    {item.link}
                                </a>
                            </div>
                            <div className="counter">
                                {item.counter}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footer">
                <div className="interlink-footer">
                    <a  href="http://www.interlink.com.ar" target="_blank" rel="noopener noreferrer">
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

export default App;
