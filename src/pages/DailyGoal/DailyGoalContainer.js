import React, {useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import "./DailyGoal.css"
import MainButton from "../../components/MainButton";
import {fetchQuestion, getCallTesting, submitQuestion} from "src/services/questionService"
import {AppLayout} from "src/components/AppLayout/AppLayout";
import Footer from "../../components/AppLayout/Footer";
import {useAuth} from "src/navigation/Auth/ProvideAuth";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {Button} from "@material-ui/core";
import {FaCheckCircle} from "react-icons/fa";
import {sampleQuestions} from "src/pages/DailyGoal/QuestionsSample";


// TODO: might wanna try out Amazon service or some other solution for this
//  as they current solution only supports limited browser:
//  https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const microphone = new SpeechRecognition();
microphone.continuous = true;
microphone.interimResults = true;
microphone.lang = "en-US";
let timeLimit = 120; // maximum of 120 seconds
let timeoutId;
let maxAttempt = 3;

function DailyGoalContainer() {
    //  Note: index 0 is empty, so index 1 is first attempt/index
    //         (0th attempt/index is added upon mic initialization)
    const {user} = useAuth()
    const [attempt, setAttempt] = useState(-1)
    const [count, setCount] = useState(0)

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState([]);
    /**
        ans.answer = string;
        ans.count = int
     **/

    const [isRecording, setIsRecording] = useState(false);
    const [index, setIndex] = useState(-1);

    const [chosenAttempt, setChosenAttempt] = useState("")
    const [confirmOpen, setConfirmOpen] = useState(false)


    // todo: figure out cros stuff
    const handleFetchingQuestion = () =>{
        resetStats()
        const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
        setQuestion(sampleQuestions[randomIndex]);

        // getCallTesting().then((res)=>{
        //     console.log(res)
        //     setQuestion(res)
        //     return res
        // }).catch((err)=>{
        //     console.log(err)
        //     setQuestion(err)
        // })
        //
        // console.log(attempt)

        // fetchQuestion().then((res)=>{
        //     setQuestion(res.questionText)
        //     console.log(res.questionText)
        //     return res
        // }).catch(()=>{
        //     console.log("error when fetching question")
        // })
    }

    useEffect(() => {
        handleRecord();
        return () => {
            clearTimeout(timeoutId); // Cleanup timeout on component unmount
        };
    }, [isRecording]);

    const handleRecord = () => {
        if (isRecording) {
            microphone.start();
            microphone.onend = () => {
                microphone.start();
            };

            // Set a timeout to stop the recording after 2 mins
            timeoutId = setTimeout(() => {
                microphone.stop();
                storeAnsAttempt(answer);
            }, timeLimit*1000);


        } else {
            microphone.stop();
            microphone.onend = ()=>{}
            storeAnsAttempt(answer)
            if (timeoutId){clearTimeout(timeoutId);}
        }

        // For some reason, this needs to be here
        microphone.onstart = () => {}

        let recordingResult;
        microphone.onresult = (event) => {
                recordingResult = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");
            setAnswer(recordingResult);
            setCount(countWords(recordingResult))
            microphone.onerror = (event) => {
                console.log(event.error);
            };
        };
    };

    const storeAnsAttempt = (record) => {
        let ans = {}
        ans.answer = record;
        ans.count = countWords(record)
        setAnswers([...answers, ans]);
        setAnswer("")
        setCount(0)
        setIndex(index+1)
        setAttempt(attempt+1)
    };

    useEffect(() => {
        console.log(answers)
        console.log(index)
        if (answers.length>1){
            setChosenAttempt(answers[index]?.answer)
        }
    }, [index]);

    function countWords(str) {
        if (!str){
            return 0;
        }
        return str.split(' ')
            .filter(function(n) { return n !== '' })
            .length;
    }

    function handlePrePage() {
        setIndex(index-1)
    }

    function handleNextPage() {
        setIndex(index+1)
    }

    const handleConfirmAnswer = () => {
        // TODO: Uncomment this
        // submitQuestion(answers[index], user.userId)
        setConfirmOpen(true)
    }


    const handleSubmitAnswer = () => {
        // submitQuestion(answers[index], user.userId)
        setConfirmOpen(false)
        resetStats()
    }

    const resetStats = () =>{
        setQuestion("");
        setAnswers([]);
        setAnswer("");
        setAttempt(0);
        setCount(0);
        setIndex(0);
    }


    function handleClose() {
        resetStats();
        setConfirmOpen(false);
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
                                label="Question"
                                type="text"
                                multiline
                                rows={2}
                                value = {question}
                                disabled
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="assignment-btn">
                        <MainButton btnLabel={"Generate"} onClick={handleFetchingQuestion}/>
                        <div>*Click the bottom to generate a random question</div>
                    </div>
                </div>

                <div className="assignment-section2">
                    <div className={"outer-padding assignment-container"}>
                        <div className={"full-w align-left"}>
                            <h1>Answer</h1>
                            <TextField
                                label="Answer"
                                type="text"
                                multiline
                                minRows={2}
                                maxRows={10}
                                value = {answer}
                                fullWidth
                                disabled
                            />
                            <div className={"theme-text full-w flex spc-btwn"}>
                                <div>Word count: {count}</div>
                                <div>Attempts: {attempt}</div>
                            </div>
                        </div>
                    </div>
                    <div  className="assignment-btn">
                        <MainButton
                            btnLabel={isRecording? "Stop" : "Record"}
                            onClick={() => setIsRecording((prevState) => !prevState)}
                            disabled={attempt===maxAttempt || !question}
                        />
                        <div>*Click the bottom to record your answer</div>
                    </div>
                </div>

                <div className="assignment-section2">
                    <div className={"outer-padding assignment-container"}>
                        <h1 className={"flex full-w spc-btwn attempt-page"}>
                            <button
                                onClick={handlePrePage}
                                disabled={index<=1}
                            >
                                    <IoIosArrowBack />
                            </button>
                            <p>attempt {index}</p>
                            <button
                                onClick={handleNextPage}
                                disabled={index=== attempt}
                            >
                                    <IoIosArrowForward />
                            </button>
                        </h1>
                        <div className={"full-w align-left mt-5"}>
                            <TextField
                                type="text"
                                multiline
                                minRows={2}
                                maxRows={10}
                                value = {answers[index-1]?.answer || ""}
                                disabled
                                fullWidth
                            />
                            <div className={"theme-text full-w flex"}>
                                <div>Word count: {answers[index-1]?.count || ""}</div>
                            </div>
                        </div>
                    </div>
                    <div className="assignment-btn">
                        <div>*Click arrows to choose which attempts to submit</div>
                    </div>
                </div>
                <div className="h-5rem mt-5">
                    <MainButton
                        type={"submit"}
                        btnLabel={"Submit Answer"}
                        onClick={handleConfirmAnswer}
                        disabled={!question || attempt===0}
                    />
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
                {confirmOpen && (
                <Dialog
                    open={confirmOpen}
                    onClose={handleClose}
                >
                    <DialogContent>
                        <div className="login-container colored-border gap-1">
                            <FaCheckCircle size={"5rem"} className={"good"}/>
                            <h3 className={"ft-30"}>Answer Submitted Successfully</h3>
                            <span>Job well done!</span>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <MainButton btnLabel={"More Questions!"} onClick={handleSubmitAnswer}/>
                    </DialogActions>
                </Dialog>)}
                <Footer/>
            </div>
        </AppLayout>

    );
}

export default DailyGoalContainer;
