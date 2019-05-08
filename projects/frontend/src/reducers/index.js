import combineReducers from './combineReducers';
import auth from './AuthReducer';
import topLinks from './TopLinksReducer';

const reducer = combineReducers({
  auth,
  topLinks
});

export default reducer;