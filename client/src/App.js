import React from 'react';
import './App.css';
import LoginModule from './Components/Login/LoginModule';
import Navbar from './Components/Header/Navbar';
import HomepageModule from './Components/Homepage/HomepageModule';
import ErrorComponent from './Components/ErrorComponent/ErrorComponent';
import MovieList from './Components/MovieList/MovieList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ShowCredits from './Components/Homepage/ShowCredits';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: false,
      search: '',
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

  render() {
    return (
      <div className='App'>
        <Navbar
          searchTerm={this.state.search}
          handleComponentChange={this.handleComponentChange}
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
            <Route path='/API/search/*' component={MovieList} />
            {/*<Route path='*' component={ErrorComponent} />} /> */}
            <Route path="/showcredits/:name?" component={ShowCredits} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
