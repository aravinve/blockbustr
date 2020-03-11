import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';

class LoginModule extends Component {
  state = {
    isShowLogin: true,
    isShowRegister: false,
    isShowForgot: false
  };
  toggleShowForgot = () => {
    this.setState({
      isShowForgot: !this.state.isShowForgot,
      isShowLogin: !this.state.isShowLogin,
      isShowRegister: false
    });
  };
  toggleShowRegister = () => {
    this.setState({
      isShowForgot: false,
      isShowLogin: !this.state.isShowLogin,
      isShowRegister: !this.state.isShowRegister
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className='row m-4 p-2'>
          <div className='col-6'>
            {this.state.isShowLogin ? (
              <Login
                showForgot={this.toggleShowForgot}
                showRegister={this.toggleShowRegister}
              />
            ) : null}
            {this.state.isShowRegister ? (
              <Register hideRegister={this.toggleShowRegister} />
            ) : null}
            {this.state.isShowForgot ? (
              <Forgot hideForgot={this.toggleShowForgot} />
            ) : null}
          </div>
          <div className='col-6'></div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginModule;
