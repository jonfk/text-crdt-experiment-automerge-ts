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
        <div>
          Automerge version : {pjson.dependencies.automerge}
        </div>
        <Editor1 />
        <Editor2 />
      </Provider>
    </div>
  );
};

export default App;
