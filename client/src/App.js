import React from 'react';
import './App.css';
import LoginModule from './Components/Login/LoginModule';
import Navbar from './Components/Header/Navbar';
import HomepageModule from './Components/Homepage/HomepageModule';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      user: ''
    };
  }

  toggleLoginState = user => {
    this.setState({ login: !this.state.login, user: user });
  };
  render() {
    return (
      <div className='App'>
        <Navbar />
        {this.state.login ? (
          <HomepageModule user={this.state.user} />
        ) : (
          <LoginModule toggleLoginState={this.toggleLoginState} />
        )}
      </div>
    );
  }
}

export default App;
