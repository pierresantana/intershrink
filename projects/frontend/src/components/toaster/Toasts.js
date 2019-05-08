import React, { useState, useRef, useContext } from 'react';
import { TOASTS_UPDATE } from '../../actions';

const initialState = {
  toasters: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case TOASTS_UPDATE:
      return {
        ...state,
        toasters: action.payload
      };
    default:
      return state;
  }
};

function Toasts() {
  const [toasts] = useReducer(reducer, initialState);

  return (
    <div>
      {toasts.map((toast) => (
        <Toast>
          <ToastBody>
            {toast.message}
          </ToastBody>
        </Toast>
      ))}
    </div>
  );
}

export default Toasts;