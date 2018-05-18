import { get, keyBy, mapValues, } from 'lodash';
import api from '../api'
import { createProxify } from './utils';
import { LOAD as BET_LOAD } from './bet';


export const LOAD = 'football/games/LOAD';
export const UPDATE = 'football/games/UPDATE';

export const loadGames = () => {
  return dispatch => {
    return api.get('/games/').then(response => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, 'id'),
      });
    });
  }
}

export const updateGame = (gameId, data) => {
  return dispatch => {
    return api.patch(`/games/${gameId}/`, data).then(response => {
      dispatch({
        type: UPDATE,
        payload: response.data,
      })
    });
  }
}

export const computePoints = (gameId) => {
  return () => {
    return api.post(`/games/${gameId}/compute/`).then(response => {
      return response;
    });
  }
}

const initialState = {};


const proxify = createProxify({
  'competitor_a': 'competitor',
  'competitor_b': 'competitor',
  'group': 'group',
  'bet': 'bet',
});

export default function (state=initialState, action) {
  switch (action.type) {
    case BET_LOAD:
      const gameId = get(action, ['params', 'game']);
      if (gameId) {
        return {
          ...state,
          [gameId]: {
            ...state[gameId],
            bets: true,
          }
        }
      }
      return state

    case LOAD:
      return {
        ...state,
        ...mapValues(action.payload, proxify),
      }

    default:
      return state;
  }
}
