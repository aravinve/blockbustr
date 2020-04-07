import React, { Component } from 'react';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const query = new URLSearchParams(this.props.location.search);
    // const token = query.get('q');
    return (
      <div>
        <h1>Movie Search</h1>
        <p>{this.props.movieList}</p>
      </div>
    );
  }
}
