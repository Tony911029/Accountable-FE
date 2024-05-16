import { AppLayout } from 'src/components/AppLayout/AppLayout'
import Footer from 'src/components/AppLayout/Footer'
import UserListTable from 'src/components/Tables/UserListTable'
import 'App.css'
import AddPersonIcon from 'src/components/Icon/Badge'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState } from 'react'
import { getClassroomById } from 'src/services/classroomService'
import { useLocation, useParams } from 'react-router-dom'
import {
  ADMIN_STUDENT_LIST,
  ADMIN_TEACHER_LIST
} from 'src/navigation/CONSTANTS'
import { ROLES } from 'src/config/CONSTANTS'

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

function ClassroomDetail() {
  const [classroom, setClassroom] = useState({})
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('')
  const location = useLocation()
  const { id } = useParams()

  const transformToRows = users => {
    return users
      ?.filter(user => user.role === ROLES.STUDENT)
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
      setRole(ROLES.TEACHER)
    } else if (currentUrl.includes(ADMIN_STUDENT_LIST)) {
      setRole(ROLES.STUDENT)
    } else {
      setRole(null)
    }
  }, [location.pathname])

  useEffect(() => {
    getClassroomById(id)
      .then(res => {
        // Filter out teachers
        const filteredUsers = res?.users.filter(
          user => user.role === ROLES.STUDENT
        )
        setClassroom({ ...res, users: filteredUsers })
      })
      .catch(err => {})
      .finally(setLoading(false))
  }, [role])

  useEffect(() => {
    const users = classroom?.users
    if (users?.length > 0) {
      setRows(transformToRows(classroom?.users))
    }
  }, [classroom])

  return (
    <AppLayout
      showSubHeader
      subHeaderLabel='Back to Previous Page'
      isPracticing
    >
      <div className='assignment-container'>
        <div className='assignment-section'>
          <h1>{classroom?.className}</h1>
          <p className='mb-30'>
            {`you have ${classroom?.users?.length || 0} students on the list`}
          </p>
        </div>

        <div className='assignment-wrapper align-top full-w'>
          <div className='view-30 table-info'>
            <h1 className='theme-text'>Class Code</h1>
            <h1>{`${classroom?.code}`}</h1>
          </div>
          <UserListTable
            rows={rows}
            columns={columns}
            infiniteScroll
            useHeader={false}
          />
          <div className='view-30'>
            <AddPersonIcon
              classInfo={{
                id: classroom.id,
                className: classroom.className,
                number: classroom.users?.length || 0
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </AppLayout>
  )
}

export default ClassroomDetail
