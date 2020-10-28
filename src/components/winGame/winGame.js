import React from 'react';
import { Text } from './../text/text';

export const WinGame = ({endRation, bet, userRation}) => (
    <>
        <Text color='ration'>{'x'+endRation}</Text>
        <Text color='win'>Won ${bet} x{userRation}</Text>
    </>
)
