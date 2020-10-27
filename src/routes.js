import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Game } from './modules/game/game';

export const Routes =  () =>  (
    <Switch>
        <Route path='/' exact component={Game} />
        <Redirect to='/' />
    </Switch>
)