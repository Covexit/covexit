import React from 'react'
import Script from 'react-load-script';

import './PlacesSuggest.scss';
import Fields from "../Fields/Fields";

let placesService;
let autoSuggestionService;

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
    this.attribution = React.createRef()
  }

  componentDidMount() {
    this.mounted = true;
    if (this.scriptReady) {
      this.handleScriptLoad();
    }
  }

  handleScriptLoad() {
    autoSuggestionService = new google.maps.places.AutocompleteService();
    placesService = new google.maps.places.PlacesService(this.attribution.current);
  }

  renderSuggestion(suggestion, index) {
    if (index < 5)
      return (
        <div onMouseEnter={() => this.setState({ selectedIndex: index })}
             onMouseLeave={() => this.setState({ selectedIndex: -1 })}
             onMouseDown={(e) => e.preventDefault()}
             onClick={() => this.emitSelection(suggestion, index)} key={suggestion.place_id}
             className={'PlacesSuggest-suggestion' + (index === this.state.selectedIndex ? ' PlacesSuggest-suggestion--selected' : '')}>
          {suggestion.description}
        </div>
      )
  }

  emitSelection(suggestion) {
    placesService.getDetails({
      fields: ['website', /* 'photos',*/ 'formatted_phone_number', 'address_components', 'geometry.location'],
      placeId: suggestion.place_id,
    }, (result, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
      }
      this.props.onSelected( {...suggestion, ...result });
    })
  }

  onChange = (event) => {
    const newValue = event.target.value;
    if (autoSuggestionService && newValue) {
      autoSuggestionService.getPlacePredictions({ input: newValue.toLowerCase().trim(), types: ['establishment'] }, (predictions, status) => {
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
        this.emitSelection(selected, this.state.selectedIndex);
        this.setState({ value: selected.description });
        this.wrapper.current.querySelector('.TextInput-field').blur();
      }
    }
  }


  render() {
    const shouldShowSuggestions = this.state.hasFocus && this.state.value;

    return (
      <div className="PlacesSuggest" ref={this.wrapper}>
        <Fields.TextInput type="text" value={this.state.value} placeholder="Your business name as on Google"
                onChange={this.onChange} onKeyDown={(e) => this.onKeyDown(e)}
                onFocus={() => this.setState({ hasFocus: true })}
                onBlur={() => this.setState({ hasFocus: false })}
                optional />
        <div className={'PlacesSuggest-wrapper ' + (shouldShowSuggestions ? 'PlacesSuggest-wrapper--active' : '')}>
          {shouldShowSuggestions ? this.state.suggestions.map(this.renderSuggestion.bind(this)) : ''}
        </div>
        <div ref={this.attribution} />
        <Script url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCHTt_h9Drz0TcymU_qmYQWI2zvnsQkkQc&libraries=places`}
                onLoad={() => {this.mounted ? this.handleScriptLoad() : this.scriptReady = true}}
        />
      </div>
    );
  }
}

export default PlacesSuggest
