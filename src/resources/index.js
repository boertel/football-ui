import { combineReducers } from 'redux';

import auth from './auth';
import games from './games';
import competitor from './competitor';
import group from './group';
import points from './points';
import user from './user';
import bet from './bet';


export default combineReducers({
  auth,
  games,
  competitor,
  group,
  points,
  bet,
  user,
});
