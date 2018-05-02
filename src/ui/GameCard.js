import React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import { Link } from 'react-router-dom';

import { withClassNames } from './utils';
import Bets from '../views/Bets';
import PrivateRoute from '../PrivateRoute';
import GameMetadata from './GameMetadata';
import GameScore from './GameScore';


const getStatus = (score_a, score_b, bet) => {
  if (score_a !== null && score_b !== null) {
    if (score_a === bet.score_a && score_b === bet.score_b) {
      return 'perfect';
    }
    if (score_a >= bet.score_a && score_b >= bet.score_b) {
      return 'win';
    }
    return 'loss';
  }
  return 'unknow';
}


class GameCard extends React.Component {
  // TODO create ProxyComponent that handle scu
  shouldComponentUpdate(nextProps, nextState) {
    let equality = false
    for (let key in nextProps) {
      const prop = nextProps[key];
      if (typeof prop === 'object' && prop !== null) {
        equality = isEqual(this.props[key], prop);
      } else {
        equality = this.props[key] === nextProps[key];
      }
    }

    return !equality;
  }

  render() {
    const {
      id,
      start,
      competitor_a,
      competitor_b,
      score_a,
      score_b,
      bet,
      group,
      locked,
    } = this.props;

    const className = classNames(this.props.className, getStatus(score_a, score_b, bet))

    return (
      <div className={className}>
        <GameMetadata group={group} start={start} />
        <div className="game-content">
          <GameScore name="score_a" competitor_name={competitor_a.name} id={id} locked={locked} />
          <GameScore name="score_b" competitor_name={competitor_b.name} id={id} locked={locked} />
        </div>
        {locked ? (
        <div className="game-my-bet">
          <h4>Your predictions</h4>
          <div>
            <div>{bet.score_a}</div>
            <div>{bet.score_b}</div>
          </div>
          <div />
        </div>)
        : null }
      </div>
    );
  }
}

export default withClassNames('game-card')(GameCard);
