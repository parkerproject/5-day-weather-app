import React from 'react'
import round from 'lodash/round'
import sum from 'lodash/sum'
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines'

function average (data) {
  return round(sum(data) / data.length)
}

export default (props) => {
  return (
  <div>
    <Sparklines height={120} width={180} data={props.data}>
      <SparklinesLine color={props.color} />
      <SparklinesReferenceLine type='avg' />
    </Sparklines>
    <div>
      {average(props.data)}
      {props.units}
    </div>
  </div>
  )
}
