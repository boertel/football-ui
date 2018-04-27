import React from 'react';
import { sortBy, values, } from 'lodash';
import moment from 'moment';

import { asyncConnect } from '../utils/components';
import { loadGames } from '../resources/games';
import { loadMyBets } from '../resources/bet';
import { proxy } from '../resources/utils';
import Game from './Game';


const Games = props => {
  let groupBy = {};
  values(props.games).forEach(game => {
    const day = moment(game.start).format('YYYY-MM-DD');
    groupBy[day] = groupBy[day] || {
      day,
      games: [],
    };
    groupBy[day].games.push(game);
  });

  const days = sortBy(values(groupBy), 'day').slice(0, 2);

  return (
    <div className="games">{days.map(({ day, games }) => {
      return (
        <div className="day" key={day}>
          <h2>{moment(day).format('dddd D')}</h2>
          <div className="games">
            {sortBy(games, 'order').map(game => <Game id={game.id} key={game.id} />)}
          </div>
        </div>
      );
    })}
    </div>
  );
}

const mapStateToProps = state => ({ games: state.games, refresh: Object.keys(state.games).length === 0 })

export default asyncConnect(mapStateToProps, { load: loadGames })(Games);
