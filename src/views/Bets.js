import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import values from 'lodash/values';
import qs from 'qs';
import { get } from 'lodash';

import { asyncConnect } from '../utils/components';
import { withClassNames } from '../ui/utils';
import { loadBets } from '../resources/bet';
import { ProxyComponent, proxy, getStatus } from '../resources/utils';
import SelectFriends from '../views/SelectFriends';


const competitorAwins = ({ score_a, score_b }) => score_a > score_b;
const competitorBwins = ({ score_a, score_b }) => score_a < score_b;
const itIsATie = ({ score_a, score_b }) => score_a === score_b;

const sortScoreA = (a, b) => {
  return (a.score_a * 2 + a.score_b) - (b.score_a * 2 + b.score_b);
}

const sortScoreB = (a, b) => {
  return (a.score_a + a.score_b * 2) - (b.score_a + b.score_b * 2);
}

const sortScoreTie = (a, b) => {
  return (a.score_a + a.score_b) - (b.score_a + b.score_b);
}


const BetItem = connect((state, ownProps) => ({user: state.user[ownProps.user.id], currentUserId: state.auth.id, game: state.games[ownProps.game.id]}))(withClassNames('bet-item', props => props.currentUserId === props.user.id && ' me')(({ user, currentUserId, score_a, score_b, className, game, }) => {
  const betStatus = getStatus(game.score_a, game.score_b, { score_a, score_b });
  return (
    <div className={`${className} ${betStatus}`}>
      <div>{user.full_name}</div>
      <div>{score_a} - {score_b}</div>
    </div>
  )
}))

const BetSection = ({ title, bets, filter, sort, }) => (
  <div className="bet-section">
    <h4>{title}</h4>
    <ul>
      { bets.filter(filter).sort(sort).map(bet => <BetItem key={bet.id} {...bet} />) }
    </ul>
  </div>
)

class Bets extends ProxyComponent {
  onChange = (value) => {
    this.props.history.replace({
      pathname: this.props.location.pathname,
      search: `?friends=${value}`,
    });
  }

  render() {
    const {
      gameId,
      friendId,
      locked,
      competitor_a,
      competitor_b,
      bets,
    } = this.props;

    let content = null;
    if (!locked) {
      content = [
        <h3 key="title">Predictions</h3>,
        <em key="instructions">All predictions will be available to see 15 minutes before kick-off time.</em>,
      ];
    } else {
      content = [
        <h3 key="title"><div>Predictions</div><SelectFriends onChange={this.onChange} value={friendId} /></h3>,
        <div className="bet-sections" key="section">
          <BetSection
            title={`${competitor_a.name} wins`}
            bets={bets}
            filter={competitorAwins}
            sort={sortScoreA}
          />
          <BetSection
            title="It's a tie!"
            bets={bets}
            filter={itIsATie}
            sort={sortScoreTie}
          />
          <BetSection
            title={`${competitor_b.name} wins`}
            bets={bets}
            filter={competitorBwins}
            sort={sortScoreB}
          />
        </div>
      ];
    }

    return (
      <div className="bets">
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const gameId = ownProps.gameId;

  const friendId = qs.parse(ownProps.location.search.replace('?', '')).friends;

  const members = Object.keys(get(state, ['friend', friendId, 'members'], {}));

  const bets = values(state.bet).filter(bet => bet.game.id === gameId && (members.length > 0 ? members.indexOf(`${bet.user.id}`) !== -1 : true));
  const game = proxy(state.games[gameId], state);

  return {
    gameId,
    friendId,
    ...game,
    bets,
    refresh: game.locked && game.bets !== true,
  }
}


// TODO conditional load? is game already in redux?
export default withRouter(asyncConnect(mapStateToProps, { load: [(props) => loadBets({ game: props.gameId }), ]})(Bets));
