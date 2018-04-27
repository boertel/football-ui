import React from 'react';

import UserTasks from './UserTasks';
import GameTasks from './GameTasks';


const Tasks = () => (
  <div className="tasks">
    <h2>Here are a few actions you can do today!</h2>
    <GameTasks />
    <UserTasks />
  </div>
);

export default Tasks;
