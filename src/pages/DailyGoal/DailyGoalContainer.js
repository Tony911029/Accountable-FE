import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import "./DailyGoal.css"
import MainButton from "../../components/MainButton";
import {fetchQuestion, getCallTesting, getQuestion} from "services/questionService"
import {AppLayout} from "../../components/AppLayout/AppLayout";

function DailyGoalContainer() {
    // TODO: The attempt will be associated with the user's daily attempts, this is a temporary solution
    const [attempt, setAttempt] = useState(0)
    const [count, setCount] = useState(0)
    const [question, setQuestion] = useState("")

    const handleFetchingQuestion = () =>{
        setAttempt(attempt+1);
        getCallTesting().then((res)=>{
            console.log(res)
            return res
        }).catch(()=>{
            console.log("error when fetching question")
        })

        console.log(attempt)

        // fetchQuestion().then((res)=>{
        //     setQuestion(res.questionText)
        //     console.log(res.questionText)
        //     return res
        // }).catch(()=>{
        //     console.log("error when fetching question")
        // })
    }

    const record = () =>{

    }

    return (
        <AppLayout>
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
                        <div className="sub-container mb-5">
                            <MainButton
                                id="genQuestion"
                                btnLabel="Generate!"
                                onClick={handleFetchingQuestion}
                                disabled={attempt===3}
                            />
                            <div className="fs-25 pt-3">
                                <span >Attempts: </span>
                                <span>{attempt}</span>
                            </div>
                        </div>
                        <TextField
                            fullWidth
                            id="outlined-textarea"
                            label="Question"
                            placeholder="Click GENERATE to generate a question"
                            minRows={1}
                            multiline
                            InputProps={{
                                readOnly: true,
                            }}
                            value={question}
                        />
                    </div>

                    <div className="container">
                        <div className="sub-container mb-5">
                            <MainButton
                                id="recordQuestion"
                                btnLabel="Record"
                                onClick={record}
                            />
                            <div className="fs-25 pt-3">
                                <span >Word count: </span>
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
                            InputProps={{
                                readOnly: true,
                            }}
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

        </AppLayout>

    );
}

export default DailyGoalContainer;
