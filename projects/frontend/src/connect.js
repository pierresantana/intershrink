import React, { useContext } from 'react';
import AuthContext from './contexts/AuthContext';

const connect = (mapState, mapDispatch) => {
  return WrappedComponent => {
    return () => {
      const { store, dispatch } = useContext(AuthContext);
      return (
        <WrappedComponent {...mapState(store)} {...mapDispatch(dispatch)} />
      );
    };
  };
};

export default connect;
