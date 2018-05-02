import React from 'react';

import CompetitorFlag from './CompetitorFlag';
import ScoreInput from './ScoreInput';


const GameScore = ({ competitor_name, id, locked, name, }) => (
  <div className="score">
    <div className="competitor">
      <CompetitorFlag name={competitor_name} />
      <div className="competitor-name">{competitor_name}</div>
    </div>
    <ScoreInput name={name} gameId={id} disabled={locked} />
  </div>
);

export default GameScore;
