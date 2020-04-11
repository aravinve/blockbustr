import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

const comments = [];

class HomepageModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  
	  comments,
	  username:'',
      message: '',
      sendername: '',
      credits: 30,
      redirect: null,
    };
	
	this.getComments();
  }

  if(redirect) {
    return <Redirect to={redirect} />;
  }
  handleComponentChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  performPost = () => {
    const headers = {
      'Content-type': 'application/json',
      Authorization: 'Client ' + localStorage.getItem('secretKey'),
    };
    const data = this.props.user;
    axios.post('/API/validateUser/post', data, { headers: headers })
      .then((res) => {
        console.log(res.data);
        this.setState({ message: res.data.message });
      });
  };
  
  postComment = (event) => {
	event.preventDefault();
	
	const comment = event.target.elements.comment.value.trim();
	const name = this.props.user.username;	

	
    const headers = {
      'Content-type': 'application/json',
      Authorization: 'Client ' + localStorage.getItem('secretKey'),
    };
    
	const payLoad = {
      comment: comment,
	  username: name,
    };
	
    axios
      .post('/API/validateUser/postcomment', payLoad, { headers: headers })
      .then((res) => {
        console.log(res.data);
        this.setState({ message: res.data.message});
      });

    // Clear input fields
    event.target.elements.comment.value = ''; 
	
	// Update the comments array
	comments.splice(0,comments.length)
	this.setState({comments});
	
	// Retrieve Comments
	this.getComments();	
	
	// Force react component render
	this.setState({ state: this.state });

  };
  
  getComments = () =>{

	const payLoad = {
    };
	
    const headers = {
      'Content-type': 'application/json',
      Authorization: 'Client ' + localStorage.getItem('secretKey'),
    };
	
    axios.post('/API/validateUser/getcomments',payLoad, { headers: headers })
      .then((res) => {
		if (res.data.success){	  
			
			console.log(res.data);
			
			res.data.comments.forEach(function(elem, index){
			  res.data.comments.splice();
			  comments.push(elem);
			});
			
		    this.setState({comments});
		
		}else{alert(res.data.message);}
		
      }).catch(err => {
				alert("Oh no -- there is an error!");
		    	console.error(err);
	});  

  };

  //get credit calls to the backend
  getCredits = (event) => {
    event.preventDefault();

    const headers = {
      'Content-type': 'application/json',
      Authorization: 'Client ' + localStorage.getItem('secretKey'),
    };

    axios
      .get('/API/validateUser/getcredits', {
        headers: headers,
        params: {
          credits: this.state.credits,
          name: this.state.sendername
        },
      })
      .then((res) => {
        console.log(res.data.name);
        window.location = '/showcredits?credits=' + res.data.credits + '&name=' +res.data.name;
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
              <div className='form-group'>
                <label>Name</label>
                <input
                  type='text'
                  name='sendername'
                  value={this.state.sendername}
                  onChange={this.handleComponentChange}
                  className='form-control'
                  id='sendername'
                  placeholder='Name'
                />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='senderemail'
                  value={this.state.senderemail}
                  onChange={this.handleComponentChange}
                  className='form-control'
                  id='senderemail'
                  placeholder='email@domain.com'
                />
              </div>
              <input
                type='submit'
                value='Submit'
                className='btn btn-primary'
                onClick={this.getCredits}
              />
            </form>
          </div>
        </div>
		
		<br/>
		
		<div className='row'>
		
			<h3>Kindly leave your thoughts below:</h3>
		
		</div>
		
		<div className='row' >
					
		  <br/>
		  <form onSubmit={this.postComment}>
		    <div className="field">
				<div className="control">
					<textarea type="textarea" name="comment" placeholder="Add a comment" style={{ width: "70vw"  }} />
				</div>
			</div>	  
			
			<div className="field">
				<div className="control">
					<button
						className='btn btn-outline-dark mt-3 mb-3 btn-block'
						type='submit'
						value='Submit'        
					>
						Post Now
					</button>
				</div>
			</div>
		  
		  </form>
		
		</div>
		<br/>
		
        
		<div className='row'>
		
			<h3>Comments:</h3>
							
		</div>
						
		<div>
		 
		    
			{
					this.state.comments.map(function(comment){
				  
					return <div className={"row"} key={comment._id}>{comment.username} : {comment.comment}</div>;
					
				  })				
					
			}  
		    
		   
		</div>		
		
		
      </div>
    );
  }
}

export default HomepageModule;
