const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  accessToken: null,
  refreshToken: null,
  error: '',
  loading: false,
  showLoginModal: false,
  showCreateModal: false,
  showManageLinks: false
}

const loadInitialState = () => {
  const userInfo = localStorage.getItem(btoa('userInfo'));
  if (userInfo) {
    return JSON.parse(atob(userInfo));
  }

  return initialState;
};

const reducer = (state = loadInitialState(), action) => {
  let data;
  switch (action.type) {
    case 'TOKEN_CHANGED':
      return {
        ...state,
        email: action.payload
      };
    case 'PASSWORD_CHANGED':
      return {
        ...state,
        password: action.payload
      };
    case 'LOGIN_USER':
      return {
        ...state,
        loading: true,
        error: '',
        user: null
      };
    case 'LOGIN_USER_SUCCESS':
      data = {
        ...state,
        ...initialState,
        showLoginModal: false,
        showCreateModal: false,
        password: '',
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };
      localStorage.setItem(btoa('userInfo'), btoa(JSON.stringify(data)));
      return data;
    case 'LOGIN_USER_FAIL':
      return {
        ...state,
        error: 'Authentication Failed.',
        password: '',
        loading: false
      };
    case 'LOGIN_OPEN_MODAL':
      return {
        ...state,
        showLoginModal: true
      };
    case 'LOGIN_CLOSE_MODAL':
      return {
        ...state,
        showLoginModal: false
      };
    case 'LOGIN_OPEN_CREATE_MODAL':
      return {
        ...state,
        showLoginModal: false,
        showCreateModal: true
      };
    case 'LOGIN_CLOSE_CREATE_MODAL':
      return {
        ...state,
        showCreateModal: false
      };
    case 'LOGOUT_USER':
      data = {
        ...state,
        ...initialState
      };
      localStorage.removeItem(btoa('userInfo'));
      return data;
    case 'MANAGE_LINKS_OPEN':
      return {
        ...state,
        showManageLinks: true
      };
    case 'MANAGE_LINKS_CLOSE':
      return {
        ...state,
        showManageLinks: false
      };
    default:
      return state;
  }
};

export default reducer;