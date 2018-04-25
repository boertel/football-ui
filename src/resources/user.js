import keyBy from 'lodash/keyBy';
import values from 'lodash/values';

import api from '../api';


const LOAD = 'football/user/LOAD';
const AUTHENTICATED = 'football/user/AUTHENTICATED';
const LOGOUT = 'football/user/LOGOUT';

export function checkAuthentication() {
  return dispatch => {
    return api.get('/auth').then(response => {
      const { authenticated } = response.data;
      dispatch({
        type: AUTHENTICATED,
        payload: {
          authenticated: response.data.authenticated,
        }
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

export function loadUser() {
  return dispatch => {
    return api.get('/users/me/').then(response => {
      dispatch({
        type: LOAD,
        payload: response.data,
      });
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

    case LOAD:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state;
  }
}
