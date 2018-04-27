import React from 'react';
import { connect } from 'react-redux';
import values from 'lodash/values';

import { asyncConnect } from '../utils/components';
import { loadBets } from '../resources/bet';


const competitorAwins = ({ score_a, score_b }) => score_a > score_b;
const competitorBwins = ({ score_a, score_b }) => score_a < score_b;
const itIsATie = ({ score_a, score_b }) => score_a === score_b;

const BetItem = connect((state, ownProps) => ({user: state.user[ownProps.user.id]}))(({ user, score_a, score_b }) => (
  <div className="bet-item">
    <div>{user.first_name}</div>
    <div>{score_a} - {score_b}</div>
  </div>
))

const BetSection = ({ title, bets, filter }) => (
  <div className="bet-section">
    <h4>{title}</h4>
    <ul>
      { bets.filter(filter).map(bet => <BetItem key={bet.id} {...bet} />) }
    </ul>
  </div>
)

const Bets = ({ locked, competitor_a, competitor_b, bets }) => {
  if (!locked) {
    return <em>All predictions will be available to see 15 minutes before kick-off time.</em>
  }

  return (
    <div className="bets">
      <h3>Predictions</h3>
      <div className="bet-sections">
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
