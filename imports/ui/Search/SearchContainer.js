import React, { Component } from 'react';
import Search from './Search';

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSelected = this.onSelected.bind(this);
  }

  onSearchChange(event, change) {
    this.setState({ value: change.newValue });
  }

  onSelected(event, { suggestion }) {
    console.log(suggestion);
    if (this.props.onChange) {
      this.props.onChange(suggestion);
    }
  }

  render() {
    return <Search
      onSuggestFetch={() => undefined}
      onSuggestClear={() => undefined}
      onSelected={this.onSelected}
      onChange={this.onSearchChange}
      value={this.state.value}
      suggestions={[{ name: 'hello', value: '123' }, { name: 'hello2', value: '2312' }]}
    />
  }
}

export default SearchContainer;
