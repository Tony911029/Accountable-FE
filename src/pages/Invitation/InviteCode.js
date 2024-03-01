import Divider from '@mui/material/Divider'
import { AppLayout } from 'src/components/AppLayout/AppLayout'
import Footer from 'src/components/AppLayout/Footer'
import 'App.css'
import './Invitation.css'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'
import MainButton from 'src/components/MainButton'
import TextBox from 'src/components/TextBox/TextBox'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ROLES } from 'src/config/CONSTANTS'
import { LEARNING_CENTER, TASK_CENTER } from 'src/navigation/CONSTANTS'
import { findOrgByCode } from 'src/services/orgService'
import { CgProfile } from 'react-icons/cg'

function InviteCode() {
  /** @property {User} user * */
  const { role } = useAuth()
  const [value, setValue] = useState('')
  const [org, setOrg] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true)
  const history = useHistory()

  const handleSkip = () => {
    if (role === ROLES.STUDENT) {
      history.push(LEARNING_CENTER)
    }
    if (role === ROLES.TEACHER) {
      history.push(TASK_CENTER)
    }
  }

  const handleChange = e => {
    const code = e.target.value
    setValue(code)
    if (code.length === 7) {
      setIsDisabled(false)
      const foundOrg = findOrgByCode(code)
      console.log('org', foundOrg)
      setOrg(foundOrg)
    } else {
      setIsDisabled(true)
      setOrg(null)
    }
  }

  const handleSearch = () => {}

  return (
    <AppLayout>
      <div className='assignment-container gap-3rem'>
        <div className='assignment-section'>
          <h1>Join a School!</h1>
          <p>Enter a school code to find the school</p>
        </div>

        <div className='view-50'>
          <div className='flex invite-code-wrapper gap-1'>
            <h2>7 Digits School Code</h2>
            <TextBox
              value={value}
              onChange={handleChange}
              fullWidth
              defaultValue='Default Value'
            />
          </div>

          {org && (
            <div className='full-w card schoolIntro'>
              <CgProfile size='4rem' />
              <p>{org?.schoolName}</p>
              <MainButton btnLabel='Send Request' onClick={handleSkip} />
            </div>
          )}
        </div>

        {!org && (
          <MainButton
            btnLabel='Search'
            disabled={isDisabled}
            onClick={handleSearch}
          />
        )}

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
