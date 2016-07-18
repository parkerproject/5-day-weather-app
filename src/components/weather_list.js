import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Chart from './chart'

class WeatherList extends Component {
  static PropTypes = {
  weather: PropTypes.object,
 }

  constructor (props) {
    super(props)
  }

  renderWeather (cityData) {
    const name = cityData.city.name
    const temps = cityData.list.map(weather => weather.main.temp)
    const pressures = cityData.list.map(weather => weather.main.pressure)
    const humidities = cityData.list.map(weather => weather.main.humidity)

    return (
    <tr key={name}>
      <td>
        <Chart data={temps} color='orange' units='F' />
      </td>
      <td>
        <Chart data={pressures} color='green' units='HPA' />
      </td>
      <td>
        <Chart data={humidities} color='black' units='%' />
      </td>
    </tr>
    )
  }

  render () {
    let cityData = this.props.weather.city ? this.renderWeather(this.props.weather) : ''
    return (
    <div className='table-responsive'>
      <table className='table'>
        <thead>
          <tr>
            <th>
              Temperature (c)
            </th>
            <th>
              Pressure (hpa)
            </th>
            <th>
              Humidity (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {cityData}
        </tbody>
      </table>
      <small className='text'>Scroll to view temperatures</small>
    </div>
    )
  }
}


function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps, actions)(WeatherList)
