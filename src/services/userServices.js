import axios from 'axios';
import { SYSTEM_ERROR } from '../config/CONSTANTS';
import { API_URL } from './CONSTANTS';

/**
 * Function to create a new user upon sign up successfully
 * userPayload: {
 *     userId,
 *     email,
 *     username
 * }
 */
export const createNewUser = (userPayload) => new Promise((resolve, reject) => {
  try {
    const apiEndPoint = `${API_URL}/userService/user`;
    // do an SDK, DB call or API endpoint axios call here and return the promise.
    axios
      .post(apiEndPoint, userPayload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } catch (error) {
    reject(SYSTEM_ERROR);
  }
});

/**
 * Function to fetch the nativeUser using user detail returned from cognito
 * @param {Object} awsUser .
 */
export const getNativeUser = (awsUser) => new Promise((resolve, reject) => {
  const userId = awsUser.sub;
  const apiEndPoint = `${API_URL}/userService/user/${userId}`;
  try {
    axios
      .get(apiEndPoint)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject('Error in getUserDetails axios!', err);
      });
  } catch (error) {
    console.error('in userServices > getUserDetails, Err===', error);
    reject(SYSTEM_ERROR);
  }
});
