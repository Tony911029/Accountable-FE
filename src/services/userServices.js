import axios from 'axios'
import { SYSTEM_ERROR } from '../config/CONSTANTS'
import { API_URL, BACKEND_URL } from './CONSTANTS'
import { makeAxiosRequest } from './utilites'

/**
 * Function to create a new user upon sign up successfully
 */
export const createNewUser = userPayload =>
  new Promise((resolve, reject) => {
    try {
      const apiEndPoint = `${BACKEND_URL}/userService/user`
      axios
        .post(apiEndPoint, userPayload)
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject(err)
        })
    } catch (error) {
      reject(SYSTEM_ERROR)
    }
  })

/**
 * Function to fetch the nativeUser using user detail returned from cognito
 * @param {Object} awsUser .
 */
export const getNativeUser = awsUser =>
  new Promise((resolve, reject) => {
    const userId = awsUser.sub
    const apiEndPoint = `${BACKEND_URL}/userService/user/${userId}`
    try {
      axios
        .get(apiEndPoint)
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => {
          reject('Error in getNativeUser axios!', err)
        })
    } catch (error) {
      console.error('in userServices > getUserDetails, Err===', error)
      reject(SYSTEM_ERROR)
    }
  })

/**
 * Function to fetch all classroom info
 * @param {string} role .
 * @param {string} id .
 */
export const getPendingUsersByRoleAndClassroomId = (role, id) => {
  const apiEndPoint = `${BACKEND_URL}/userService/role/${role}/classroom/${id}`
  return makeAxiosRequest(apiEndPoint)
}

/**
 * Function to fetch all users within an organization.
 * Note that this posts to org controllers not users controller
 */
export const getUsersForAdmin = () => {
  const apiEndPoint = `${API_URL}/admin/users`
  return makeAxiosRequest(apiEndPoint)
}

/**
userPayload: {
  userId,createNewUser
      email,
      username
}
 ** */

/**
 * User response example:{
 *  "id": "cc4d35f8-f0e1-709c-27ff-1965c0e60a8f",
 *  "displayName": null,
 *  "username": "TonyTesting1",
 *  "email": "tony3529353@gmail.com",
 *  "country": null,
 *  "role": null,
 *  "schoolId": null,
 *  "classroomId": null,
 *  "isActive": true,
 *  "authorities": []
 * }
 * * */
