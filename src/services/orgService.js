import { BACKEND_URL } from './CONSTANTS'
import { makeAxiosRequest } from 'src/services/utilites'

/**
 * @param {string} code - code of the org, can be duplicated
 * @returns {Promise<Awaited<any>>}
 */
export const findOrgByCode = code => {
  const apiEndPoint = `${BACKEND_URL}/org/code/${code}`
  return makeAxiosRequest(apiEndPoint)
}
