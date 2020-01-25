import 'tslib';
import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const Root = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Text CRDT App</title>
    </Helmet>
    <App />
  </div>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
