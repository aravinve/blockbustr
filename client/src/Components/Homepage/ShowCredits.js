import React, { Component } from 'react';
class ShowCredits extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
    };
  }

  //parse the query parameter
  parseQueryString = (string) => {
    return string
      .slice(1)
      .split('&')
      .map((queryParam) => {
        let kvp = queryParam.split('=');
        return { key: kvp[0], value: kvp[1] };
      })
      .reduce((query, kvp) => {
        query[kvp.key] = kvp.value;
        return query;
      }, {});
  };

  render() {
    const nameParam = this.parseQueryString(
      this.props.location.search
    ).name.toUpperCase();
    const creditParam = this.parseQueryString(this.props.location.search)
      .credits;

    return (
      <div>
        <h3>
          Hi <b>{nameParam}</b>
        </h3>
        <h4>
          {' '}
          Thank you for recommending us to your friend .Here is your{' '}
          {creditParam} Free Movie Credits !!!
        </h4>
        <img
          src={require('./credit.jpeg')}
          className='img-fluid container'
          alt='credits'
        />
      </div>
    );
  }
}

export default ShowCredits;
