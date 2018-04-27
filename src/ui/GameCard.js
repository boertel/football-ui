import React from 'react';
import isEqual from 'lodash/isEqual';
import { Link } from 'react-router-dom';

import { withClassNames } from './utils';
import Time from './Time';
import BetForm from './BetForm';
import Bets from '../views/Bets';
import PrivateRoute from '../PrivateRoute';
import CompetitorFlag from './CompetitorFlag';


class GameCard extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    let equality = false
    for (let key in nextProps) {
      const prop = nextProps[key];
      if (typeof prop === 'object' && prop !== null) {
        equality = isEqual(this.props[key], prop);
      } else {
        equality = this.props[key] === nextProps[key];
      }
    }

    return !equality;
  }

  render() {
    const { id, className, start, competitor_a, competitor_b, group, locked, } = this.props;
    const to = `/games/${id}`
    console.log('render', to);
    // TODO wrap this in a Link or onClick
    return (
      <div className={className}>
        <Link to={to}>
          <div className="game-card">
            <Time time={start} format="HH:mm a" />
            <div>
              <div className="competitor">
                <CompetitorFlag name={competitor_a.name} />
                <div>{competitor_a.name}</div>
              </div>
              <div className="competitor">
                <CompetitorFlag name={competitor_b.name} />
                <div>{competitor_b.name}</div>
              </div>
            </div>
            <BetForm gameId={id} disabled={locked} />
          </div>
        </Link>
        <PrivateRoute path={to} component={(props) => <Bets {...this.props} gameId={id} />} />
      </div>
    );
  }
}

export default withClassNames('game')(GameCard);
