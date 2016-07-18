import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class SearchForm extends Component {
  static PropTypes = {
  fetchWeather: PropTypes.func,
 }

  componentDidMount () {
    const places = require('places.js')
    let placesAutocomplete = places({
      container: this.refs.myCity
    })
    placesAutocomplete.on('change', e => {
      this.props.fetchWeather(e.suggestion.name, e.suggestion.countryCode)
    })
  }

  render () {
    return (
    <input type='city' ref='myCity' placeholder='Enter your city...' />
    )
  }

}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps, actions)(SearchForm)
