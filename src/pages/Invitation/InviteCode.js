import Divider from '@mui/material/Divider'
import { AppLayout } from 'src/components/AppLayout/AppLayout'
import Footer from 'src/components/AppLayout/Footer'
import 'App.css'
import './Invitation.css'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'
import MainButton from 'src/components/MainButton'
import TextBox from 'src/components/TextBox/TextBox'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ROLES } from 'src/config/CONSTANTS'
import { LEARNING_CENTER, TASK_CENTER } from 'src/navigation/CONSTANTS'
import { findOrgByCode } from 'src/services/orgService'
import { CgProfile } from 'react-icons/cg'
import _ from 'lodash'
import { sendJoinRequest } from 'src/services/joinRequest'

// TODO: Will need to add more props for customization,
//  this will be used for "join school" for both students and teachers
//  this will be used for "join classroom" for students

const TypeDict = {
  org: 'School',
  classroom: 'Classroom'
}

function InviteCode() {
  /** @property {User} user * */
  const { role, user } = useAuth()
  const [value, setValue] = useState('')
  const [placeToJoin, setPlaceToJoin] = useState([])
  const [type, setType] = useState('')
  const typeRef = useRef(type)
  const history = useHistory()
  const location = useLocation()

  const handleSkip = () => {
    if (role === ROLES.STUDENT) {
      history.push(LEARNING_CENTER)
    }
    if (role === ROLES.TEACHER) {
      history.push(TASK_CENTER)
    }
  }

  const submitRequest = (org, user) => {
    sendJoinRequest(org, null, user).then(
      r => console.log(r)
      // TODO: figure out what to do once they send the request
    )
  }

  useEffect(() => {
    typeRef.current = type
  }, [type])

  useEffect(() => {
    const currentUrl = location.pathname
    const parts = currentUrl.split('/')
    const inviteIndex = parts.findIndex(part => part === 'invite')
    if (inviteIndex >= 0 && inviteIndex < parts.length - 1) {
      const locationType = parts[inviteIndex + 1]
      setType(TypeDict[locationType])
    }
  }, [location.pathname])

  // TODO: Probably should work with full text search on the name?
  const debouncedSearch = useCallback(
    _.debounce(nextValue => {
      if (typeRef.current === TypeDict.org) {
        if (nextValue) {
          findOrgByCode(nextValue).then(setPlaceToJoin)
        } else {
          setPlaceToJoin([])
        }
      } else if (type === TypeDict.classroom) {
        // do nothing
      }
    }, 500),
    []
  )

  const handleChange = event => {
    setValue(event.target.value)
    debouncedSearch(event.target.value)
  }

  return (
    <AppLayout>
      <div className='assignment-container gap-3rem'>
        <div className='assignment-section'>
          <h1>{`Join a ${type} !`}</h1>
          <p>{`Enter a ${type} code to find the school`}</p>
        </div>

        <div className='view-50'>
          <div className='flex invite-code-wrapper gap-1'>
            <h2>{`7 Digits ${type} Code`}</h2>
            <TextBox value={value} onChange={handleChange} fullWidth />
          </div>

          {placeToJoin &&
            placeToJoin?.map(org => {
              return (
                <div className='full-w card schoolIntro' key={org?.orgName}>
                  <CgProfile size='4rem' />
                  <p>{org?.orgName}</p>
                  <MainButton
                    btnLabel='Send Request'
                    onClick={() => {
                      submitRequest(org, user)
                    }}
                  />
                </div>
              )
            })}
        </div>

        <div className='view-30'>
          <Divider>or</Divider>
        </div>

        <MainButton btnLabel='Continue Without School' onClick={handleSkip} />

        <div className='view-50 instruction'>
          <ul>
            <li>
              New user, please enter your School Code, ex:123, to connect with
              your school and teacher’s account so that your assignment can be
              marked, and you can receive your assignment and feedback from your
              teacher.
            </li>
            <li>
              User without a school code will be considered as an individual
              user, and can still use our platform to boost your speaking
              English.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </AppLayout>
  )
}

export default InviteCode
