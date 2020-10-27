import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import { store } from './store';
import { Game } from './modules/game/game';
import {BrowserRouter} from 'react-router-dom';
import { Routes } from './routes';

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
   </Provider>
)

export const ws = new WebSocket('ws://localhost:3000');


ReactDOM.render(
  app,
  document.getElementById('root')
);


