import React from 'react';

import UserTasks from './UserTasks';
import GameTasks from './GameTasks';
import NextGame from './NextGame';
import CurrentGames from './CurrentGames';


const Tasks = () => (
  <div className="tasks">
    <CurrentGames />
    <NextGame />
    <h2>Here are a few actions you can do today!</h2>
    <GameTasks />
    <h2>...and you can also update your profile!</h2>
    <UserTasks />
  </div>
);

export default Tasks;
