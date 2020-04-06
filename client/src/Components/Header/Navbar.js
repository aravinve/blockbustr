import React from 'react';
import Logo from './Logo';
import Searchbar from './Searchbar';

function Navbar(props) {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-success justify-content-between'>
      <Logo />
      <Searchbar
        searchTerm={props.searchTerm}
        handleComponentChange={props.handleComponentChange}
      />
    </nav>
  );
}

export default Navbar;
