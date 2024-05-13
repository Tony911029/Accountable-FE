import { API_URL } from './CONSTANTS'
import { makeAxiosPostRequest } from 'src/services/utilites'

/**
 * @param {Organization} org - organization object
 * @param {Classroom} classroom - classroom object
 * @param {User} user - the user making the request
 * @returns {Promise<Awaited<any>>}
 */
export const sendJoinRequest = (org = {}, classroom = {}, user) => {
  if (org && user) {
    const payload = {}
    payload.userId = user.userId
    payload.orgId = org.id
    const apiEndPoint = `${API_URL}/request/org`
    return makeAxiosPostRequest(apiEndPoint, payload)
  }

  if (classroom && user) {
    // Do nothing
  }
}
