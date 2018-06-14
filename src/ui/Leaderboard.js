import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortBy, values } from 'lodash';
import { withClassNames } from '../ui/utils';


const User = connect((state, ownProps) => ({...state.user[ownProps.id]}))(withClassNames('user')(({ id, className, rank, full_name, points, me }) => (
  <Link to={`/profile/${id}`} className={`${className}${me ? ' me' : ''}`}>
    <div className="full-name">{rank}. {full_name}</div>
    <div className="points">{points} points</div>
  </Link>
)))


const Leaderboard = ({ users, currentUserId, className, children, }) => {
  const leaderboard = sortBy(sortBy(values(users), 'full_name').reverse(), 'points').reverse()
  let rank = 0;
  let previousPoints = -1;
  const title = children ? <h3>Leaderboard {children} ({leaderboard.length})</h3> : <h3>Leaderboard  ({leaderboard.length})</h3>
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
          return <User key={id} me={me} id={id} rank={rank} />
        })}
      </div>
    </div>
  );
}

export default withClassNames('leaderboard')(Leaderboard);
