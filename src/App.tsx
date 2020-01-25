import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import Editor from './components/Editor';
import store from './redux/store';


const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Editor />
      </Provider>
    </div>
  );
};

export default App;
