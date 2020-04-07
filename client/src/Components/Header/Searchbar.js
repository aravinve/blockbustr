import React from 'react';

export default function Searchbar(props) {
  return (
    <React.Fragment>
      <form className='form-inline'>
        <input
          type='search'
          className='form-control mr-sm-2'
          placeholder='Search Movies'
          name='search'
          onChange={props.handleComponentChange}
        />
        <a
          href={`/API/search?q=${props.searchTerm} `}
          className='btn btn-outline-light my-2 my-sm-0'
          onClick={props.searchMethod}
        >
          Search Now
        </a>
      </form>
    </React.Fragment>
  );
}
