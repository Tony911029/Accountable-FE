import axios from "axios";
import {API_URL} from "./CONSTANTS";


export const fetchQuestion = () =>
    axios.get(`${API_URL}/api/question`).then((response)=>response?.data?.data)


export const getCallTesting = () =>
    axios.get(`${API_URL}/api/question/testing`).then((response)=>response?.data?.data)