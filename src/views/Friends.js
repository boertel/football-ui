import React, { Component } from 'react'
import { connect } from 'react-redux';
import { values, sortBy } from 'lodash';

import { asyncConnect } from '../utils/components';
import { loadFriends, join, leave, create, } from '../resources/friend';
import { Button, Leaderboard, TextInput } from '../ui';


const FriendList = connect((state, ownProps) => ({ friend: state.friend[ownProps.id], }))(({ friend, currentUserId }) => {
  return (
    <div className="friend-list">
      <Leaderboard users={friend.members} currentUserId={currentUserId}>for {friend.name}</Leaderboard>
    </div>
  )
})

class Friends extends Component {
  state = {
    name: '',
  }

  onChange = (evt) => {
    const { selectedIndex } = evt.target;
    console.log(selectedIndex, this.getFriends());
    let to = '/friends';
    if (selectedIndex > 0) {
      const friend = this.getFriends()[selectedIndex - 1];
      to += `/${friend.id}`;
    }
    this.props.history.push(to);
  }

  getFriends = () => sortBy(values(this.props.friends), 'name');

  join = () => this.props.join(this.props.match.params.friendId);
  leave = () => this.props.leave(this.props.match.params.friendId);
  create = () => this.props.create(this.state.name).then(response => {
    this.props.history.push(`/friends/${response.data.id}`);
  });


  onChangeName = (evt) => this.setState({ name: evt.target.value });

  render() {
    const {
      match,
      currentUserId,
      friends,
    } = this.props;

    const { friendId } = match.params;

    const friend = friends[friendId];

    const options = [<option key="empty">Create a group</option>].concat(this.getFriends().map(({ id, name, members, }) => {
      const count = Object.keys(members).length;
      return <option value={id} key={id}>{name} ({count} {count === 1 ? 'member' : 'members'})</option>;
    }));

    let button = <Button onClick={this.create} className="secondary">Create a group</Button>
    if (friendId) {
      const already = Object.keys(friend.members).indexOf(`${currentUserId}`) !== -1;
      button = <Button onClick={this.join} className="primary">Join this group</Button>;
      if (already) {
        button = <Button onClick={this.leave} className="danger">Leave the group</Button>;
      }
    }

    return (
      <div className="friends">
        <div className="actions">
          <label>Select a group of friends: <select onChange={this.onChange} value={friendId}>{options}</select></label>
          <div>
            {!friend ? <TextInput onChange={this.onChangeName} value={this.state.name} placeholder="Group's name" /> : null}{button}
          </div>
        </div>
        {friendId && <FriendList id={friendId} currentUserId={currentUserId} />}
      </div>
    )
  }
}

export default asyncConnect(state => ({ friends: state.friend, currentUserId: state.auth.id, refresh: Object.keys(state.friend).length === 0 }), { load: loadFriends, join, leave, create, })(Friends);
