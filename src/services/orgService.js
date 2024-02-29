import axios from 'axios';
import { QUESTION_CONSTANT } from 'src/pages/Assignment/QuestionsSample';
import { API_URL } from './CONSTANTS';

/**
 * @param {string} code - school code
 * @param {boolean} force - force to fetch new questions
 * @returns {Promise<Awaited<any>>}
 */
export const findOrgByCode = (code) => {
  // axios.get(`${API_URL}/questionService/questionGen/${questionNum}`)
  //   .then((response) => {
  //     const genQuestions = response?.data?.data;
  //     localStorage.setItem(QUESTION_CONSTANT.GEN_QUESTION, JSON.stringify(genQuestions));
  //     return genQuestions;
  //   });

  const fakeSchool = {};
  fakeSchool.orgId = '123jlad5e84aeee4eaoas';
  fakeSchool.schoolName = 'Tony\'s Grind School ';
  fakeSchool.adminUser = 'jidahlfdali5u46a4';
  fakeSchool.contactEmail = 'adminEmail@testing.com';
  fakeSchool.contactName = 'TonyTheTester';
  fakeSchool.contactPhoneNumber = '123-456-789';

  return fakeSchool;
};
