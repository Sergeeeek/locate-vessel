import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Map from './Map';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updating: false,
      lastError: '',
      lastLocation: undefined,
      currentRetryTimeout: 0
    };

    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation() {
    this.setState({ lastError: '' });

    if (!this.props.ship) return;

    this.setState({ updating: true, currentRetryTimeout: 0 });
    Meteor.call(
      'vesselLocation.find',
      this.props.ship,
      (err, resp) => {
        if (err) {
          return this.setState({
            updating: false,
            lastError: err.reason,
            currentRetryTimeout: setTimeout(this.updateLocation, 2000),
            lastLocation: undefined
          });
        }

        this.setState({
          updating: false,
          lastError: '',
          lastLocation: {
            lat: parseFloat(resp.lat),
            lng: parseFloat(resp.lng)
          }
        });
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ship !== this.props.ship) {
      if (this.state.currentRetryTimeout) {
        clearTimeout(this.state.currentRetryTimeout);
      }
      this.updateLocation();
    }
  }

  render() {
    return <div>
      {!this.state.updating && this.state.lastError &&
        <div className="error-container">{this.state.lastError}</div>
      }
      <Map markerPos={this.state.lastLocation} />
    </div>
  }
}

export default MapContainer;
