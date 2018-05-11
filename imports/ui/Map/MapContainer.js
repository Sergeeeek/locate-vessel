import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Map from './Map';

const MAX_RETRIES = 5;

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updating: false,
      lastError: '',
      lastLocation: undefined,
      currentRetryTimeout: 0,
      numberOfRetries: 0
    };

    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation() {
    if (!this.props.ship || this.state.numberOfRetries > MAX_RETRIES) return;

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
            lastLocation: undefined,
            numberOfRetries: this.state.numberOfRetries + 1
          });
        }

        this.setState({
          updating: false,
          lastError: '',
          lastLocation: {
            lat: parseFloat(resp.lat),
            lng: parseFloat(resp.lng)
          },
          numberOfRetries: 0,
        });
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.ship !== this.props.ship) {
      if (this.state.currentRetryTimeout) {
        clearTimeout(this.state.currentRetryTimeout);
      }
      this.setState({ numberOfRetries: 0 }, () => this.updateLocation());
    }
  }

  render() {
    return <div>
      {!this.state.updating && this.state.lastError &&
        <div className="error-container">{this.state.lastError}</div>
      }
      <Map markerPos={this.state.lastLocation} />
    </div>;
  }
}

export default MapContainer;
