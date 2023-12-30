import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import "./DailyGoal.css"
import MainButton from "../../components/MainButton";
import {fetchQuestion, getCallTesting, getQuestion, submitQuestion} from "services/questionService"
import {AppLayout} from "../../components/AppLayout/AppLayout";
import Footer from "../../components/AppLayout/Footer";
import {useAuth} from "../../navigation/Auth/ProvideAuth";


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

function DailyGoalContainer() {
    const {user} = useAuth()
    const [attempt, setAttempt] = useState(0)
    const [count, setCount] = useState(0)

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [answers, setAnswers] = useState([]);

    const [isRecording, setIsRecording] = useState(false);
    const [answerToSubmitIndex, setIndex] = useState(0);


    // todo: figure out cros stuff
    const handleFetchingQuestion = () =>{
        resetStats()
        setQuestion("This is a question... Click RECORD to record your answer")

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
            setAttempt(attempt+1);
            microphone.start();
            microphone.onend = () => {
                microphone.start();
            };

            // Set a timeout to stop the recording after 2 mins
            timeoutId = setTimeout(() => {
                microphone.stop();
                storeAnsAttempt();
            }, timeLimit*1000);


        } else {
            microphone.stop();
            microphone.onend = ()=>{}
            storeAnsAttempt()
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
    };

    function countWords(str) {
        if (!str){
            return 0;
        }
        return str.split(' ')
            .filter(function(n) { return n !== '' })
            .length;
    }

    const resetStats = () =>{
        setQuestion("");
        setAnswers("");
        setAttempt(0);
        setCount(0);
    }

    const handleSubmitAnswer = () => {
        // reset attempt -> store answer (axios) -> clear question/answer
        // TODO: store the chosen answer object to submit
        submitQuestion(user.userId)
        resetStats()
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
                                rows={2}
                                value = {answer}
                                fullWidth
                                disabled
                            />
                            <div className={"theme-text full-w flex attempt-counter"}>
                                <div>Word count: {count}</div>
                                <div>Attempts: {attempt}</div>
                            </div>
                        </div>
                    </div>
                    <div  className="assignment-btn">
                        <MainButton btnLabel={isRecording? "Stop" : "Record"} onClick={() => setIsRecording((prevState) => !prevState)}/>
                        <div>*Click the bottom to record your answer</div>
                    </div>
                </div>
                <div className="h-5rem">
                    <MainButton type={"submit"} btnLabel={"Submit Answer"} onClick={handleSubmitAnswer}/>
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
