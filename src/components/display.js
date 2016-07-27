import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from './card'
import * as actions from '../actions'

class Display extends Component {
  constructor (props) {
    super(props)
  }

  renderWeather (cityData) {
    let daysObj = {}

    cityData.list.forEach(function (city) {
      let day = city.dt_txt.split(' ')[0]
      let dayObj = {}
      dayObj = dayObj[day] ? dayObj[day].push(city.dt_txt) : []
      daysObj[day] = dayObj
    })

    for (let i = 0, len = cityData.list.length; i < len; i++) {
      let day = cityData.list[i].dt_txt.split(' ')[0]
      daysObj[day].push(cityData.list[i])
    }

    return {data: daysObj, city: cityData.city.name}
  }

  render () {
    if (!this.props.weather) {
      return <div>
               Loading
             </div>
    }

    // let weatherList = this.props.weather.weather ? this.props.weather.weather : {}
    let cityData = this.props.weather.weather ? this.renderWeather(this.props.weather.weather) : ''

    return (
    <div>
      <h5>5-day average weather forecast</h5>
      <div className='container'>
        <div className='row'>
          <div className='column col-xs-12 col-sm-12 col-md-12'>
            <Card data={cityData.data} city={cityData.city} />
          </div>
        </div>
      </div>
    </div>
    )
  }

}

Display.propTypes = { // props validation needed
  weather: React.PropTypes.object
}

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps, actions)(Display)
