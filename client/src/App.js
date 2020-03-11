import React from 'react';
import './App.css';
import LoginModule from './Components/Login/LoginModule';
import Navbar from './Components/Header/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <LoginModule />
    </div>
  );
}

export default App;
