import React from 'react';
import { Link } from 'react-router-dom';
import { values, sortBy } from 'lodash';
import { connect } from 'react-redux';

import Task from '../ui/Task';


const GameTasks = ({ more, games, }) => {
  // TODO proxy game
  let tasks = games.map(({ id, }) => ({ message: <Link to={`/games/${id}`}>you haven't predict game {id}</Link> }));
  if (more) {
    tasks.push({ message: <Link to="/games">and more...</Link> });
  }
  return (
    <div>
    {tasks.map((task, index) => <Task {...task} key={index} />)}
    </div>
  );

}

const mapStateToProps = state => {
  const games = sortBy(values(state.games), 'order').filter(game => game.bet.id === null)
  return {
    games: games.slice(0, 2),
    more: games.length > 2,
  }
}

export default connect(mapStateToProps)(GameTasks);
