import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

const Suggestion = (suggestion, { query, isHighlighted }) => {
  const name = suggestion.Name;
  const highlightTextIdx = name.toLowerCase().indexOf(query.toLowerCase());
  const suggestionClass = `search__suggestion ${isHighlighted ? 'search__suggestion--selected' : ''}`;

  if (highlightTextIdx !== -1) {
    const beforeHighlight = name.slice(0, highlightTextIdx);
    const highlighted = name.slice(highlightTextIdx, highlightTextIdx + query.length);
    const afterHighlight = name.slice(highlightTextIdx + query.length, name.length);

    return <div className={suggestionClass}>
      {beforeHighlight}
      <span className="search__suggestion-highlight">{highlighted}</span>
      {afterHighlight}
    </div>;
  } else {
    return <div className={suggestionClass}>
      {name}
    </div>;
  }
};

const getSuggestionValue = (suggestion) => suggestion.Name;

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(_, change) {
    this.setState({ value: change.newValue });
  }

  render() {
    const {
      onSuggestFetch,
      onSuggestClear,
      onSelected,
      suggestions
    } = this.props;

    return <Autosuggest
      onSuggestionsFetchRequested={onSuggestFetch}
      onSuggestionsClearRequested={onSuggestClear}
      onSuggestionSelected={onSelected}
      suggestions={suggestions || []}
      renderSuggestion={Suggestion}
      getSuggestionValue={getSuggestionValue}
      inputProps={{
        value: this.state.value,
        onChange: this.onChange
      }}
      theme={{
        container: 'search',
        input: 'search__input',
        suggestionsContainer: 'search__suggestion-container',
        suggestionsList: 'search__sueggestion-list'
      }}
    />;
  }
}

export default SearchInput;
