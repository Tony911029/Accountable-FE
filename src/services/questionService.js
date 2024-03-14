import axios from 'axios'
import { QUESTION_CONSTANT } from 'src/pages/Assignment/QuestionsSample'
import { API_URL } from './CONSTANTS'

/**
 * @param {number} questionNum - number of questions to fetch
 * @param {boolean} force - force to fetch new questions
 * @returns {Promise<Awaited<any>>}
 */
export const genRandQuestions = (questionNum, force = false) => {
  const cachedQuestions = JSON.parse(
    localStorage.getItem(QUESTION_CONSTANT.GEN_QUESTION)
  )
  if (cachedQuestions && !force) {
    return Promise.resolve(cachedQuestions)
  }

  axios.get(`${API_URL}/questionGen/${questionNum}`).then(response => {
    const genQuestions = response?.data?.data
    localStorage.setItem(
      QUESTION_CONSTANT.GEN_QUESTION,
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
