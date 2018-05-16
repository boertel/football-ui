import React from 'react';

import { asyncConnect } from '../utils/components';
import { loadUser } from '../resources/user';
import { withClassNames } from '../ui/utils';


const Profile = ({ full_name, points, className }) => {
  return (
    <div className={className}>
      <h2><div>{full_name}</div><div>{points} points</div></h2>
    </div>
  );
}

export default asyncConnect((state, ownProps) => ({ ...state.user[(ownProps.match.params.userId || state.auth.id)]}), { load: loadUser })(withClassNames('profile')(Profile))
