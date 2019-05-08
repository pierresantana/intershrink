const initialState = {
  loading: true,
  list: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_TOP_LINKS':
      return {
        ...state,
        loading: true
      };
    case 'TOP_LINKS_LOADED':
      return {
        ...state,
        loading: false,
        list: action.payload
      };
    default:
      return state;
  }
};

export default reducer;