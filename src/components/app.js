import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/types'
import SearchForm from './search_form'
import Display from './display'

class App extends Component {
  static PropTypes = {
  weather: PropTypes.object,
 }
  render () {
    return (
    <div className='wrapper'>
      <SearchForm />
      <Display weather={this.props.weather} />
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    weather: state.weather
  }
}

export default connect(mapStateToProps, actions)(App)
