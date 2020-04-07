import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';
import Reset from './Reset';
import OTP from './OTP';

class LoginModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLogin: true,
      isShowRegister: false,
      isShowForgot: false,
      isShowReset: false,
      isShowOTP: false,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
    };
  }
  toggleShowForgot = () => {
    this.setState({
      isShowForgot: !this.state.isShowForgot,
      isShowLogin: !this.state.isShowLogin,
      isShowRegister: false,
      isShowReset: false,
      isShowOTP: false,
    });
  };
  toggleShowRegister = () => {
    this.setState({
      isShowForgot: false,
      isShowReset: false,
      isShowOTP: false,
      isShowLogin: !this.state.isShowLogin,
      isShowRegister: !this.state.isShowRegister,
    });
  };
  toggleShowReset = () => {
    this.setState({
      isShowForgot: false,
      isShowReset: !this.state.isShowReset,
      isShowOTP: !this.state.isShowOTP,
      isShowLogin: false,
      isShowRegister: false,
    });
  };
  toggleShowOTP = () => {
    this.setState({
      isShowForgot: !this.state.isShowForgot,
      isShowReset: false,
      isShowOTP: !this.state.isShowOTP,
      isShowLogin: false,
      isShowRegister: false,
    });
  };
  registerUser = (e) => {
    e.preventDefault();
    const payLoad = {
      username: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    axios.post('/API/addAccount', payLoad).then((res) => {
      if (res.data.success) {
        this.setState({
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          email: '',
        });
        alert('Account Added Successfully');
        document.getElementById('register-form').reset();
      }
    });
  };

  performResetPassword = (e) => {
    e.preventDefault();
    axios
      .get(
        `/API/resetPassword?username=${this.state.username}&password=${this.state.password}`
      )
      .then((res) => {
        if (res.data.success) {
          alert('Password Changed Successfully');
          this.setState({
            isShowLogin: true,
            isShowRegister: false,
            isShowOTP: false,
            isShowForgot: false,
            isShowReset: false,
          });
        }
      });
  };

  handleComponentChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validatePassword = (e) => {
    if (this.state.password !== e.target.value) {
      console.log('No Match');
    }
  };
  //validate the user on entering the credentials
  validateUser = (event) => {
    event.preventDefault();
    const payLoad = {
      username: this.state.username,
      password: this.state.password,
    };
    axios.post('/API/validateUser', payLoad).then((res) => {
      if (res.data.success) {
        alert('Logged In Successfully');
        this.setState({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          username: res.data.user.username,
          password: res.data.user.password,
          email: res.data.user.email,
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
          email: '',
        });
      }
    });
  };
  //validate the user who want to reset his/her password
  validateForgotPasswordUser = (event) => {
    event.preventDefault();
    const payLoad = {
      username: this.state.username,
    };
    axios.post('/API/forgotPassword', payLoad).then((res) => {
      if (res.data.success) {
        alert('Please enter your OTP');
        this.setState({
          isShowLogin: false,
          isShowRegister: false,
          isShowOTP: true,
          isShowForgot: false,
          isShowReset: false,
        });
        //localStorage.setItem('userData', JSON.stringify(this.state));
      }else{
		  
		alert("No record found, please re-enter your email address!");
        this.setState({
          isShowLogin: false,
          isShowRegister: false,
          isShowOTP: true,
          isShowForgot: false,
          isShowReset: false,
        });
	    
	  }
    });
  };

  //validate the OTP
  validateOTP = (event) => {
    event.preventDefault();
    const payLoad = {
      username: this.state.username,
      onetimepassword: this.state.onetimepassword,
    };
    axios.post('/API/validateOTP', payLoad).then((res) => {
      if (res.data.success) {
        alert('Your OTP is correct');
        this.setState({
          isShowLogin: false,
          isShowRegister: false,
          isShowForgot: false,
          isShowOTP: false,
          isShowReset: true,
        });
        //localStorage.setItem('userData', JSON.stringify(this.state));
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
              <Forgot
                hideForgot={this.toggleShowForgot}
                validateForgotPasswordUser={this.validateForgotPasswordUser}
                handleComponentChange={this.handleComponentChange}
              />
            ) : null}
            {this.state.isShowReset ? (
              <Reset
                hideReset={this.toggleShowReset}
                performResetPassword={this.performResetPassword}
                handleComponentChange={this.handleComponentChange}
                validatePassword={this.validatePassword}
              />
            ) : null}
            {this.state.isShowOTP ? (
              <OTP
                hideOTP={this.toggleShowOTP}
                validateOTP={this.validateOTP}
                handleComponentChange={this.handleComponentChange}
              />
            ) : null}
          </div>
          <div className='col-6'></div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginModule);
