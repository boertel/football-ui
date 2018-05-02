import React, { Component } from 'react';

class Modal extends Component {
  onKeydown = (evt) => {
    console.log(evt.key)
    if (evt.key === 'Escape') {
      this.goBack();
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
  }

  goBack = (evt) => {
    const { history, back } = this.props;
    evt && evt.stopPropagation();
    if (back) {
      history.push(back);
    } else {
      history.goBack();
    }
  }

  render() {
    const { history, children } = this.props;
    return (
      <div
        onClick={this.goBack}
        className="modal-overlay"
      >
        <div className="modal">
          <div className="modal-header">
            <a onClick={this.goBack}>&times;</a>
          </div>
          <div className="modal-content" onClick={(evt) => evt.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export const withModal = (back) => 
  (WrappedComponent) => {
  return (props) => {
    return (
      <Modal history={props.history} back={back}><WrappedComponent {...props} /></Modal>
    );
  }
}

export default Modal
