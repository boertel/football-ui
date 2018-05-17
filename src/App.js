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
  Logout,
  Signup,
  Leaderboard,
  AuthRedirect,
  Profile,
  Friends,
} from './views';

import Footer from './ui/Footer';

import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Auth>
          <Router>
            <div style={{height: '100%'}}>
              <Header />
              <div className="content">
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/games" component={Games} />
                <PrivateRoute path="/profile/:userId" component={Profile} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute path="/leaderboard/:friendId" component={Friends} />
                <PrivateRoute exact path="/leaderboard" component={Friends} />
                <Route path="/" exact component={AuthRedirect} />
                <Footer />
              </div>
            </div>
          </Router>
        </Auth>
      </Provider>
    );
  }
}

export default App;
