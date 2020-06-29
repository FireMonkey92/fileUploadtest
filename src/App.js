import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Opens in new tab
        </a>
        <br />
        <a rel="noopener noreferrer" className="App-link" target="_blank" href="https://helenzys.com/">link should open in new tab</a>
        <br />
        <a rel="noopener noreferrer" className="App-link" target="_self" href="https://helenzys.com/">link should not open in new tab</a>
        <br />
        <a rel="noopener noreferrer" className="App-link" href="https://helenzys.com/">link should not open in new tab</a>
      </header>
    </div>
  );
}

export default App;
