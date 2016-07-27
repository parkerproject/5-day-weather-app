import React, { Component, PropTypes } from 'react'
import Day from './day'
import Chart from './chart'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Moment from 'moment'

class Card extends Component {
  static PropTypes = {
  data: PropTypes.array
}

  constructor (props) {
    super(props)
    this.state = {
      clouds: '',
      temp: '',
      precipitation: '',
      humidity: '',
      wind: '',
      date: '',
      icon: '',
      runOnce: false,
      days: ''
    }
    this.setSelected = this.setSelected.bind(this)
  }

  componentDidUpdate () {
    if (!this.state.runOnce) {
      let currentDay = Object.keys(this.props.data)[0]
      let currentDayArr = this.props.data[currentDay]
      this.setSelected(currentDayArr) // pre-select the first 3-hr
      this.setState({runOnce: true})
    }
  }

  setSelected (obj) {
    this.setState({
      clouds: obj[0].weather[0].description,
      temp: Math.floor(obj[0].main.temp),
      precipitation: obj[0].rain ? obj[0].rain[Object.keys(obj[0].rain)[0]] : 0,
      humidity: obj[0].main.humidity,
      wind: Math.ceil(obj[0].wind.speed),
      date: Moment(obj[0].dt_txt).format('ddd, MMMM Do YYYY'),
      icon: `http://openweathermap.org/img/w/${obj[0].weather[0].icon}.png`,
      days: obj
    })
  }

  render () {
    if (!this.state.days) {
      return <div>
               Select city above...
             </div>
    }

    let days
    days = this.state.days.map((day, key) => {
      let _time = day.dt_txt.split(' ')[1]
      _time = _time.split(':')[0]

      if (_time > 12) {
        _time -= 12
        _time = _time + ' PM'
      }else if (_time == '00') {
        _time = 12 + ' AM'
      }
      else if (_time == '12') {
        _time = 12 + ' PM'
      }else {
        _time = _time.replace(0, '')
        _time = _time + ' AM'
      }
      return (
      <div className='col-md-3 deck' key={key}>
        <small><strong>{_time}</strong></small>
        <br />
        <small className='clouds text-primary'>{day.weather[0].description}</small>
        <div>
          <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} />
          <small className='temp_small'>{day.main.temp ? Math.floor(day.main.temp) : '--'}</small> <sup>°F</sup>
        </div>
        <div>
          <small>Precipitation: {day.rain ? day.rain[Object.keys(day.rain)[0]] : 0} MM</small>
          <br />
          <small>Humidity: {day.main.humidity ? day.main.humidity + '%' : '--'}</small>
          <br />
          <small>Wind: {day.wind ? Math.ceil(day.wind.speed) + ' mph' : '--'}</small>
        </div>
      </div>
      )
    })

    return (
    <div className='card'>
      <div className='card-block'>
        <h4 className='card-title'>{this.props.city}</h4>
        <span>{this.state.date}</span>
        <br />
        <span className='clouds text-primary'>{this.state.clouds}</span>
        <div className='card-text'>
          <span><img src={this.state.icon} /> <span className='temp'>{this.state.temp ? this.state.temp : '--'}</span> <sup>°F</sup></span>
          <div className='pull-sm-right'>
            <span>Precipitation: {this.state.precipitation ? this.state.precipitation : 0} MM</span>
            <br />
            <span>Humidity: {this.state.humidity ? this.state.humidity + '%' : '--'}</span>
            <br />
            <span>Wind: {this.state.wind ? this.state.wind + ' mph' : '--'}</span>
          </div>
        </div>
        <div className='row'>
          <Day data={Object.keys(this.props.data)} onSelectWeather={this.setSelected} />
        </div>
        <div className='row'>
          <Chart data={this.state.days} />
        </div>
        <div className='row'>
          {days}
        </div>
      </div>
    </div>
    )
  }

}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps, actions)(Card)
