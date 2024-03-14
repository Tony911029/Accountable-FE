import { useCallback, useEffect, useMemo } from 'react'
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
import {
  capitalizeFirstLetter,
  countWords,
  debounce
} from 'src/pages/Assignment/utils'
import MainButton from 'src/components/MainButton'
import AssignmentDone from 'src/pages/Assignment/AssignmentDone'
import ProgressBar from '@ramonak/react-progress-bar'
import Footer from '../../components/AppLayout/Footer'

// TODO: might wanna try out Amazon service or some other solution for this
//  as they current solution only supports limited browser:
//  https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const microphone = new SpeechRecognition()
microphone.interimResults = true
microphone.lang = 'en-US'
const timeLimit = 120 // maximum of 120 seconds
let timeoutId
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

function DailySpeakingPage() {
  const [counts, setCounts] = useState(new Array(MAX_QUESTION_NUM).fill(0))
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState(new Array(MAX_QUESTION_NUM).fill(''))

  const [isRecording, setIsRecording] = useState(false)
  const [index, setIndex] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const queAnswerNum = useMemo(
    () => answers?.filter(answer => answer !== '').length
  )
  const isLastPage = useMemo(
    () => index === MAX_QUESTION_NUM - 1,
    [index, MAX_QUESTION_NUM]
  )
  const sum = useMemo(() =>
    counts?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  )

  const resetStats = () => {
    setQuestions([])
    setAnswers(new Array(MAX_QUESTION_NUM).fill(''))
    setCounts(new Array(MAX_QUESTION_NUM).fill(0))
    setIndex(0)
    localStorage.removeItem(QUESTION_CONSTANT.GEN_QUESTION)
    localStorage.removeItem(QUESTION_CONSTANT.STORE_ANSWER)
    localStorage.removeItem(QUESTION_CONSTANT.COUNT)
  }

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

  useEffect(() => {
    const storedAnswers = JSON.parse(
      localStorage.getItem(QUESTION_CONSTANT.STORE_ANSWER)
    )
    if (storedAnswers) {
      setAnswers(storedAnswers)
      const storedCount = storedAnswers?.map(answer => countWords(answer))
      setCounts(storedCount)
    }
  }, [])

  const storeAnsAttempt = record => {
    if (record) {
      setCurAns('')
      answers[index] = record
      setAnswers(answers)
      counts[index] = countWords(record)
      setCounts(counts)
      localStorage.setItem(
        QUESTION_CONSTANT.STORE_ANSWER,
        JSON.stringify(answers)
      )
      localStorage.setItem(QUESTION_CONSTANT.COUNT, JSON.stringify(counts))

      if (!isLastPage) setIndex(index + 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
    resetStats()
  }

  const [genAns, setGenAns, genRef] = useState('')
  const [pendingAns, setPendingAns, pendingRef] = useState('')
  const [curAns, setCurAns, curAnsRef] = useState('') // answer we want to anchor

  const mergeCurAns = newSentence => {
    if (newSentence.toLowerCase().includes(genRef.current.toLowerCase())) {
      setGenAns(newSentence)
      setPendingAns(
        `${
          curAnsRef.current ? `${curAnsRef.current}. ` : ''
        }${capitalizeFirstLetter(newSentence)}`
      )
    } else {
      const mergedSentence = `${
        curAnsRef.current ? `${curAnsRef.current}. ` : ''
      }${capitalizeFirstLetter(genRef.current)}`
      setPendingAns(mergedSentence)
      setCurAns(mergedSentence)
      setGenAns('')
    }
  }

  const debouncedMergeCurAns = debounce(mergeCurAns, 200)

  const handleRecord = () => {
    if (isRecording) {
      microphone.start()
      microphone.onend = () => {
        microphone.start()
      }

      // Set a timeout to stop the recording after 2 mins
      timeoutId = setTimeout(() => {
        microphone.stop()
        storeAnsAttempt(pendingRef.current)
      }, timeLimit * 1000)
    } else {
      microphone.stop()
      microphone.onend = () => {}
      storeAnsAttempt(pendingRef.current)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    // For some reason, this needs to be here
    microphone.onstart = () => {}

    let recordingResult
    microphone.onresult = event => {
      recordingResult = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      const wordCount = countWords(pendingRef.current)
      const updatedList = counts.map((item, idx) =>
        idx === index ? wordCount : item
      )
      setCounts(updatedList)
      debouncedMergeCurAns(recordingResult)
      microphone.onerror = event => {
        console.log(event.error)
      }
    }
  }

  // cap the recording tome at 2 minutes
  useEffect(() => {
    handleRecord()
    return () => {
      // Cleanup timeout on component unmount
      clearTimeout(timeoutId)
      microphone.onend = null
      microphone.onresult = null
      microphone.onerror = null
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
                  <div>{isRecording ? pendingRef.current : answers[index]}</div>
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
                onClick={handleSubmit}
                className='font-1.2rem'
              />
            )}
          </div>
        </div>
      ) : (
        <AssignmentDone wordCount={sum} />
      )}

      <Footer />
    </AppLayout>
  )
}

export default DailySpeakingPage
