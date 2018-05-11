import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Vessels } from '/imports/api/vessels/api';
import Search from './Search';

const SearchWithTracker = withTracker(({ value }) => ({
  suggestions: Vessels.find({
    Name: { $regex: value, $options: 'i' }
  }).fetch()
}))(Search);

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSelected = this.onSelected.bind(this);
  }

  onSearchChange(_, change) {
    this.setState({ value: change.newValue });
  }

  onSelected(event, { suggestion }) {
    if (this.props.onChange) {
      this.props.onChange(suggestion);
    }
  }

  render() {
    return <SearchWithTracker
      onSuggestFetch={() => undefined}
      onSuggestClear={() => undefined}
      onSelected={this.onSelected}
      onChange={this.onSearchChange}
      value={this.state.value}
    />;
  }
}

export default SearchContainer;
