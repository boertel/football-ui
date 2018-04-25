import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const withPrivateComponent = (WrappedComponent) => {

  const mapStateToProps = state => ({ authenticated: state.user.authenticated, });

  class PrivateComponent extends Component {
    render() {
      const {
        location,
        authenticated,
      } = this.props;

      if (authenticated) {
        return <WrappedComponent {...this.props} />
      } else {
        const to = {
          pathname: '/login',
          state: { next: location },
        };
        return <Redirect to={to} />
      }
    }
  }

  return connect(mapStateToProps)(PrivateComponent);
}


const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} component={withPrivateComponent(component)} />
)

export default PrivateRoute;
