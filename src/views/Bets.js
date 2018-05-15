import React from 'react';
import { connect } from 'react-redux';
import values from 'lodash/values';

import { asyncConnect } from '../utils/components';
import { withClassNames } from '../ui/utils';
import { loadBets } from '../resources/bet';
import { ProxyComponent, proxy } from '../resources/utils';


const competitorAwins = ({ score_a, score_b }) => score_a > score_b;
const competitorBwins = ({ score_a, score_b }) => score_a < score_b;
const itIsATie = ({ score_a, score_b }) => score_a === score_b;


const BetItem = connect((state, ownProps) => ({user: state.user[ownProps.user.id], currentUserId: state.auth.id,}))(withClassNames('bet-item', props => props.currentUserId === props.user.id && ' me')(({ user, currentUserId, score_a, score_b, className }) => (
  <div className={className}>
    <div>{user.full_name}</div>
    <div>{score_a} - {score_b}</div>
  </div>
)))

const BetSection = ({ title, bets, filter }) => (
  <div className="bet-section">
    <h4>{title}</h4>
    <ul>
      { bets.filter(filter).map(bet => <BetItem key={bet.id} {...bet} />) }
    </ul>
  </div>
)

class Bets extends ProxyComponent {
  render() {
    const { gameId, locked, competitor_a, competitor_b, bets } = this.props;
    let content = null;
    if (!locked) {
      content = <em>All predictions will be available to see 15 minutes before kick-off time.</em>;
    } else {
      content = (
        <div className="bet-sections">
          <BetSection title={`${competitor_a.name} wins`} bets={bets} filter={competitorAwins} />
          <BetSection title="It's a tie!" bets={bets} filter={itIsATie} />
          <BetSection title={`${competitor_b.name} wins`} bets={bets} filter={competitorBwins} />
        </div>
      );
    }

    return (
      <div className="bets">
        <h3>Predictions</h3>
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const gameId = ownProps.gameId;

  const bets = values(state.bet).filter(bet => bet.game.id === gameId);
  const game = proxy(state.games[gameId], state);

  return {
    gameId,
    ...game,
    bets,
    refresh: game.locked && game.bets !== true,
  }
}


// TODO conditional load? is game already in redux?
export default asyncConnect(mapStateToProps, { load: [(props) => loadBets({ game: props.gameId })]})(Bets);
