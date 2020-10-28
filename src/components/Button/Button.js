import React from 'react';
import './Button.scss';

export const Button = ({color='', children='', ...props}) => (
  <div className={'button_wrapper ' + color + '_wrapper' }>
    <button className={'button ' + color + '_button'} {...props}>{children}</button>
  </div>
);