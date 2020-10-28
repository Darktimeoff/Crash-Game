import React from 'react';
import { Text } from './../text/text';

export const CrashGame = ({ration}) => (
    <>
        <Text color='ration'>{'x'+ration}</Text> 
        <Text color='crashed'>Crashed you lose</Text>
    </>
)