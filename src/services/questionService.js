import axios from 'axios'
import { QUESTION_CONSTANT } from 'src/pages/Assignment/QuestionsSample'
import { API_URL, ML_SERVICE_URL } from './CONSTANTS'

/**
 * @param {number} questionNum - number of questions to fetch
 * @param {string} topic - topic to generate
 * @param {boolean} force - force to fetch new questions
 * @returns {Promise<Awaited<any>>} - an array of questions
 */
export const genRandQuestions = (questionNum, topic, force = false) => {
  const cachedQuestions = JSON.parse(
    localStorage.getItem(QUESTION_CONSTANT.QUESTIONS)
  )
  if (cachedQuestions && !force) {
    return Promise.resolve(cachedQuestions)
  }

  return axios
    .get(`${ML_SERVICE_URL}/questions/generate_question`)
    .then(response => {
      const genQuestions = response?.data?.data?.questions
      localStorage.setItem(
        QUESTION_CONSTANT.QUESTIONS,
        JSON.stringify(genQuestions)
      )
      return genQuestions
    })
}

export const getCallTesting = () =>
  axios
    .get(`${API_URL}/api/question/testing`)
    .then(response => response?.data?.data)

export const submitQuestion = (answer, userId) =>
  axios
    .post(`${API_URL}/api/question/testing`)
    .then(response => response?.data?.data)
