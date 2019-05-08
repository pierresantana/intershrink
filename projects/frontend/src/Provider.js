import React, { useState, useReducer, useEffect } from 'react';
import AuthContext from './contexts/AuthContext';

const Provider = ({ children, reducer }) => {
  const [store, dispatch] = useReducer(reducer);
  const [state, setState] = useState({ isLoaded: false });

  useEffect(() => {
    dispatch({ type: '@init' });
    setState({ isLoaded: true });
  }, []);

  return (
    <AuthContext.Provider value={{ dispatch, store }}>
      {state.isLoaded ? children : false}
    </AuthContext.Provider>
  );
};

export default Provider;
