import axios from 'axios'
import { FETCH_WEATHER } from './types'

const API_KEY = '62f41b04973f7d03c57931de0821ea3d'
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?APPID=${API_KEY}&units=imperial&q=`

export function fetchWeather (cityName, countryCode) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}${cityName},${countryCode}`)
      .then(response => {
        dispatch({
          type: FETCH_WEATHER,
          payload: response.data
        })
      })
  }
}
