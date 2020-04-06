import React, { Component } from 'react';
import axios from 'axios';
import ShowCredits from './ShowCredits';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";


class HomepageModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      sendername:'',
      senderemail:'',
      redirect: null
    };
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }
  handleComponentChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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

//get credit calls to the backend
  getCredits = event =>{
    event.preventDefault()

    const headers = {
     'Content-type': 'application/json',
      Authorization: 'Client ' + localStorage.getItem('secretKey')
    };

    axios
      .get('/API/validateUser/getcredits', {
        headers: headers,
        params: {
          name: this.state.sendername,
          email:this.state.senderemail
        }
      })
      .then(res => {
        console.log(res.data.name);
        //this.setState({ redirect: '/showcredits?name=${res.data.name}'});
        window.location='/showcredits?name='+res.data.name
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
        <div>
        {/*<a className='blockquote' href="!#">
          Refer a Friend and get movie credits
        </a>*/}
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="sendername" value={this.state.sendername} onChange={this.handleComponentChange} className="form-control" id="sendername" placeholder="Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="senderemail" value={this.state.senderemail} onChange={this.handleComponentChange} className="form-control" id="senderemail" placeholder="email@domain.com" />
          </div>
          <input type="submit" value="Submit" className="btn btn-primary" onClick={this.getCredits}/>
        </form>
      </div>
           {/*<button
            className='btn btn-outline-dark mt-3 mb-3 btn-block'
            onClick={this.performPost}
          >
            Post Now
          </button>*/}
        </div>
        <div className='row'>{this.state.message}</div>

      </div>
    );
  }
}

export default HomepageModule;
