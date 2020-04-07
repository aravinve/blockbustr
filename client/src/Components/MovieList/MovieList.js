import React, { Component } from 'react';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Movie Search</h1>
        <p>{this.props.movieList}</p>
      </div>
    );
  }
}
