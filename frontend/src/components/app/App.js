import React from 'react';
import logo from 'assets/logo.svg';
import './App.scss';
import Loader from "../loader/Loader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>This is covexit! Woo!</h1>
        <Loader/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
