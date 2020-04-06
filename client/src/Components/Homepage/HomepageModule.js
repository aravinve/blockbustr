import React, { Component } from 'react';
import axios from 'axios';

class HomepageModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  performPost = () => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: 'Client ' + localStorage.getItem('secretKey'),
    };
    const data = this.props.user;
    axios
      .post('/API/validateUser/post', data, { headers: headers })
      .then((res) => {
        console.log(res.data);
        this.setState({ message: res.data.message });
      });
  };

  render() {
    return (
      <div className='container m-auto'>
        <div className='row'>
          <button
            className='btn btn-outline-dark mb-3 mt-3'
            onClick={this.props.logout}
          >
            Logout
          </button>
        </div>
        <div className='row'>
          <h1>Welcome to Blockbustr, {this.props.user.username}</h1>
        </div>
        <div className='row'>
          <a className='blockquote' href={this.props.user.firstName}>
            Click here to claim free movie coupon!!
          </a>
        </div>
        <div className='row'>
          <button
            className='btn btn-outline-dark mt-3 mb-3 btn-block'
            onClick={this.performPost}
          >
            Post Now
          </button>
        </div>
        <div className='row'>{this.state.message}</div>
      </div>
    );
  }
}

export default HomepageModule;
