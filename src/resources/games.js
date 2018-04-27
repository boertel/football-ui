import { keyBy, mapValues, } from 'lodash';
import api from '../api'
import { createProxify } from './utils';

export const LOAD = 'football/games/LOAD';

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

const initialState = {};


const proxify = createProxify({
  'competitor_a': 'competitor',
  'competitor_b': 'competitor',
  'group': 'group',
  'bet': 'bet',
});

export default function (state=initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        ...mapValues(action.payload, proxify),
      }

    default:
      return state;
  }
}
