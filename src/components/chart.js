import React, { Component, PropTypes } from 'react'

class ChartView extends Component {
  static PropTypes = {
  data: PropTypes.array
}
  constructor (props) {
    super(props)
  }

  render () {
    if (!this.props.data) {
      return <div>
               Loading chart...
             </div>
    }
    const LineChart = require('react-chartjs').Line
    let temp = this.props.data.map(weather => {
      return Math.floor(weather.main.temp)
    })

    let labels = this.props.data.map((day, key) => {

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

      return _time
    })

    let chartData = {
      labels: labels,
      datasets: [
        {
          label: '3-hour weather forecast',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          data: temp
        }
      ]
    }

    const chartOptions = {
      responsive: false
    }

    console.log(labels, temp)

    return (
    <div className='col-md-12 chart'>
      <LineChart
        data={chartData}
        options={chartOptions}
        width='600'
        height='250' redraw />
    </div>
    )
  }

}

export default ChartView
