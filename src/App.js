import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />

        <a href="market://details?id=com.vmoksha.biomag" target="_blank">com.vmoksha.biomag</a>
        <br />
        <a href="market://details?id=com.vmoksha.biomag.3D.prod" target="_blank">com.vmoksha.biomag.3D.prod</a>
        <br />
        <br />

        <a href="https://play.google.com/store/apps/details?id=com.vmoksha.biomag" target="_blank" rel="external">FROM BROWSER LINK com.vmoksha.biomag</a>
        <br />
        <a href="https://play.google.com/store/apps/details?id=com.vmoksha.biomag.3D.prod" target="_blank" rel="external">FROM BROWSER LINK com.vmoksha.biomag.3D.prod</a>
      </header>
    </div>
  );
}

export default App;
