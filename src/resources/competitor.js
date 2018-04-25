import api from '../api';
import { keyBy, mapValues } from 'lodash';
import { LOAD as GAMES_LOAD } from './games';


export const LOAD = 'football/competitor/LOAD';

export const loadCompetitors = () => {
  return dispatch => {
    return api.get('/competitors/').then(response => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, 'id'),
      });
    });
  }
}


const initialState = {};

export default function (state=initialState, action) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        ...action.payload,
      }

    case GAMES_LOAD:
      let competitors = {};
      mapValues(action.payload, ({ competitor_a, competitor_b }) => {
        competitors[competitor_a.id] = {
          ...state[competitor_a.id],
          ...competitor_a,
        }
        competitors[competitor_b.id] = {
          ...state[competitor_b.id],
          ...competitor_b,
        }
      });
      return {
        ...state,
        ...competitors,
      }

    default:
      return state;
  }
}
