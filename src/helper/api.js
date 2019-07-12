import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL + '/v1'
const API_KEY = process.env.REACT_APP_X_API_KEY

const request = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
    'content-type': 'application/json'
  }
})

export default request
