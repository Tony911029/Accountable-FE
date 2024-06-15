import { useCallback, useEffect, useMemo, useRef } from 'react'
import useState from 'react-usestateref'
import './DailyGoal.css'
import { genRandQuestions } from 'src/services/questionService'
import { AppLayout } from 'src/components/AppLayout/AppLayout'
import { QUESTION_CONSTANT } from 'src/pages/Assignment/QuestionsSample'
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

  const queAnswerNum = useMemo(
    () => answers?.filter(answer => answer !== '').length
  )
  const isLastPage = useMemo(() => index === MAX_QUESTION_NUM - 1, [index])

  const fetchData = useCallback(async () => {
    let genQuestions = await genRandQuestions(MAX_QUESTION_NUM)
    if (!genQuestions) {
      genQuestions = new Array(MAX_QUESTION_NUM).fill('')
    }
    setQuestions(genQuestions)
  }, [])

  useEffect(() => {
    // resetStats();
    fetchData()
  }, [fetchData])

  const audioContextRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const webSocketRef = useRef(null)
  const audioInputRef = useRef(null)
  const workletNodeRef = useRef(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!isRecording) {
      return
    }

    const startStreaming = async () => {
      // Initialize WebSocket connection
      webSocketRef.current = new WebSocket(
        `${findWebSocketUrl()}speech_to_text/ws`
      )

      webSocketRef.current.onopen = () => {
        setIsConnected(true)
        console.log('WebSocket open')
      }

      webSocketRef.current.onclose = () => {
        setIsConnected(false)
        console.log('WebSocket connection closed')
        // setTimeout(startStreaming, 1000)
      }

      webSocketRef.current.onerror = error => {
        console.error('WebSocket error:', error)
        webSocketRef.current.close()
      }

      // Get user media (microphone)
      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true
      })

      // Create AudioContext for audio processing
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)()

      // Load the script
      await audioContextRef.current.audioWorklet.addModule(
        '/audioWorkletProcessor.js'
      )

      // represent the captured audio stream
      audioInputRef.current = audioContextRef.current.createMediaStreamSource(
        mediaStreamRef.current
      )

      workletNodeRef.current = new AudioWorkletNode(
        audioContextRef.current,
        'audio-processor'
      )

      workletNodeRef.current.port.onmessage = event => {
        const audioData = event.data
        const float32Array = new Float32Array(audioData)
        const arrayBuffer = float32Array.buffer
        if (webSocketRef.current.readyState === WebSocket.OPEN) {
          console.log('Streaming...')
          webSocketRef.current.send(arrayBuffer)
        }
      }

      // Connect source node -> audioWorkletNode (instead of destination to avoid playback, we only want to stream)
      audioInputRef.current.connect(workletNodeRef.current)
    }

    startStreaming()

    return () => {
      // Cleanup on component unmount
      if (audioInputRef.current) {
        audioInputRef.current.disconnect()
      }
      if (workletNodeRef.current) {
        workletNodeRef.current.disconnect()
      }
      if (webSocketRef.current) {
        webSocketRef.current.close()
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [isRecording])

  function handlePreQue() {
    if (index > 0) setIndex(index - 1)
  }

  function handleNextQue() {
    if (index < MAX_QUESTION_NUM - 1) setIndex(index + 1)
  }

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
              onClick={handlePreQue}
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
                  <div>{questions[index]?.questionText}</div>
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
                  {/* <div>{isRecording ? pendingRef.current : answers[index]}</div> */}
                  <div>Fake answers</div>
                </AssignmentContentCard>
              </div>
            </div>
            <ArrowLabel
              IconComponent={MdKeyboardDoubleArrowRight}
              label='Go to Next Question'
              onClick={handleNextQue}
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
