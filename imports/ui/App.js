import React, { Component } from 'react';
import MapContainer from './Map/MapContainer';
import SearchContainer from './Search/SearchContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedShip: null
    };

    this.onShipChange = this.onShipChange.bind(this);
  }

  onShipChange(ship) {
    this.setState({ selectedShip: ship });
  }

  render() {
    return <div className="container">
      <MapContainer ship={this.state.selectedShip && this.state.selectedShip.MMSI} />
      <SearchContainer onChange={this.onShipChange} />
    </div>;
  }
}
