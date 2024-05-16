import { API_URL } from 'src/services/CONSTANTS'
import { makeAxiosRequest } from 'src/services/utilites'

/**
 * Function to fetch all classrooms for a teacher
 */
export const getClassroomsByUserId = userId => {
  const apiEndPoint = `${API_URL}/classroom/user/${userId}`
  return makeAxiosRequest(apiEndPoint)
}

/**
 * Function to fetch all classrooms for a teacher
 */
export const getClassroomById = classroomId => {
  const apiEndPoint = `${API_URL}/classroom/${classroomId}`
  return makeAxiosRequest(apiEndPoint)
}
