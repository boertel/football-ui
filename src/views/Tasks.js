import React from 'react';

import UserTasks from './UserTasks';
import GameTasks from './GameTasks';
import NextGame from './NextGame';
import CurrentGames from './CurrentGames';


const Tasks = () => (
  <div className="tasks">
    <UserTasks />
    <CurrentGames />
    <NextGame />
    <h2>Here are a few actions you can do today!</h2>
    <GameTasks />
  </div>
);

export default Tasks;
