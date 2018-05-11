import React, { PureComponent } from 'react';
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

const SearchInput = (props) => {
  const {
    onSuggestFetch,
    onSuggestClear,
    onSelected,
    suggestions,
    ...input
  } = props;
  return <Autosuggest
    onSuggestionsFetchRequested={onSuggestFetch}
    onSuggestionsClearRequested={onSuggestClear}
    onSuggestionSelected={onSelected}
    suggestions={suggestions || []}
    inputProps={input}
    renderSuggestion={Suggestion}
    getSuggestionValue={getSuggestionValue}
    theme={{
      container: 'search',
      input: 'search__input',
      suggestionsContainer: 'search__suggestion-container',
      suggestionsList: 'search__sueggestion-list'
    }}
  />;
};

export default SearchInput;
