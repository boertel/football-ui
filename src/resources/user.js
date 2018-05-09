import api from '../api';
import { mapValues, keyBy } from 'lodash';
import { LOAD as BET_LOAD } from './bet';
import { LOAD as AUTH_LOAD } from './auth';

export const LOAD = 'football/user/LOAD';
export const LOAD_USERS = 'football/user/LOAD_USERS';


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

export function loadUsers() {
  return dispatch => {
    return api.get('/users/').then(response => {
      dispatch({
        type: LOAD_USERS,
        payload: keyBy(response.data, 'id'),
      });
    });
  }
}


const initialState = {}

export default function (state=initialState, action) {
  switch(action.type) {
    case LOAD:
    case AUTH_LOAD:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        }
      }

    case LOAD_USERS:
      return {
        ...state,
        ...mapValues(action.payload, (value, id) => ({
          ...state[id],
          ...value,
        }))
      }


    case BET_LOAD:
      let users = {};
      mapValues(action.payload, (bet) => {
        if (typeof bet.user === 'object' && bet.user !== null) {
          let user = bet.user;
          users[user.id] = {
            ...state[user.id],
            ...user,
          }
        }
      })
      return {
        ...state,
        ...users
      }

    default:
      return state;
  }
}
