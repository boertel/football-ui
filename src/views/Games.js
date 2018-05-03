import React, { Component } from 'react';
import { sortBy, values, } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { asyncConnect } from '../utils/components';
import { loadGames } from '../resources/games';
import GameItem from './Game';
import GameView from './GameView';
import PrivateRoute from '../PrivateRoute';


class Games extends Component {
  _storeRef = (ref) => this._ref = ref;

  componentDidMount() {
    if (this._ref) {
      //this._ref.scrollIntoView();
    }
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

    let past = false, previous = false;
    const days = sortBy(values(groupBy), 'day').map(({ day, games }) => {
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
    });

    return (
      <div>
        <div className="instructions">
          <p>Before getting started a few instructions and advices:</p>
          <ul>
            <li>you can set the scores <strong>15 minutes before</strong> kick-off. After that time, you will be able to see the predictions from everybody.</li>
            <li>It is the score at <strong>90 minutes</strong> that counts, so there are opportunities for ties during the knockout phase.</li>
            <li>Fill up all the matches <strong>now</strong>, just to be safe and not miss points because you forgot to fill it up before the deadline. You can always update your score later on.</li>
            <li>Don't loose hope, matches during the knockout phase will be <strong>worth more points</strong>. There will be about the same amount of points distribute between group and knockout stages.</li>
          </ul>
        </div>
        <div>{days}</div>
        <PrivateRoute path="/games/:gameId" component={GameView} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ games: state.games, refresh: Object.keys(state.games).length === 0 })

export default asyncConnect(mapStateToProps, { load: loadGames })(Games);
