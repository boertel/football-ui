import api from '../api';
import mapValues from 'lodash/mapValues';
import { LOAD as BET_LOAD } from './bet';

export const LOAD = 'football/user/LOAD';


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


const initialState = {}

export default function (state=initialState, action) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        }
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
