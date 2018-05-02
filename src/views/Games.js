import React, { Component } from 'react';
import { sortBy, values, } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { asyncConnect } from '../utils/components';
import { loadGames } from '../resources/games';
import { loadMyBets } from '../resources/bet';
import GameItem from './Game';
import GameView from './GameView';
import PrivateRoute from '../PrivateRoute';


class Games extends Component {
  _storeRef = (ref) => this._ref = ref;

  componentDidMount() {
    this._ref.scrollIntoView();
  }

  render() {
    let groupBy = {};
    values(this.props.games).forEach(game => {
      const day = moment(game.start).format('YYYY-MM-DD');
      groupBy[day] = groupBy[day] || {
        day,
        games: [],
      };
      groupBy[day].games.push(game);
    });

    //const days = sortBy(values(groupBy), 'day').slice(0, 4);
    const days = sortBy(values(groupBy), 'day');

    let past = false, previous = false;
    return (
      <div className="games">{days.map(({ day, games }) => {
        const m = moment.utc(day);
        const title = m.calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: '[Last] dddd',
            sameElse: 'dddd, MMMM DD'
        });
        previous = past;
        past = m.isBefore(moment.utc())
        const first = previous === true && past === false
        return (
          <div className={`day ${past ? 'past' : ''}`} key={day} ref={first && this._storeRef}>
            <h2>{title}</h2>
            <div className="games">
              {sortBy(games, 'order').map(game => <Link to={`/games/${game.id}`} key={game.id} className="game"><GameItem id={game.id} /></Link>)}
            </div>
          </div>
        );
      })}
      <PrivateRoute path="/games/:gameId" component={GameView} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ games: state.games, refresh: Object.keys(state.games).length === 0 })

export default asyncConnect(mapStateToProps, { load: loadGames })(Games);
