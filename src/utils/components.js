import React, { Component } from 'react';
import { compose } from 'redux';
import { connect, } from 'react-redux';


export const withAsync = (async, options) => {
  return (WrappedComponent) => {
    return class WithAsyncComponent extends Component {
      state = {
        loading: true,
      }

      done = () => this.setState({ loading: false });

      load = (props, refresh) => {
        if (props.refresh === false) {
          this.done();
          return;
        }

        this.setState({ loading: true, });
        return async(props).then(this.done);
      }

      componentDidMount() {
        this.load(this.props);
      }

      componentWillReceiveProps(nextProps) {
        //this.load(nextProps);
      }

      render() {
        const {
          loading,
        } = this.state;

        if (loading) {
          return <div>Loading...</div>
        }

        return <WrappedComponent {...this.props} />
      }
    }
  }
}

export const asyncConnect = (mapStateToProps, mapDispatchToProps, options) => {
  return (WrappedComponent) => {
    return compose(
      connect(mapStateToProps, mapDispatchToProps),
      withAsync((props) => props.load(props), options),
    )(WrappedComponent);
  }
}
