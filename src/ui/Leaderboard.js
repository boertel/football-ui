import React from 'react';
import { Link } from 'react-router-dom';
import { sortBy } from 'lodash';
import { withClassNames } from '../ui/utils';


const User = withClassNames('user')(({ id, className, rank, full_name, points, me }) => (
  <Link to={`/profile/${id}`} className={`${className}${me ? ' me' : ''}`}>
    <div className="full-name">{rank}. {full_name}</div>
    <div className="points">{points} points</div>
  </Link>
))


const Leaderboard = ({ users, currentUserId, className, children, }) => {
  const leaderboard = sortBy(users, 'points');
  let rank = 1;
  let previousPoints = 0;
  const title = children ? <h3>Leaderboard {children}</h3> : <h3>Leaderboard</h3>
  return (
    <div className={className}>
      {title}
      <div className="list">
        {leaderboard.map(({ id, full_name, points }) => {
          if (points !== previousPoints) {
            rank += 1;
          }
          previousPoints = points;
          const me = currentUserId === id;
          return <User key={id} full_name={full_name} points={points} rank={rank} me={me} id={id} />
        })}
      </div>
    </div>
  );
}

export default withClassNames('leaderboard')(Leaderboard);
