import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';

class LoginModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLogin: true,
      isShowRegister: false,
      isShowForgot: false,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
  }

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
  registerUser = e => {
    e.preventDefault();
    const payLoad = {
      username: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    axios.post('/API/addAccount', payLoad).then(res => {
      if (res.data.success) {
        this.setState({
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          email: ''
        });
        alert('Account Added Successfully');
        document.getElementById('register-form').reset();
      }
    });
  };
  handleComponentChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validatePassword = e => {
    if (this.state.password !== e.target.value) {
      console.log('No Match');
    }
  };
  //validate the user on entering the credentials
  validateUser = event => {
    event.preventDefault();
    const payLoad = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post('/API/validateUser', payLoad).then(res => {
      if (res.data.success) {
        alert('Logged In Successfully');
        this.setState({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          username: res.data.user.username,
          password: res.data.user.password,
          email: res.data.user.email
        });
        localStorage.setItem('secretKey', res.data.token);
        localStorage.setItem('userData', JSON.stringify(this.state));
        localStorage.setItem('isLoggedIn', res.data.success);
        this.props.setUserdata(this.state, res.data.success);
        this.props.history.push('/');
        this.setState({
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          email: ''
        });
      }
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
                validateUser={this.validateUser}
                handleComponentChange={this.handleComponentChange}
              />
            ) : null}
            {this.state.isShowRegister ? (
              <Register
                hideRegister={this.toggleShowRegister}
                registerUser={this.registerUser}
                handleComponentChange={this.handleComponentChange}
                validatePassword={this.validatePassword}
              />
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

export default withRouter(LoginModule);
