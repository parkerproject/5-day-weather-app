import React from 'react'
import Weather from '../components/weather_list'
import { connect } from 'react-redux'

const Display = (props) => {
  if (!props.weather) {
    return <div>
             Loading
           </div>
  }

  let cityName = props.weather.weather ? props.weather.weather.city.name : '...'
  let weatherList = props.weather.weather ? props.weather.weather : {}

  return (
  <div>
    <h5>5-day average weather forecast for <label> {cityName} </label></h5>
    <div className='container'>
      <div className='row'>
        <div className='column col-xs-12 col-sm-12 col-md-6'>
          <Weather weather={weatherList} />
        </div>
      </div>
    </div>
  </div>
  )
}

Display.propTypes = { // props validation needed
  weather: React.PropTypes.object
}

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps)(Display)
