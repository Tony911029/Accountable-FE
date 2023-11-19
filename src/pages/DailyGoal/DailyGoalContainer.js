import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import "./DailyGoal.css"
import MainButton from "../../components/MainButton";
import {fetchQuestion, getCallTesting, getQuestion} from "services/questionService"
import {AppLayout} from "../../components/AppLayout/AppLayout";
import Background from "../../assets/images/HomePageBackground.png";
import {FaBookReader, FaFacebookSquare, FaInstagram, FaTwitterSquare} from "react-icons/fa";
import {FaUsers} from "react-icons/fa6";
import {CgScreen} from "react-icons/cg";
import ContactUs from "../Home/components/ContactUs";
import Footer from "../../components/AppLayout/Footer";
import {makeStyles} from "tss-react/mui";

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
            <div className="assignment-container">
                <div className="assignment-section1">
                    <h1>Daily Assignment Zone </h1>
                    <div className="p1">
                        Let's practice English together!
                    </div>
                </div>

                <div className="assignment-section2">
                    <div className={"outer-padding"}>
                        <div className={"full-w align-left"}>
                            <h1>Question</h1>
                            <TextField
                                id="question-input"
                                label="Question"
                                type="text"
                                multiline
                                rows={2}
                                disabled
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="assignment-btn">
                        <MainButton btnLabel={"Generate"}/>
                        <div>*Click the bottom to generate a random question</div>
                    </div>
                </div>

                <div className="assignment-section2">
                    <div className={"outer-padding"}>
                        <div className={"full-w align-left"}>
                            <h1>Answer</h1>
                            <TextField
                                id="question-input"
                                label="Answer"
                                type="text"
                                multiline
                                rows={2}
                                fullWidth
                                disabled
                            />
                        </div>
                    </div>
                    <div  className="assignment-btn">
                        <MainButton btnLabel={"Record"}/>
                        <div>*Click the bottom to record your answer</div>
                    </div>
                </div>
                <div className="h-5rem">
                    <MainButton btnLabel={"Submit Answer"}/>
                </div>
                <hr />

                <div className="assignment-section3">
                    <ul>
                        <li>
                            You have 3 attempts each day.
                        </li>
                        <li>
                            The difficulty of the question will be based on your current rank.
                        </li>
                        <li>
                            Each attempt’s transcription will be recorded and you can choose the  best one to submit.
                        </li>
                    </ul>
                </div>
                <hr />




                <Footer/>
            </div>
        </AppLayout>

    );
}

export default DailyGoalContainer;
