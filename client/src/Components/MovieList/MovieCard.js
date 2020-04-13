import React from 'react';

function MovieCard(props) {
  const imgSource =
    props.omdbData.Poster === 'N/A'
      ? require('./banner.png')
      : props.omdbData.Poster;
  return (
    <div
      className='card col-3 m-3 p-2 bg-success text-white'
      id={props.omdbData.imdbId}
    >
      <img
        src={imgSource}
        alt='Poster'
        className='card-img-top img-fluid h-75'
      />
      <div className='card-header font-weight-bold'>
        <h5>{props.omdbData.Title}</h5>
      </div>
      <div className='card-body'>
        <p className='card-text text-capitalize'>{props.omdbData.Year}</p>
        <p className='card-text text-capitalize'>{props.omdbData.Type}</p>
      </div>
    </div>
  );
}

export default MovieCard;
