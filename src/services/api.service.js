import axios from 'axios'

// axios.defaults.headers.common = { Authorization: `bearer` }
function createApiClient(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}
export default createApiClient
