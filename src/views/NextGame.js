import React from 'react';
import { values } from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

import { proxy } from '../resources/utils';
import { loadGames } from '../resources/games';
import { StopwatchIcon } from '../icons';
import Task from '../ui/Task';


const NextGame = ({ id, start, competitor_a, competitor_b }) => {
  const message = <div>Are you ready for <strong>{competitor_a.name}</strong> vs. <strong>{competitor_b.name}</strong> starting {moment(start).fromNow()}?</div>;
  const to = `/games/${id}`;
  return (
  <div className="tasks next-game">
    <h2>What is next?</h2>
    <Task message={message} icon={<StopwatchIcon />} to={to} />
  </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...proxy(values(state.games).find(({ start }) => moment(start).isAfter()), state),
  }
}

export default connect(mapStateToProps, { load: loadGames })(NextGame);
