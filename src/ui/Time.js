import React from 'react';
import moment from 'moment';

const Time = ({ time, format }) => {
  return <div className="time">{moment(time).format(format)}</div>
}

Time.defaultProps = {
  format: 'LLL',
};

export default Time;
