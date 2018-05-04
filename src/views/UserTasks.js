import React from 'react';
import { connect } from 'react-redux';

import Task from '../ui/Task';
import {
  EmailIcon,
  CameraFlashIcon,
} from '../icons';

const UserTasks = ({ verified, avatar, gravatar }) => {
  let tasks = [];
  if (!verified) {
    tasks.push({
      'icon': <EmailIcon />,
      'message': 'verify your email address so you can get reminders and notifications.',
    });
  }
  if (!avatar) {
    tasks.push({
      'icon': <CameraFlashIcon />,
      'message': <div><img src={`https://www.gravatar.com/avatar/${gravatar}`} />Looks like your friends can't see your beautiful face.</div>
    });
  }
  return <div className="tasks-group">{tasks.map((task, index) => <Task {...task} key={index} />)}</div>;
}

export default connect(state => ({...state.user[state.auth.id]}))(UserTasks);
