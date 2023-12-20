import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginButton, LogoutButton } from './components';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const auth0 = useAuth0();
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
      {auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
}

export default App;
