import React from 'react';
import { sortBy, values } from 'lodash';

import { asyncConnect } from '../utils/components';
import { loadGames } from '../resources/games';
import { GameCard } from '../ui';


const Games = props => {
  const games = sortBy(values(props.games), 'order')
  return (
    <div className="games">{games.map(game => <GameCard key={game.id} {...game} />)}</div>
  );
}

const mapStateToProps = state => ({ games: state.games })

export default asyncConnect(mapStateToProps, { load: loadGames })(Games);
