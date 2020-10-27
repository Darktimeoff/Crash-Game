import React from 'react';
import './text.scss';

export const Text = ({children='', color='',...props}) => (
    <div className={'text ' + color} {...props}>{children}</div>
)