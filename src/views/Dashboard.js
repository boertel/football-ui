import React from 'react';
import { Link } from 'react-router-dom';

import { asyncConnect } from '../utils/components';
import { loadUser } from '../resources/user';


const Dashboard = ({ first_name }) => (
  <div>
    <h1>Hi {first_name}!</h1>
    <Link to="/games">Games</Link>
  </div>
)

const mapStateToProps = state => ({
  refresh: !state.user.id,
  first_name: state.user.first_name,
})

export default asyncConnect(mapStateToProps, { load: loadUser })(Dashboard)
