import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import ErrorComponent from '../ErrorComponent/ErrorComponent';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      omdbList: [],
      error: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.movieList !== this.props.movieList) {
      this.getData(nextProps.movieList);
    }
  }

  componentDidMount = () => {
    this.getData(this.props.movieList);
  };

  getData = (query) => {
    axios
      .get(`http://www.omdbapi.com/?s=${query}&apikey=497974d4`)
      .then((res) => {
        if (res.status === 200 && res.data.Search !== undefined) {
          this.setState({
            omdbList: res.data.Search,
            error: false,
          });
        } else {
          this.setState({ omdbList: [], error: true });
        }
      });
  };

  render() {
    const movieCardList =
      this.state.omdbList.length > 0
        ? this.state.omdbList.map((data) => (
            <MovieCard omdbData={data} key={data.imdbID} />
          ))
        : null;
    const error = this.state.error ? <ErrorComponent /> : null;
    return (
      <div>
        <h1>Movie Search</h1>
        <p>Parameter Passed To Server: {this.props.movieList.join(',')}</p>
        <div className='row m-auto'>{movieCardList}</div>
        {error}
      </div>
    );
  }
}
