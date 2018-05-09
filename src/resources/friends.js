import { keyBy } from 'lodash';


const initialState = {};

export const LOAD = 'football/friends/LOAD';

export const loadFriends = () => {
  return dispatch => {
    return api.get('/friends').then(response => {
      dispatch({
        type: LOAD,
        payload: keyBy(response.data, 'id'),
      })
    });
  }
}

export default function (state=initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
