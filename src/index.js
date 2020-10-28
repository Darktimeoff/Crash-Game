import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import { store } from './store';
import WebSocket from 'isomorphic-ws';
import Game from './modules/game/game';

const app = (
  <Provider store={store}>
    <Game />
  </Provider>
)

export const ws = new WebSocket('ws://localhost:3030');


ReactDOM.render(
  app,
  document.getElementById('root')
);


