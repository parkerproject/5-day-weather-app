import React from 'react'
import Weather from '../components/weather_list'
import { connect } from 'react-redux'

const Display = (props) => {
  if (!props.weather) {
    return <div class="loading"></div>
  }

  let cityName = props.weather.weather ? props.weather.weather.city.name : '...'
  let weatherList = props.weather.weather ? props.weather.weather : {}

  return (
  <div>
    <h4>5-day average weather forecast for<small className='label'>{cityName}</small></h4>
    <div className='container'>
      <div className='columns'>
        <div className='column col-xs-12 col-sm-12 col-md-6'>
          <Weather weather={weatherList} />
        </div>
      </div>
    </div>
  </div>
  )
}

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps)(Display)
