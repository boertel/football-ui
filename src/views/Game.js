import React from 'react';

import { asyncConnect } from '../utils/components';
import { GameCard } from '../ui';
import { proxy } from '../resources/utils';

const mapStateToProps = (state, ownProps) => ({ ...proxy(state.games[ownProps.id], state, ['bet']) });

const Game = asyncConnect(mapStateToProps)(GameCard);

export default Game;
