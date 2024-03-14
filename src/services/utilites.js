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
