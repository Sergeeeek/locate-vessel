import React, { Component } from 'react';
import Map from './Map/Map';
import SearchContainer from './Search/SearchContainer';

// App component - represents the whole app
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Map />
        <SearchContainer />
      </div>
    );
  }
}
