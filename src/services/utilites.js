import axios from 'axios'

/**
 * A generic function to make axios requests.
 * @param {string} url - The URL to request.
 * @returns {Promise<any>} - A promise that resolves with the response data.
 */
export const makeAxiosRequest = url => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then(response => resolve(response.data.data))
      .catch(error => {
        console.error('Error in makeAxiosRequest:', error)
        reject('Error making axios request!', error)
      })
  })
}

/**
 * A generic function to make axios POST requests.
 * @param {string} url - The URL to request.
 * @param {Object} payload - The payload to send with the request.
 * @returns {Promise<any>} - A promise that resolves with the response data.
 */
export const makeAxiosPostRequest = (url, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, payload)
      .then(response => resolve(response.data))
      .catch(error => {
        console.error('Error in makeAxiosPostRequest:', error)
        reject(error) // Reject with the error object for better error handling.
      })
  })
}
