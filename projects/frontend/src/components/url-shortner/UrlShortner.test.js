import React from 'react';
import ReactDOM from 'react-dom';
import UrlShortner from './UrlShortner';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UrlShortner />, div);
  ReactDOM.unmountComponentAtNode(div);
});
