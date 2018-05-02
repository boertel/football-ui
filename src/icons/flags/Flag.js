import React from 'react';

const Flag = ({ size, viewBox, cut, children, ...rest }) => {
  let defs = null;
  let clipPath = null;
  if (cut === 'bottom') {
    defs = (
      <defs>
        <clipPath id={cut}>
          <rect x="0" y="0" width="68" height="34" transform="translate(-23, 15) rotate(-35)" />
        </clipPath>
      </defs>
    );
    clipPath = `url(#${cut})`;
  }
  if (cut === 'top') {
    defs = (
      <defs>
        <clipPath id={cut}>
          <rect x="0" y="0" width="68" height="34" transform="translate(0, 40) rotate(-35)" />
        </clipPath>
      </defs>
    )
    clipPath = `url(#${cut})`;
  }

  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox={viewBox}
      {...rest}
    >{defs}<g clipPath={clipPath}>{children}</g></svg>
  );
};

Flag.defaultProps = {
  size: 48,
  viewBox: '0 0 48 48',
};

export default Flag;
