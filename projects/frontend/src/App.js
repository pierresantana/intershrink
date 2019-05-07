import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';
import Auth from './components/auth';
import UrlShortner from './components/url-shortner';
import Ranking from './components/ranking';
import Footer from './components/footer';
import AuthContext from './contexts/AuthContext';
import { loadInitialState, reducer } from './reducers/AuthReducer';

function App() {
  const [user, dispatch] = useReducer(reducer, loadInitialState());

  useEffect(() => {
    if (user.loggedIn) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.accessToken}`;
    }
  }, [user.accessToken]);

  function Home() {
    return (
      <div className="app">
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
    axios.get(`/links/${match.params.link}`)
      .then((response) => window.location.href = response.data.url)
      .catch(() => window.location.href = '/');

    return <div>Redirecting...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, dispatch, axios }}>
      <Router>
        <Route exact path="/:link" component={RedirectLink} />
        <Route exact path="/" component={Home} />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
