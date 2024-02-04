import React, {useEffect, useMemo, useState} from "react";
import "./DailyGoal.css"
import {fetchQuestion, getCallTesting, submitQuestion} from "src/services/questionService"
import {AppLayout} from "src/components/AppLayout/AppLayout";
import Footer from "../../components/AppLayout/Footer";
import {useAuth} from "src/navigation/Auth/ProvideAuth";
import {sampleQuestions} from "src/pages/Assignment/QuestionsSample";
import AssignmentContentCard from "src/components/Cards/AssignmentContentCard";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import {countWords, shuffle} from "src/pages/Assignment/utils";
import MainButton from "src/components/MainButton";
import AssignmentDone from "src/pages/Assignment/AssignmentDone";
import ProgressBar from "@ramonak/react-progress-bar";


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
const MAX_QUESTION_NUM = 10;

function DailySpeakingPage() {
    //  Note: index 0 is empty, so index 1 is first attempt/index
    //         (0th attempt/index is added upon mic initialization)
    const {user} = useAuth()
    const [counts, setCounts] = useState(new Array(MAX_QUESTION_NUM).fill(0))
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState(new Array(MAX_QUESTION_NUM).fill(""));
    const [curAns, setCurAns] = useState("")

    const [isRecording, setIsRecording] = useState(false);
    const [index, setIndex] = useState(-1);
    const [isSubmitted, setIsSubmitted] = useState(false)

    const queAnswerNum = useMemo(()=>answers.filter(answer => answer !== "").length)
    const isLastPage = useMemo(() => index === MAX_QUESTION_NUM-1, [index, MAX_QUESTION_NUM]);
    const sum = useMemo(()=>counts.reduce((accumulator, currentValue) => accumulator + currentValue, 0));


    const resetStats = () =>{
        setQuestions([]);
        setAnswers([]);
        setIndex(0);
    }

    useEffect(() => {
        resetStats()
        setQuestions(shuffle(sampleQuestions).slice(0, 10))
    }, []);

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
                storeAnsAttempt(curAns);
            }, timeLimit*1000);

        } else {
            microphone.stop();
            microphone.onend = ()=>{}
            storeAnsAttempt(curAns)
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
            const wordCount = countWords(recordingResult)
            const updatedList = counts.map((item, idx) => idx === index ? wordCount : item);
            setCounts(updatedList)
            setCurAns(recordingResult)
            microphone.onerror = (event) => {
                console.log(event.error);
            };
        };
    };

    const storeAnsAttempt = (record) => {
        if (record){
            setCurAns("")
            answers[index] = record;
            setAnswers(answers)

            counts[index] = countWords(record)
            setCounts(counts)

            if(!isLastPage)setIndex(index+1)
        }
    };

    function handlePreQue() {
        if (index>0) setIndex(index-1)
    }

    function handleNextQue() {
        if (index<MAX_QUESTION_NUM-1) setIndex(index+1)
    }


    const ArrowLabel = ({ IconComponent, label, onClick, iconSize, disabled=false }) => {
        return (
            <div style={{cursor: 'pointer', color: disabled?"#E1E1E1":"#563400"}} onClick={onClick}>
                <IconComponent style={{ fontSize: iconSize }}/>
                <div style={{ marginLeft: '10px' }}>{label}</div>
            </div>
        );
    };

    return (
        <AppLayout>
            {!isSubmitted ?
                (<div className={"submit-container"}>
                    <div className={"assignment-wrapper"}>
                        <ArrowLabel
                            IconComponent={MdKeyboardDoubleArrowLeft}
                            label="Go to Previous Question"
                            // onClick={handlePreviousQuestion}
                            iconSize="5rem"
                            onClick={handlePreQue}
                            disabled={index===0}
                        />

                        <div className="assignment-container">
                            <div className={"view-50"}>
                                <div className={"mb-30"}>
                                    <div className={"align-right"}>{`Question answered: ${queAnswerNum}`}</div>
                                    <ProgressBar
                                        completed={queAnswerNum/MAX_QUESTION_NUM * 100}
                                        bgColor={"#FFC163"}
                                        baseBgColor={"#FFF2DD"}
                                        height={"2rem"}
                                    />
                                </div>

                                <AssignmentContentCard
                                    title={`Question ${index+1}`}
                                    className={"content"}
                                >
                                    <div>{questions[index]}</div>
                                </AssignmentContentCard>
                                <AssignmentContentCard
                                    wordCount={true}
                                    count={counts[index]}
                                    title={"Your answer"}
                                    button={true}
                                    buttonText={isRecording? "Stop": "Recording"}
                                    onClick={() => setIsRecording((prevState) => !prevState)}
                                    className={"content answer-card"}
                                >
                                    <div>
                                        {isRecording? curAns: answers[index]}
                                    </div>
                                </AssignmentContentCard>
                            </div>
                        </div>
                        <ArrowLabel
                            IconComponent={MdKeyboardDoubleArrowRight}
                            label="Go to Next Question"
                            onClick={handleNextQue}
                            iconSize="5rem"
                            disabled={isLastPage}
                        />
                    </div>
                    {isLastPage && <MainButton btnLabel={"Submit"} className={"submit-button"} onClick={()=>setIsSubmitted(true)}/>}
                </div>):(
                    <AssignmentDone wordCount={sum}/>
                )}

            <Footer/>
        </AppLayout>

    );
}

export default DailySpeakingPage;
