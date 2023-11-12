import axios from "axios";
import {API_URL} from "./CONSTANTS";


export const getQuestion = () =>
    axios.get('${API_URL} /question/').then((response)=>response?.data?.data)