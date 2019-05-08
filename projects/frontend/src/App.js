import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';
import Auth from './components/auth';
import UrlShortner from './components/url-shortner';
import Ranking from './components/ranking';
import Footer from './components/footer';
import Toasts from './components/toasts';
import { redirectToLink } from './utils/url-utils';
import connect from './connect';

function App({auth}) {
  useEffect(() => {
    if (auth.accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.accessToken}`;
    }
  }, [auth.accessToken]);

  function Home() {
    return (
      <div className="app">
        <Toasts />
        
        <header className="header flex-center">
          <div className="container">
            <Auth />

            <a className="interlink-logo" href="http://www.interlink.com.ar" target="_blank" rel="noopener noreferrer">
              <img src="/images/interlink-logo-white.png" alt="Interlink" />
            </a>
            <div className="message">
              <div className="title">Shrink your link!</div>
              <p className="sub-title">A long URL is always a problem. It's hard to remember and share.</p>
            </div>

            <UrlShortner />
          </div>
        </header>

        <Ranking />

        <Footer />
      </div>
    );
  }

  function RedirectLink({ match }) {
    redirectToLink(match.params.link, false);

    return <div>Redirecting...</div>;
  }

  return (
    <Router>
      <Route exact path="/:link" component={RedirectLink} />
      <Route exact path="/" component={Home} />
    </Router>
  );
}

const mapStateToProps = store => ({
  auth: store.auth
});

const mapDispathToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(App);