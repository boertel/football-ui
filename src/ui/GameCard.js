import React from 'react';
import classNames from 'classnames';

import { withClassNames, } from './utils';
import GameMetadata from './GameMetadata';
import GameScore from './GameScore';
import { ProxyComponent, getStatus } from '../resources/utils';


class GameCard extends ProxyComponent {
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

    const predictions = locked ? [
        <div key="title"><h4>Your predictions</h4></div>,
        <div key="predictions" className="predictions">{bet.score_a} - {bet.score_b}</div>,
        <div key="empty" />,
        <div key="progress" className="progress-bar"></div>,
    ] : null;

    return (
      <div className={className}>
        <GameMetadata group={group} start={start} gameId={id} />
        <GameScore className="competitor-a" name="score_a" competitor_name={competitor_a.name} id={id} locked={locked} autoFocus={isView ? true : false} />
        <GameScore className="competitor-b" name="score_b" competitor_name={competitor_b.name} id={id} locked={locked} />
        {predictions}
      </div>
    );
  }
}

export default withClassNames('game-card')(GameCard);
