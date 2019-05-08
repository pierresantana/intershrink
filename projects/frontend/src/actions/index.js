export const loginUserSuccess = (payload) => ({
    type: 'LOGIN_USER_SUCCESS',
    payload
});

export const loginOpenModal = (payload) => ({
    type: 'LOGIN_OPEN_MODAL',
    payload
});

export const loginCloseModal = (payload) => ({
    type: 'LOGIN_CLOSE_MODAL',
    payload
});

export const loginOpenCreateModal = (payload) => ({
    type: 'LOGIN_OPEN_CREATE_MODAL',
    payload
});

export const loginCloseCreateModal = (payload) => ({
    type: 'LOGIN_CLOSE_CREATE_MODAL',
    payload
});

export const logoutUser = (payload) => ({
    type: 'LOGOUT_USER',
    payload
});

export const manageLinksOpen = (payload) => ({
    type: 'MANAGE_LINKS_OPEN',
    payload
});

export const manageLinksClose = (payload) => ({
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

export const addToasts = (payload) => ({
    type: 'ADD_TOASTS',
    payload
});

export const removeToasts = (payload) => ({
    type: 'REMOVE_TOASTS',
    payload
});