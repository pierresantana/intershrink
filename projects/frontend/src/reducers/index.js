import combineReducers from './combineReducers';
import auth from './AuthReducer';
import topLinks from './TopLinksReducer';
import toasts from './ToastsReducer';

const reducer = combineReducers({
  auth,
  topLinks,
  toasts
});

export default reducer;