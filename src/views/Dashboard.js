import React from 'react';
import { Link } from 'react-router-dom';

import { asyncConnect } from '../utils/components';
import { loadUser } from '../resources/auth';


const Dashboard = ({ first_name }) => (
  <div>
    <h1>Hi {first_name}!</h1>
    <Link to="/games">Games</Link>
  </div>
)

const mapStateToProps = state => ({
  refresh: !state.auth.id,
  first_name: state.auth.first_name,
})

export default asyncConnect(mapStateToProps, { load: loadUser })(Dashboard)
