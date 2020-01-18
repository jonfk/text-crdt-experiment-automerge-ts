import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import Editor from './components/Editor';

const App: React.FC = () => {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Text CRDT App</title>
      </Helmet>
      <Editor />
    </div>
  );
};

export default App;
