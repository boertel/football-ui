import React from 'react';

const Task = ({ message, icon, }) => {
  return (
    <div className="task">
      <div className="icon">{icon}</div>
      <div className="message">{message}</div>
    </div>
  );
}

export default Task
