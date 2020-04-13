import React from 'react';
import './App.css';
import axios from 'axios';
import LoginModule from './Components/Login/LoginModule';
import Navbar from './Components/Header/Navbar';
import HomepageModule from './Components/Homepage/HomepageModule';
import ErrorComponent from './Components/ErrorComponent/ErrorComponent';
import MovieList from './Components/MovieList/MovieList';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ShowCredits from './Components/Homepage/ShowCredits';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: false,
      search: '',
      movieList: [],
      redirect: false,
      isVulnerable: false,
    };
  }

  componentDidMount() {
    const data =
      localStorage.getItem('userData') !== null
        ? JSON.parse(localStorage.getItem('userData'))
        : '';
    const status =
      localStorage.getItem('isLoggedIn') !== null
        ? localStorage.getItem('isLoggedIn')
        : false;
    this.setUserdata(data, status);
  }

  setUserdata = (userData, isLoggedIn) => {
    this.setState({ user: userData, isLoggedIn: isLoggedIn });
  };

  logout = () => {
    this.setState({ isLoggedIn: false, user: {} });
    localStorage.clear();
  };

  handleComponentChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  searchMethod = (e) => {
    e.preventDefault();
    axios.get(`/API/search?q=${this.state.search}`).then((res) => {
      if (res.data.success) {
        this.setState({ movieList: res.data.q, redirect: true });
      } else {
        this.setState({ isVulnerable: true, movieList: [], redirect: false });
        alert("HPP Detected !!, Don't try to attack the system!!");
      }
    });
  };

  render() {
    const redirect = this.state.redirect ? (
      <Redirect to={`/API/search/${this.state.movieList}`} />
    ) : null;
    const isVulnerable = this.state.isVulnerable ? <Redirect to='/' /> : null;
    return (
      <div className='App'>
        <Navbar
          searchTerm={this.state.search}
          handleComponentChange={this.handleComponentChange}
          searchMethod={this.searchMethod}
        />
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path='/'
              render={() => {
                if (
                  this.state.isLoggedIn ||
                  localStorage.getItem('isLoggedIn')
                ) {
                  return (
                    <HomepageModule
                      user={this.state.user}
                      logout={this.logout}
                    />
                  );
                } else {
                  return <LoginModule setUserdata={this.setUserdata} />;
                }
              }}
            />
            <Route
              path='/API/search*'
              render={() => <MovieList movieList={this.state.movieList} />}
            />
            <Route path='/showcredits/:credits?/' component={ShowCredits} />
            <Route path='*' component={ErrorComponent} />} />
          </Switch>
          {redirect}
          {isVulnerable}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
