import React from 'react';
import './Button.scss';

export const Button = (props) => (
  <div className={'button_wrapper ' + `${props.color + '_wrapper'}` }>
    <button className={'button ' + `${props.color + '_button'}` } {...props}>{props.children}</button>
  </div>
);