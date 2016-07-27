import React, { Component } from 'react'
import Moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Day extends Component {
  constructor (props) {
    super(props)
    this.state = { selected: ''}
  }

  selectDay (day) {
    const weather = this.props.weather.weather.list.filter(function (obj) {
      return obj.dt_txt.split(' ')[0] == day
    })
    this.props.onSelectWeather(weather)
    this.setState({selected: day})
  }

  isActive (value) {
    return ((value === this.state.selected) ? 'btn btn-primary-outline' : '')
  }

  render () {
    const days = this.props.data.map((day, key) => {
      return (

      <div className={`col-md-2 day ${this.isActive(day)}`} key={day}>
        <div className='text-md-center' onClick={this.selectDay.bind(this, day)}>
          {Moment(day).format('ddd')}
        </div>
      </div>
      )
    })
    return (
    <div>
      {days}
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    weather: state.weather
  }
}

export default connect(mapStateToProps, actions)(Day)
