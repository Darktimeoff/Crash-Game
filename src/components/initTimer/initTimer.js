import React from 'react';
import { Text } from './../text/text';

export const InitTimer = ({timer}) => (
    <>
        <Text>BE READY FOR A ROUND</Text>
        <Text style={{fontSize: 40, marginTop: 50 }}>{timer}</Text> 
    </>
)