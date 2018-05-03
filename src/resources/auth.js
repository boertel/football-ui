import api from '../api';


export const LOAD = 'football/auth/LOAD';
export const AUTHENTICATED = 'football/auth/AUTHENTICATED';
export const LOGOUT = 'football/auth/LOGOUT';


export function checkAuthentication() {
  return dispatch => {
    return api.get('/auth').then(response => {
      dispatch({
        type: AUTHENTICATED,
        payload: response.data,
      });
    });
  }
}

const authenticated = (response) => ([
  {
    type: AUTHENTICATED,
    payload: {
      authenticated: true,
    },
  },
  {
    type: LOAD,
    payload: response.data,
  }
])

export function login(data) {
  return dispatch => {
    return api.post('/users/login/', data).then(response => {
      authenticated(response).map(dispatch);
    });
  }
}

export function signup(data) {
  return dispatch => {
    return api.post('/users/', data).then(response => {
      authenticated(response).map(dispatch);
    });
  }
}


export function logout() {
  return dispatch => {
    return api.post('/users/logout/').then(response => {
      dispatch({
        type: AUTHENTICATED,
        payload: {
          authenticated: false,
        },
      });
      dispatch({
        type: LOGOUT,
      })
    });
  }
}


const initialState = {
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state;
  }
}
