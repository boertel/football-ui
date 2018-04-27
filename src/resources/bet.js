import api from '../api';
import { createProxify } from './utils';
import { mapValues, keyBy } from 'lodash';


export const CREATE_OR_UPDATE = 'football/bet/CREATE_OR_UPDATE';
export const LOAD = 'football/bet/LOAD';


export const createOrUpdateBet = (gameId, data) => {
  return dispatch => {
    return api.post(`/games/${gameId}/bets/`, data).then(response => {
      dispatch({
        type: CREATE_OR_UPDATE,
        payload: response.data,
      })
    });
  }
}


export const loadBets = (params) => {
  return dispatch => {
    return api.get('/bets/', { params, }).then(response => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, 'id')
      });
    });
  }
}

export const loadMyBets = () => {
  return loadBets({ 'user': 'me' });
}

const initialState = {};

const proxify = createProxify({
  game: 'games',
  user: 'user',
});

export default function (state=initialState, action) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        ...mapValues(action.payload, proxify),
      }

    case CREATE_OR_UPDATE:
      const betId = action.payload.id;
      return {
        ...state,
        [betId]: {
          ...state[betId],
          ...proxify(action.payload),
        },
      }

    default:
      return state;
  }
}
