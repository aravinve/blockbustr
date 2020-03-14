import React, { Component } from 'react';

class HomepageModule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Welcome to Blockbustr, {this.props.userName} </h1>
      </div>
    );
  }
}

export default HomepageModule;
