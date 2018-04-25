import React from 'react';
import { Link } from 'react-router-dom';

import { withClassNames } from './utils';
import Time from './Time';


const GameCard = ({ id, className, start }) => {
  const to = `/games/${id}`
  return (
    <Link to={to}>
      <div className={className}>
        <Time time={start} />
      </div>
    </Link>
  );
}

export default withClassNames('game-card')(GameCard);
