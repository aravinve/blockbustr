import React, { Component } from 'react';
import axios from 'axios';

class HomepageModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  performPost = () => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: 'Client ' + localStorage.getItem('secretKey')
    };
    const data = this.props.user;
    axios
      .post('/API/validateUser/post', data, { headers: headers })
      .then(res => {
        console.log(res.data);
        this.setState({ message: res.data.message });
      });
  };
  render() {
    return (
      <div>
        <button className='btn btn-outline-secondary'>Logout</button>
        <h1>Welcome to Blockbustr, {this.props.user.userName}</h1>
        <a href={this.props.user.firstName}>
          Click here to claim free movie coupon!!
        </a>
        <button onClick={this.performPost}>Post Now</button>
        {this.state.message}
      </div>
    );
  }
}

export default HomepageModule;
