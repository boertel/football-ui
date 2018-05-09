import React from 'react';
import { values } from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';

import { proxy } from '../resources/utils';


const NextGame = ({ start, competitor_a, competitor_b }) => (
  <div className="next-game">
    <h3>What is next?</h3>
    <div>Are you ready for {competitor_a.name} vs. {competitor_b.name} starting {moment(start).fromNow()}?</div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    ...proxy(values(state.games).find(({ start }) => moment(start).isAfter()), state),
  }
}

export default connect(mapStateToProps)(NextGame);
