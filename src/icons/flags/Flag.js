import React from 'react';

const Flag = ({ size, viewBox, ...rest }) =>
  <svg
    width={`${size}px`}
    height={`${size}px`}
    viewBox={viewBox}
    {...rest}
  />;

Flag.defaultProps = {
  size: 48,
  viewBox: '0 0 48 48',
};

export default Flag;
