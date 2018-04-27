import api from '../api';


const LOAD = 'football/auth/LOAD';
const AUTHENTICATED = 'football/auth/AUTHENTICATED';
const LOGOUT = 'football/auth/LOGOUT';


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

export function login(data) {
  return dispatch => {
    return api.post('/users/login/', data).then(response => {
      dispatch({
        type: AUTHENTICATED,
        payload: {
          authenticated: true,
        },
      });
      dispatch({
        type: LOAD,
        payload: response.data,
      })
    });
  }
}


export function logout() {
  return dispatch => {
    return api.post('/users/logout/').then(response => {
      dispatch({
        type: AUTHENTICATED,
        payload: {
          authenticated: true,
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
