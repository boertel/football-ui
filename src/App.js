import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import {
  Auth,
  Dashboard,
  Header,
  Games,
  Login,
  Signup,
  Bets,
  Leaderboard,
} from './views';

import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Auth>
          <Router>
            <div className="content">
              <Header />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/leaderboard" component={Leaderboard} />
              <PrivateRoute path="/games" component={Games} />
            </div>
          </Router>
        </Auth>
      </Provider>
    );
  }
}

export default App;
