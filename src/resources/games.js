import keyBy from 'lodash/keyBy';
import api from '../api'

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

export default function (state=initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state;
  }
}
