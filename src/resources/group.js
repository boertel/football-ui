import api from '../api';
import { keyBy, mapValues } from 'lodash';
import { LOAD as GAMES_LOAD } from './games';
import { createProxify } from './utils';


export const LOAD = 'football/group/LOAD';

export const loadGroups = () => {
  return dispatch => {
    return api.get('/groups/').then(response => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, 'id'),
      });
    });
  }
}


const initialState = {};

const proxify = createProxify({
  points: 'points',
});

export default function (state=initialState, action) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        ...action.payload,
      }

    case GAMES_LOAD:
      let groups = {};
      mapValues(action.payload, ({ group, }) => {
        groups[group.id] = {
          ...state[group.id],
          ...group,
        }
      });
      return {
        ...state,
        ...mapValues(groups, proxify),
      }

    default:
      return state;
  }
}
