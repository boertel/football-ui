import React, { Component } from 'react';
import { compose } from 'redux';
import { connect, } from 'react-redux';


export const withAsync = (async, options) => {
  return (WrappedComponent) => {
    return class WithAsyncComponent extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: !!props.load,
        }
      }

      done = () => this.setState({ loading: false });

      load = (props, refresh) => {
        if (!props.load) {
          return;
        }

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
        // TODO when should I re-load the data? refresh changed?
        //this.load(nextProps);
      }

      render() {
        const {
          loading,
        } = this.state;

        if (loading) {
          return <div>Loading...{this.constructor.displayName}</div>
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
