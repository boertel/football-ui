import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { values, sortBy } from 'lodash';

import Bets from './Bets';
import GameItem from './Game';
import { withModal } from '../ui/Modal';

const GameView = ({ id, next }) => {
  return (
    <div>
      <GameItem id={id} />
      <Bets gameId={id} />
      <div className="modal-actions">
        <Link className="button secondary" to={`/games/${next}`}>Next</Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { gameId } = ownProps.match.params;
  const id = parseInt(gameId, 10);
  const currentGame = state.games[id];
  const next = sortBy(values(state.games), 'order').filter(({ order }) => order > currentGame.order)[0];

  return {
    id,
    next: next.id,
  }
};

export default withModal('/games')(connect(mapStateToProps)(GameView));
