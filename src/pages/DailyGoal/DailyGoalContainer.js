import React, {useState} from "react";
import {TextField} from "@mui/material";
import "./DailyGoal.css"
import MainButton from "../../components/MainButton";
import {getQuestion} from "services/questionService"

function DailyGoalContainer() {
    const [count, setCount] = useState(0)
    const fetchQuestion = () =>{
        getQuestion().then((res)=>{
            return res
        }).catch(()=>{
            console.log("error when fetching question")
        })
    }

    return (
        <div className='main'>
            <div>
                <h5>
                    Welcome to the Daily Assignment Zone! This page is designed to immerse you in an English-rich environment, fostering improvement in your language skills. Let's embark on this journey together!
                </h5>
                <div className="introduction container">
                    <ul>
                        <li>
                            The difficulty of the questions will be based on your current rank.
                        </li>
                        <li>
                            You have 3 attempts each day.
                        </li>
                        <li>
                            Each attempt's transcription will be recorded and you can choose the best one to submit.
                        </li>
                        <li>
                            Click the bottom below to generate a random question!
                        </li>
                    </ul>
                </div>

                <div className="container">
                    <MainButton
                        id="genQuestion"
                        btnLabel="Generate!"
                        onClick={fetchQuestion}
                    />
                    <TextField
                        fullWidth
                        id="outlined-textarea"
                        label="Question"
                        placeholder="Click GENERATE to generate a question"
                        minRows={1}
                        multiline
                    />
                </div>

                <div className="container">
                    <div className="sub-container mb-5">
                        <MainButton
                            id="recordQuestion"
                            btnLabel="Record"
                        />
                        <div className="fs-25 pt-3">
                            <span >word count: </span>
                            <span>{count}</span>
                        </div>
                    </div>
                    <TextField
                        fullWidth
                        id="outlined-textarea"
                        label="Your Answer"
                        placeholder="Your Answer"
                        minRows={2}
                        multiline
                    />
                </div>
                <div className="end container">
                    <MainButton
                        id="saveJsonBtn"
                        btnLabel="Submit"
                    />
                </div>
            </div>
        </div>
    );
}

export default DailyGoalContainer;
