import api from '../api';
import { keyBy, mapValues, } from 'lodash';

import { createProxify } from './utils';

export const LOAD = 'football/friend/LOAD';
export const CREATE = 'football/friend/CREATE';
export const JOIN = 'football/friend/JOIN';
export const LEAVE = 'football/friend/LEAVE';


const handleResponse = response => {
  const payload = response.data.map(friend => ({
    ...friend,
    members: keyBy(friend.members, 'id'),
  }));
  return keyBy(payload, 'id');
}

export const loadFriends = () => {
  return dispatch => {
    return api.get('/friends/').then(response => {
      const payload = handleResponse(response);
      dispatch({
        type: LOAD,
        payload,
      });
      return response;
    });
  }
}

export const create = (name) => {
  return dispatch => {
    return api.post('/friends/', { name, members: [],}).then(response => {
      dispatch({
        type: CREATE,
        payload: response.data,
      });
      return response;
    });
  }
}

export const join = (friendId) => {
  return dispatch => {
    return api.post(`/friends/${friendId}/join/`).then(response => {
      const payload = handleResponse(response);
      dispatch({
        type: JOIN,
        friendId,
      });
    });
  }
}

export const leave = (friendId) => {
  return dispatch => {
    return api.post(`/friends/${friendId}/leave/`).then(response => {
      const payload = handleResponse(response);
      dispatch({
        type: LEAVE,
        friendId,
      });
    });
  }
}





const initialState = {};

const proxify = createProxify({
  'owner': 'user',
});


export default (state=initialState, action) => {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        ...mapValues(action.payload, proxify),
      }

    case CREATE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,    // TODO members is an id array here :/
        }
      }

    default:
      return state;
  }
};
