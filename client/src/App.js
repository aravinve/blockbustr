import React from 'react';
import './App.css';
import LoginModule from './Components/Login/LoginModule';
import Navbar from './Components/Header/Navbar';
import HomepageModule from './Components/Homepage/HomepageModule';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      userName: ''
    };
  }

  toggleLoginState = userName => {
    this.setState({ login: !this.state.login, userName: userName });
  };
  render() {
    return (
      <div className='App'>
        <Navbar />
        {this.state.login ? (
          <HomepageModule userName={this.state.userName} />
        ) : (
          <LoginModule toggleLoginState={this.toggleLoginState} />
        )}
      </div>
    );
  }
}

export default App;
