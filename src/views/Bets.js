import React from 'react';
import values from 'lodash/values';

import { asyncConnect } from '../utils/components';
import { loadBets } from '../resources/bet';


const competitorAwins = ({ score_a, score_b }) => score_a > score_b;
const competitorBwins = ({ score_a, score_b }) => score_a < score_b;
const itIsATie = ({ score_a, score_b }) => score_a === score_b;

const BetSection = ({ title, bets, filter }) => (
  <div>
    <h4>{title}</h4>
    <ul>
      { bets.filter(filter).map(bet => bet.id) }
    </ul>
  </div>
)

const Bets = ({ locked, competitor_a, competitor_b, bets }) => {
  if (!locked) {
    return <em>All predictions will be available to see 15 minutes before kick-off time.</em>
  }

  return (
    <div className="bets">
      <h3>Bets</h3>
      <div className="bet-section">
        <BetSection title={`${competitor_a.name} wins`} bets={bets} filter={competitorAwins} />
        <BetSection title="It's a tie!" bets={bets} filter={itIsATie} />
        <BetSection title={`${competitor_b.name} wins`} bets={bets} filter={competitorBwins} />
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { gameId } = ownProps;

  const bets = values(state.bet).filter(bet => bet.game.id === gameId);

  return {
    bets,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    load: () => dispatch(loadBets({ game: ownProps.gameId })),
  };
}

export default asyncConnect(mapStateToProps, mapDispatchToProps)(Bets);
