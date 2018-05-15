import React from 'react';
import { Link } from 'react-router-dom';
import { values } from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

import { proxy } from '../resources/utils';
import { Badge, Task, CompetitorFlag, } from '../ui';
import { ClappingHandsIcon } from '../icons';

const CurrentGame = connect((state, ownProps) => ({ ...proxy(state.games[ownProps.id], state) }))(({ id, competitor_a, competitor_b }) => {
  const to = `/games/${id}`;
  const message = <div className="current-game"><CompetitorFlag name={competitor_a.name} /> {competitor_a.name} vs. {competitor_b.name}<CompetitorFlag name={competitor_b.name} /></div>;
  return (
    <Task message={message} icon={<ClappingHandsIcon />} to={to} />
  );
});


const CurrentGames = ({ games }) => {
  if (games.length === 0) {
    return null;
  }
  const title = games.length === 1 ? 'Game' : 'Games';
  return (
    <div className="current-games">
      <h3><div>{title} happening right now!</div><Badge className="live">Live</Badge></h3>
      {games.map(({ id }) => <CurrentGame key={id} id={id} />)}
    </div>
  );
};

const mapStateToProps = (state) => {
  const games = values(state.games).filter(({ start }) => moment().isBetween(start, moment(start).add(120, 'minutes')));
  return {
    games,
  }
}

export default connect(mapStateToProps)(CurrentGames);
