import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './DailyGoal.css'
import { genRandQuestions } from 'src/services/questionService'
import { AppLayout } from 'src/components/AppLayout/AppLayout'
import AssignmentContentCard from 'src/components/Cards/AssignmentContentCard'
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight
} from 'react-icons/md'
import MainButton from 'src/components/MainButton'
import AssignmentDone from 'src/pages/Assignment/AssignmentDone'
import ProgressBar from '@ramonak/react-progress-bar'
import Footer from '../../components/AppLayout/Footer'
import { findWebSocketUrl } from 'src/services/CONSTANTS'

const MAX_QUESTION_NUM = 10

/**
 * Filters questions that are active.
 * @param {Question[]} questions - The array of questions.
 * @returns {Question[]} An array of active questions.
 */

/**
 * Defines the structure of a question.
 * @typedef {Object} Question
 * @property {UUID} id - The text of the question.
 * @property {string} questionText - The text of the question.
 * @property {boolean} isActive - Indicates whether the question is currently active.
 */

/**
 * Defines the structure of an answer.
 * @typedef {Object} Answer
 * @property {string} answer - The text of the answer.
 * @property {string} count - Word counted.
 * @property {boolean} isActive - Indicates whether the question is currently active.
 */

function ArrowLabel({
  IconComponent,
  label,
  onClick,
  iconSize,
  disabled = false
}) {
  return (
    <div
      style={{ cursor: 'pointer', color: disabled ? '#E1E1E1' : '#563400' }}
      onClick={onClick}
    >
      <IconComponent style={{ fontSize: iconSize }} />
      <div style={{ marginLeft: '10px' }}>{label}</div>
    </div>
  )
}

function DailySpeakingPageNLP() {
  const [counts, setCounts] = useState(new Array(MAX_QUESTION_NUM).fill(0))
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState(new Array(MAX_QUESTION_NUM).fill(''))

  const [isRecording, setIsRecording] = useState(false)
  const [index, setIndex] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const webSocketRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const mediaStreamRef = useRef(null)

  const queAnswerNum = useMemo(
    () => answers?.filter(answer => answer !== '').length
  )
  const isLastPage = useMemo(() => index === MAX_QUESTION_NUM - 1, [index])

  const fetchData = useCallback(async () => {
    let genQuestions = await genRandQuestions(MAX_QUESTION_NUM, 'random')
    if (!genQuestions) {
      genQuestions = new Array(MAX_QUESTION_NUM).fill('')
    }
    setQuestions(genQuestions)
  }, [])

  useEffect(() => {
    // resetStats();
    fetchData()
  }, [fetchData])

  /**
   * TODO: Things to consider:
   *  1. Silent detection
   *  2. Used audioWorklet, AudioContext, MediaStreamSource for more granular audio stream control?
   * **/
  useEffect(() => {
    const startStreaming = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      })
      mediaRecorderRef.current = mediaRecorder
      mediaStreamRef.current = stream
      webSocketRef.current = new WebSocket(
        `${findWebSocketUrl()}/speech_to_text/ws`
      )

      webSocketRef.current.onopen = () => {
        mediaRecorder.start(250) // Send data every 250ms
      }

      mediaRecorder.ondataavailable = event => {
        if (webSocketRef.current.readyState === WebSocket.OPEN) {
          webSocketRef.current.send(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        if (webSocketRef.current.readyState === WebSocket.OPEN) {
          webSocketRef.current.close()
        }
        stream.getTracks().forEach(track => track.stop())
        setIsRecording(false)
      }

      webSocketRef.current.onclose = () => {}

      webSocketRef.current.onerror = error => {
        webSocketRef.current.close()
      }

      webSocketRef.current.onmessage = event => {
        const data = JSON.parse(event.data)
        if (data) {
          console.log('data', data)
          setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers]
            newAnswers[index] = data.message
            return newAnswers
          })
        }

        // turn off mic after 30 seconds
        setTimeout(() => {
          if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop()
            mediaStreamRef.current.getTracks().forEach(track => track.stop())
          }
        }, 30000)
      }
    }

    if (isRecording) {
      startStreaming()
    }

    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop()
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop())
      }
      if (webSocketRef.current) {
        webSocketRef.current.close()
      }
    }
  }, [isRecording])

  return (
    <AppLayout showSubHeader subHeaderLabel='EXIT' isPracticing>
      {!isSubmitted ? (
        <div>
          <div className='assignment-wrapper'>
            <ArrowLabel
              IconComponent={MdKeyboardDoubleArrowLeft}
              label='Go to Previous Question'
              // onClick={handlePreviousQuestion}
              iconSize='5rem'
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1)
                }
              }}
              disabled={index === 0}
            />

            <div className='assignment-container'>
              <div className='view-50'>
                <div className='progress-bar-container'>
                  <div className='align-right'>{`Question answered: ${queAnswerNum}`}</div>
                  <ProgressBar
                    completed={(queAnswerNum / MAX_QUESTION_NUM) * 100}
                    bgColor='#FFC163'
                    baseBgColor='#FFF2DD'
                    height='2rem'
                  />
                </div>

                <AssignmentContentCard
                  title={`Question ${Number(index) + 1}`}
                  className='content'
                >
                  <div>{questions[index]}</div>
                </AssignmentContentCard>

                <AssignmentContentCard
                  wordCount
                  count={counts[index]}
                  title='Your answer'
                  button
                  buttonText={isRecording ? 'Stop' : 'Recording'}
                  onClick={() => setIsRecording(prevState => !prevState)}
                  className='content answer-card'
                >
                  <div>{answers[index]}</div>
                </AssignmentContentCard>
              </div>
            </div>
            <ArrowLabel
              IconComponent={MdKeyboardDoubleArrowRight}
              label='Go to Next Question'
              onClick={() => {
                if (index < MAX_QUESTION_NUM - 1) {
                  setIndex(index + 1)
                }
              }}
              iconSize='5rem'
              disabled={isLastPage}
            />
          </div>
          <div className='assignment-submit flex'>
            {isLastPage && (
              <MainButton
                btnLabel='Submit'
                // onClick={()=>{}}
                className='font-1.2rem'
              />
            )}
          </div>
        </div>
      ) : (
        <AssignmentDone wordCount={0} />
      )}

      <Footer />
    </AppLayout>
  )
}

export default DailySpeakingPageNLP
