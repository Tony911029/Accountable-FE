import { useState, useMemo, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './AppHeader.css'
import { Button } from '@material-ui/core'
import { CgProfile } from 'react-icons/cg'
import { makeStyles } from 'tss-react/mui'
import {
  LOGIN,
  ROOT,
  PROFILE,
  LEARNING_CENTER,
  ADMIN_CENTER,
  TASK_CENTER
} from 'src/navigation/CONSTANTS'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'
import { MdLogout } from 'react-icons/md'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { ROLES } from 'src/config/CONSTANTS'
import { SidebarData } from './SideBarData'

function AppHeader({
  showSubHeader = true,
  subHeaderLabel = '',
  isPracticing,
  setIsPracticing
}) {
  const iconStyles = {
    backgroundColor: 'FF9900',
    color: '#fff',
    fontSize: '1.2rem',
    borderRadius: '50%',
    minWidth: '19%'
  }

  const useStyles = makeStyles()(() => ({
    customButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '8px 20px',
      whiteSpace: 'pre',
      boxShadow: ' 0px 2px 2px rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
      '&:hover': {
        boxShadow: '0px 10px 30px 0px #FF99004A !important'
      },
      background: '#FFF !important',
      fontFamily: 'Poppins, sans-serif !important',
      fontWeight: '700 !important'
    },
    customBack: {
      color: '#FF990026',
      fontSize: '3rem',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    exitButton: {
      color: '#FF990026',
      fontSize: '1rem',
      '&:hover': {
        cursor: 'pointer'
      },
      width: '5.5rem',
      border: ' 4px solid #FF99004A',
      borderRadius: '16px',
      display: 'flex',
      justifyContent: 'center'
    }
  }))

  const { classes } = useStyles()
  const { user, signOut, role } = useAuth()
  const history = useHistory()
  const [profile, setProfile] = useState(false)
  const userRole = useMemo(() => role, [role])

  const HOME_PAGE = useMemo(() => {
    if (userRole === ROLES.STUDENT) {
      return LEARNING_CENTER
    }
    if (userRole === ROLES.ADMIN) {
      return ADMIN_CENTER
    }
    if (userRole === ROLES.TEACHER) {
      return TASK_CENTER
    }
    return ROOT
  }, [userRole])

  const handleSignOut = () => {
    signOut()
  }
  const handleLogin = () => {
    history.push(LOGIN)
  }

  const toggleProfile = () => setProfile(!profile)
  function handleProfile() {
    history.push(PROFILE)
  }

  function handleBack() {
    history.goBack()
  }

  const loginButton = (
    <Button
      className={classes.customButton}
      startIcon={<CgProfile style={iconStyles} />}
      onClick={handleLogin}
    >
      Login/Register
    </Button>
  )

  const profileDropDown = (
    // TODO: Fixed the username overflow
    <ul className='dropDownProfile'>
      <li onClick={toggleProfile}>
        <CgProfile style={iconStyles} size='1.7rem' />{' '}
        <span className='listText'>{user?.username}</span>
      </li>
      <li className={profile ? '' : 'hideDropDown'} onClick={handleProfile}>
        <CgProfile style={iconStyles} size='1.7rem' />{' '}
        <span className='ListText'>My Account</span>
      </li>
      <li className={profile ? '' : 'hideDropDown'} onClick={handleSignOut}>
        <MdLogout style={iconStyles} size='1.7rem' />{' '}
        <span className='listText'>Log Out</span>
      </li>
    </ul>
  )

  return (
    <div>
      <nav className='nav'>
        <div className='site-title'>
          <Link to={HOME_PAGE}>ACCOUNTABLE</Link>
        </div>
        <div className='header-tabs'>
          <ul>
            {SidebarData.filter(
              item => item.role === userRole || item.role === ROLES.ALL
            ).map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          {user ? profileDropDown : loginButton}
        </div>
      </nav>
      {showSubHeader && (
        <nav className='nav sub-header'>
          <div className='flex header-tabs gap-1'>
            <FaLongArrowAltLeft
              className={classes.customBack}
              onClick={handleBack}
            />
            <div>{subHeaderLabel}</div>
          </div>
          {isPracticing && (
            <div className={classes.exitButton}>
              <Link to={LEARNING_CENTER}>Exit</Link>
            </div>
          )}
        </nav>
      )}
    </div>
  )
}

export default AppHeader
