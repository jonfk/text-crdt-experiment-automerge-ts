import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { Editor1, Editor2 } from './components/Editor';
import store from './redux/store';
import pjson from '../package.json';

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <h1>{pjson.name}</h1>
        <div>Automerge version : {pjson.dependencies.automerge}</div>
        <div style={{ display: `flex` }}>
          <div style={{ margin: `1em` }}>
            <Editor1 />
          </div>
          <div style={{ margin: `1em` }}>
            <Editor2 />
          </div>
        </div>
      </Provider>
    </div>
  );
};

export default App;
