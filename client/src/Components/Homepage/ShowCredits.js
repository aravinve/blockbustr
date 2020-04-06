import React, { Component } from "react";
class ShowCredits extends Component {
  render() {
    const { params } = this.props.match;
    console.log(params.name);
    return (
      <div>
        <h4>Thanks for recommending your friend {params.name}!</h4>
        <p>{params.name}</p>
        {params.name ? <b>ID: {params.name}</b> : <i>You will get 30 movie credits</i>}
      </div>
    );
  }
}

export default ShowCredits;
