import React from 'react';
import Time from './Time';
import Badge from './Badge';
import StatusBadge from './StatusBadge';

const GameMetadata = ({ group, start, gameId }) => {
  let children = [
      <Badge className={`${group.name.replace(' ', '').toLowerCase()} game-header`} key="group">{group.name}</Badge>,
      <Time className="game-header" key="time" time={start} format="HH:mm a" />,
      <StatusBadge className="game-header" key="status" gameId={gameId} />,
  ];

  return children;
}

export default GameMetadata;
