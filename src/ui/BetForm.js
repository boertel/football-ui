import React, { Component }  from 'react';

import ScoreInput from './ScoreInput';


class BetForm extends Component {
  render() {
    const {
      gameId,
      betId,
      disabled,
    } = this.props;

    return (
      <form>
        <ScoreInput name="score_a" gameId={gameId} disabled={disabled} />
        <ScoreInput name="score_b" gameId={gameId} disabled={disabled} />
      </form>
    )
  }
}

export default BetForm;
