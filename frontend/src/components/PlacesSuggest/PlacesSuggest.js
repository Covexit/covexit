import React from 'react'
import Script from 'react-load-script';

import './PlacesSuggest.scss';
import TextInput from "../TextInput/TextInput";

let placesService;

/* global google */
class PlacesSuggest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      hasFocus: false,
      suggestions: [],
      selectedIndex: -1,
    };

    this.wrapper = React.createRef()
  }

  handleScriptLoad() {
    placesService = new google.maps.places.AutocompleteService();
  }

  renderSuggestion(suggestion, index) {
    if (index < 5)
      return (
        <div onMouseEnter={() => this.setState({ selectedIndex: index })}
             onMouseLeave={() => this.setState({ selectedIndex: -1 })}
             onClick={() => this.props.onSelected(suggestion, index)} key={suggestion.place_id}
             className={'PlacesSuggest-suggestion' + (index === this.state.selectedIndex ? ' PlacesSuggest-suggestion--selected' : '')}>
          {suggestion.description}
        </div>
      )
  }

  onChange = (event) => {
    const newValue = event.target.value;
    if (placesService && newValue) {
      placesService.getPlacePredictions({ input: newValue.toLowerCase().trim(), types: ['establishment'] }, (predictions, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          console.error(status);
          return;
        }

        this.setState({
          suggestions: predictions,
        });
      });
    }

    this.setState({
      value: newValue,
    });
  };

  onKeyDown(e) {
    if (this.state.hasFocus) {
      if (e.keyCode === 38 &&  this.state.selectedIndex > -1) {
        this.setState({ selectedIndex: this.state.selectedIndex - 1 });
      }
      if (e.keyCode === 40 && this.state.selectedIndex < 4) {
        this.setState({ selectedIndex: this.state.selectedIndex + 1 });
      }
      if (e.keyCode === 13 && this.state.selectedIndex < 4 && this.state.selectedIndex > -1) {
        const selected = this.state.suggestions[this.state.selectedIndex];
        this.props.onSelected(selected, this.state.selectedIndex);
        this.setState({ value: selected.description });
        this.wrapper.current.querySelector('.TextInput-field').blur();
      }
    }
  }


  render() {
    const shouldShowSuggestions = this.state.hasFocus && this.state.value;

    return (
      <div className="PlacesSuggest" ref={this.wrapper}>
        <TextInput type="text" value={this.state.value} placeholder="Your business name as on Google"
                   onChange={this.onChange} onKeyDown={(e) => this.onKeyDown(e)}
                   onFocus={() => this.setState({ hasFocus: true })}
                   onBlur={() => this.setState({ hasFocus: false })} />
        <div className={'PlacesSuggest-wrapper ' + (shouldShowSuggestions ? 'PlacesSuggest-wrapper--active' : '')}>
          {shouldShowSuggestions ? this.state.suggestions.map(this.renderSuggestion.bind(this)) : ''}
        </div>
        <Script url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCHTt_h9Drz0TcymU_qmYQWI2zvnsQkkQc&libraries=places`}
                onLoad={this.handleScriptLoad}
        />
      </div>
    );
  }
}

export default PlacesSuggest
