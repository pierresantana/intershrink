export const token_changed = (payload) => ({
    type: 'TOKEN_CHANGED',
    payload
});

export const password_changed = (payload) => ({
    type: 'PASSWORD_CHANGED',
    payload
});

export const login_user_success = (payload) => ({
    type: 'LOGIN_USER_SUCCESS',
    payload
});

export const login_user_fail = (payload) => ({
    type: 'LOGIN_USER_FAIL',
    payload
});

export const login_user = (payload) => ({
    type: 'LOGIN_USER',
    payload
});

export const login_open_modal = (payload) => ({
    type: 'LOGIN_OPEN_MODAL',
    payload
});

export const login_close_modal = (payload) => ({
    type: 'LOGIN_CLOSE_MODAL',
    payload
});

export const login_open_create_modal = (payload) => ({
    type: 'LOGIN_OPEN_CREATE_MODAL',
    payload
});

export const login_close_create_modal = (payload) => ({
    type: 'LOGIN_CLOSE_CREATE_MODAL',
    payload
});

export const logout_user = (payload) => ({
    type: 'LOGOUT_USER',
    payload
});

export const link_create = (payload) => ({
    type: 'LINK_CREATE',
    payload
});

export const link_fetch_success = (payload) => ({
    type: 'LINK_FETCH_SUCCESS',
    payload
});

export const link_fetch_fail = (payload) => ({
    type: 'LINK_FETCH_FAIL',
    payload
});

export const manage_links_open = (payload) => ({
    type: 'MANAGE_LINKS_OPEN',
    payload
});

export const manage_links_close = (payload) => ({
    type: 'MANAGE_LINKS_CLOSE',
    payload
});

export const loadTopLinks = () => ({
    type: 'LOADING_TOP_LINKS'
});

export const updateTopLinks = (payload) => ({
    type: 'TOP_LINKS_LOADED',
    payload
});