import React from 'react';
import { Link } from 'react-router-dom';
import { values, sortBy } from 'lodash';
import { connect } from 'react-redux';

import { proxy } from '../resources/utils';
import Task from '../ui/Task';
import { CompetitorFlag } from '../ui';
import {
  HighVoltageIcon,
  MoreInformationIcon,
} from '../icons';


const GameTasks = ({ more, games, }) => {
  // TODO proxy game
  let tasks = games.map(({ id, competitor_a, competitor_b, }) => ({
    icon: <div className="double-flags"><CompetitorFlag name={competitor_a.name} cut="bottom" /><CompetitorFlag name={competitor_b.name} cut="top" /></div>,
    message: <Link to={`/games/${id}`}>you haven't predict {competitor_a.name} vs. {competitor_b.name}</Link>,
  }));
  if (more) {
    tasks.push({
      icon: <MoreInformationIcon />,
      message: <Link to="/games">and more...</Link>
    });
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
    games: games.slice(0, 2).map(game => proxy(game, state)),
    more: games.length > 2,
  }
}

export default connect(mapStateToProps)(GameTasks);
