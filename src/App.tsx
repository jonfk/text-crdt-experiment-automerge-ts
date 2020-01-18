import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/SaveButton';
import SaveButton from './components/SaveButton';
import {Helmet} from "react-helmet";

const App: React.FC = () => {
  return (
    <div className="App">
                  <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <textarea rows={10} cols={40}></textarea>
      <SaveButton />
    </div>
  );
}

export default App;
