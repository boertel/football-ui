import React from 'react';
import { Link } from 'react-router-dom';


const Task = ({ message, icon, to='/', }) => {
  return (
    <Link className="task" to={to}>
      <div className="icon">{icon}</div>
      <div className="message">{message}</div>
    </Link>
  );
}

export default Task
