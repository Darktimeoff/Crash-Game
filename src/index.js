import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import { store } from './store';
import { Game } from './modules/game/game';

const app = (
  <Provider store={store}>
    <Game />
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);


