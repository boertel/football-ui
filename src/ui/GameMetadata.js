import React from 'react';
import moment from 'moment';
import Time from './Time';
import Badge from './Badge';
import Points from './Points';

const GameMetadata = ({ group, start, gameId }) => {
  const live = moment().isBetween(start, moment(start).add(120, 'minutes'));
  return (
    <div className="game-metadata">
      <Badge>{group.name}</Badge>
      <Time time={start} format="HH:mm a" />
      <Points gameId={gameId} />
      {live ? <Badge className={`live${live ? '' : ' hidden'}`}>Live</Badge> : null}
    </div>
  );
}

export default GameMetadata;
