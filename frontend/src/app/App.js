import React from 'react';
import './App.scss';
import Routes from "./Routes";
import Header from "../components/Header/Header";

function App() {
  return (
    <>
      <Header/>
      <div className="App">
        <Routes />
      </div>
    </>
  );
}

export default App;
