import { AppLayout } from 'src/components/AppLayout/AppLayout'
import Footer from 'src/components/AppLayout/Footer'
import UserListTable from 'src/components/Tables/UserListTable'
import 'App.css'
import AddPersonIcon from 'src/components/Icon/Badge'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { getUsersForAdmin } from 'src/services/userServices'
import { useLocation } from 'react-router-dom'
import {
  ADMIN_STUDENT_LIST,
  ADMIN_TEACHER_LIST
} from 'src/navigation/CONSTANTS'
import { ROLES } from 'src/config/CONSTANTS'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'

const Row = ({ params }) => {
  return (
    <div className='table-row table-text'>
      <div>{params.id}</div>
      <div>
        <Avatar src='' />
      </div>
    </div>
  )
}

function AdminUserList() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [displayUserType, setDisplayUserType] = useState('')
  const { user } = useAuth()

  const location = useLocation()

  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      renderCell: params => <Row params={params} />,
      flex: 3,
      editable: false
    },
    {
      field: 'username',
      headerName: 'Username',
      renderCell: params => (
        <div className='table-text'>{params.row.username}</div>
      ),
      flex: 5,
      editable: false
    }
  ]

  const transformToRows = users => {
    return users
      .filter(user => user.role === displayUserType)
      .map((user, index) => ({
        id: index + 1,
        // we will want display name in the future
        username: user.username,
        avatarUrl: ''
      }))
  }

  useEffect(() => {
    const currentUrl = location.pathname
    if (currentUrl.includes(ADMIN_TEACHER_LIST)) {
      setDisplayUserType(ROLES.TEACHER)
    } else if (currentUrl.includes(ADMIN_STUDENT_LIST)) {
      setDisplayUserType(ROLES.STUDENT)
    } else {
      setDisplayUserType(null)
    }
  }, [location.pathname])

  useEffect(() => {
    getUsersForAdmin()
      .then(users => {
        const rows = transformToRows(users)
        if (rows.length > 0) setRows(rows)
      })
      .catch(err => {})
      .finally(setLoading(false))
  }, [displayUserType])

  return (
    <AppLayout
      showSubHeader
      subHeaderLabel='Back to Previous Page'
      isPracticing
    >
      <div className='assignment-container'>
        <div className='assignment-section'>
          <h1>Admin of {user.organization?.orgName}</h1>
          <p className='mb-30'>
            {`you have ${
              rows.length
            } ${displayUserType.toLowerCase()}s on the list`}
          </p>
        </div>

        <div className='assignment-wrapper align-top full-w'>
          <div className='view-30 table-info'>
            <h1 className='theme-text'>Capacity</h1>
            <h1>{`${rows.length} / 30`}</h1>
          </div>
          <UserListTable
            rows={rows}
            columns={columns}
            infiniteScroll
            useHeader={false}
          />
          <div className='view-30'>
            <AddPersonIcon />
          </div>
        </div>
      </div>
      <Footer />
    </AppLayout>
  )
}

export default AdminUserList
