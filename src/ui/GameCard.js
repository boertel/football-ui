import React from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

import { withClassNames } from './utils';
import GameMetadata from './GameMetadata';
import GameScore from './GameScore';
import { getStatus } from '../resources/utils';


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
      isView,
    } = this.props;

    const className = classNames(this.props.className, getStatus(score_a, score_b, bet))

    return (
      <div className={className}>
        <GameMetadata group={group} start={start} gameId={id} />
        <div className="game-content">
          <GameScore name="score_a" competitor_name={competitor_a.name} id={id} locked={locked} autoFocus={isView ? true : false} />
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
