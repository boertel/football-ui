import React, { Component } from 'react';
import { values } from 'lodash';
import { connect } from 'react-redux';

import { createOrUpdateBet } from '../resources/bet';


class ScoreInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.format(this.props.value),
      saving: false,
      saved: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: this.format(nextProps.value) });
    }
  }

  format = (v) => v === null || isNaN(parseInt(v, 10)) ? '' : parseInt(v, 10);

  onChange = (evt) => {
    this.setState({ value: this.format(evt.target.value) });
  }

  onBlur = (evt) => {
    const {
      name,
      gameId,
    } = this.props;
    const {
      value,
    } = this.state;

    if (!isNaN(parseInt(value, 10))) {
      if (this.props.value !== value) {
        this.saving();
        this.props.createOrUpdateBet(gameId, {[name]: value}).then(this.done);
      }
    }
  }

  saving = () => this.setState({ saving: true, });
  done = () => this.setState({ saving: false, saved: true, });

  onClick = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  };

  render() {
    const {
      betId,
      gameId,
      createOrUpdateBet,
      ...rest,
    } = this.props;

    const {
      saving,
      saved,
    } = this.state;

    const disabled = saving;

    return (
      <div className="score-input">
        <input
          type="text"
          disabled={disabled}
          onChange={this.onChange}
          onClick={this.onClick}
          {...rest}
          onBlur={this.onBlur}
          value={this.state.value}
        />
        {saving && 'saving...'}
        {saved && 'saved'}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const userId = state.auth.id;
  const { gameId } = ownProps;

  const bet = values(state.bet).find(bet => bet.user.id === userId && bet.game.id === gameId) || {};
  return {
    value: bet[ownProps.name],
  }
}

export default connect(mapStateToProps, { createOrUpdateBet, })(ScoreInput);
