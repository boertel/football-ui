import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { values, sortBy } from 'lodash';

import Bets from './Bets';
import GameItem from './Game';
import { Button } from '../ui';
import { withModal } from '../ui/Modal';
import { computePoints } from '../resources/games';


class GameView extends Component {
  state = {
    submitting: false,
  };

  computePoints = () => {
    this.setState({ submitting: true });
    this.props.computePoints(this.props.id).then(() => this.setState({ submitting: true }));
  }
  render() {
    const { id, next, is_superuser, } = this.props;
    const { submitting } = this.state;
    return (
      <div>
        <GameItem id={id} isView={true} />
        <Bets gameId={id} />
        <div className="modal-actions">
          {is_superuser ? <Button className="button danger" submitting={submitting} onClick={this.computePoints}>Update points</Button> : null}
          <Link className="button secondary" to={`/games/${next}`}>Next</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { gameId } = ownProps.match.params;
  const id = parseInt(gameId, 10);
  const currentGame = state.games[id];
  const next = sortBy(values(state.games), 'order').filter(({ order }) => order > currentGame.order)[0];

  const is_superuser = state.user[state.auth.id].is_superuser;

  return {
    id,
    is_superuser,
    next: next.id,
  }
};

export default withModal('/games')(connect(mapStateToProps, { computePoints, })(GameView));
