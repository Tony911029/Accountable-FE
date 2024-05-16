import { AppLayout } from 'src/components/AppLayout/AppLayout'
import { Grid } from '@mui/material'
import Footer from 'src/components/AppLayout/Footer'
import 'App.css'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'
import ClassroomTable from 'src/components/Tables/ClassroomsTable'
import MainButton from 'src/components/MainButton'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { getClassroomsByUserId } from 'src/services/classroomService'
import Row from 'src/pages/Teacher/Management/Row'
import { useHistory } from 'react-router-dom'
import { TEACHER_STUDENT_LIST } from 'src/navigation/CONSTANTS'

const Header = () => {
  return (
    <div className='header'>
      <div>My Class</div>
      <div>Number of People</div>
      <div>Join Request</div>
    </div>
  )
}

function Classrooms() {
  const [rows, setRows] = useState([])
  const { user } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(true)

  const openClassDetail = params => {
    // To: ClassroomDetail.js
    history.push(`${TEACHER_STUDENT_LIST.replace(':id', params.id)}`)
  }

  const columns = [
    {
      field: 'classInfo',
      renderCell: params => (
        <Row params={params} onClick={() => openClassDetail(params)} />
      ),
      flex: 1,
      editable: false
    }
  ]

  const transformToRows = classrooms => {
    return classrooms?.map((classroom, index) => ({
      id: classroom.id,
      name: classroom.className,
      number: classroom.users?.length
    }))
  }

  useEffect(() => {
    const fetchClassrooms = async () => {
      // TODO: BE needs extra field called pending count
      if (user) {
        setLoading(true)
        try {
          const res = await getClassroomsByUserId(user.userId)
          setRows(transformToRows(res))
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchClassrooms()
  }, [user])

  return (
    <AppLayout
      showSubHeader
      subHeaderLabel='Back to Previous Page'
      isPracticing
    >
      <Grid container className='assignment-container cool-bg'>
        <div className='assignment-section'>
          <h1>Add or Manage Classroom</h1>
        </div>
        <div className='full-w assignment-container'>
          <Header />
          <ClassroomTable
            rows={rows}
            columns={columns}
            handleRowClick={openClassDetail}
          />
        </div>
        <div className='add-class-btn'>
          <MainButton btnLabel='Add Class' />
        </div>
      </Grid>
      <Footer />
    </AppLayout>
  )
}

export default Classrooms
