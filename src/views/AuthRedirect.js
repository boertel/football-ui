import React, { Component } from 'react';
import { connect } from 'react-redux';

class AuthRedirect extends Component {
  componentDidMount() {
    const { history, authenticated } = this.props;
    if (authenticated) {
      history.replace('/dashboard');
    } else {
      history.replace('/login');
    }
  }
  render() {
    return null;
  }
}

export default connect(state => ({ ...state.auth }))(AuthRedirect);
