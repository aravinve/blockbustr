import React from 'react';

export default function ErrorComponent() {
  return (
    <React.Fragment>
      <img
        src={require('./404.png')}
        className='img-fluid container w-75'
        alt='404'
      />
      <br />
      <a href='/' className='btn btn-outline-success m-4'>
        Go to Home
      </a>
    </React.Fragment>
  );
}
