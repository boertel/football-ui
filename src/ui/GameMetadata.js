import React from 'react';
import moment from 'moment';
import Time from './Time';
import Badge from './Badge';

const GameMetadata = ({ group, start, }) => {
  const live = moment().isBetween(start, moment(start).add(120, 'minutes'));
  return (
    <div className="game-metadata">
      <Badge>{group.name}</Badge>
      <Time time={start} format="HH:mm a" />
      <Badge className={`live${live ? '' : ' hidden'}`}>Live</Badge>
    </div>
  );
}

export default GameMetadata;
