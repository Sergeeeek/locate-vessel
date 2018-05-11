import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Vessels } from '/imports/api/vessels/api';
import Search from './Search';

const SearchWithTracker = withTracker(({ query }) => ({
  suggestions: Vessels.find({
    Name: { $regex: query, $options: 'i' }
  }).fetch()
}))(Search);

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchClear = this.onSearchClear.bind(this);
    this.onSelected = this.onSelected.bind(this);
  }

  onSearchChange({ value }) {
    this.setState({ query: value });
  }

  onSearchClear() {
    this.setState({ query: '' });
  }

  onSelected(event, { suggestion }) {
    if (this.props.onChange) {
      this.props.onChange(suggestion);
    }
  }

  render() {
    return <SearchWithTracker
      onSuggestFetch={this.onSearchChange}
      onSuggestClear={this.onSearchClear}
      onSelected={this.onSelected}
      query={this.state.query}
    />;
  }
}

export default SearchContainer;
