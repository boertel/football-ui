import { combineReducers } from 'redux';

import user from './user';
import games from './games';
import competitor from './competitor';
import group from './group';
import points from './points';


export default combineReducers({
  user,
  games,
  competitor,
  group,
  points,
});
