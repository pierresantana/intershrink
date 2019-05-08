const initialState = {
  list: []
}

const reducer = (state = initialState, action) => {
  let data;
  switch (action.type) {
    case 'ADD_TOASTS':
      data = { ...state };
      action.payload.map(item =>
        data.list.push({
          message: item,
          date: Date.now()
        }));
      return data;
    case 'REMOVE_TOASTS':
      data = { ...state };
      data.list = data.list.filter(toast => toast.date !== action.payload.date);
      return data;
    default:
      return state;
  }
};

export default reducer;