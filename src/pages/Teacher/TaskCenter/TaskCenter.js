import { AppLayout } from 'src/components/AppLayout/AppLayout'
import { Grid } from '@mui/material'
import LearningCard from 'src/components/Cards/LearningCard'
import Footer from 'src/components/AppLayout/Footer'

// todo: gotta move this to comment view
import '../../Assignment/DailyGoal.css'
import '../../Home/Learning.css'
import { TaskCenterData } from 'src/pages/Teacher/TaskCenter/TaskCenterData'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'
import ClassDropDownList from 'src/components/DropDownList/ClassDropDownList'
import { useEffect, useState } from 'react'
import { getClassroomsByUserId } from 'src/services/classroomService'
import { TEACHER_STUDENT_LIST } from 'src/navigation/CONSTANTS'

function TaskCenter() {
  const { user, role } = useAuth()
  const [classrooms, setClassrooms] = useState([])
  const [selectedClassroom, setSelectedClassroom] = useState(null)

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (user) {
        try {
          const res = await getClassroomsByUserId(user.userId)
          const defaultOptions = [{ className: 'Select classrooms' }]
          setClassrooms([...defaultOptions, ...res])
        } catch (err) {
          console.error(err)
        }
      }
    }
    fetchClassrooms()
  }, [user])

  useEffect(() => {
    setSelectedClassroom(classrooms[1])
  }, [classrooms])

  return (
    <AppLayout
      showSubHeader
      subHeaderLabel='Back to Previous Page'
      isPracticing
    >
      {/* TODO: find a better background, the tiny square is not dense enough for some pages */}
      <div className='cool-bg'>
        <Grid container className='assignment-container'>
          <div className='assignment-section'>
            <h1>Task Center</h1>
            <h1>{selectedClassroom?.className}</h1>
          </div>
          <div className='dropdown-position'>
            <ClassDropDownList
              onClassChange={setSelectedClassroom}
              classrooms={classrooms}
            />
          </div>
        </Grid>
        <div className='learn-container theme-text'>
          <Grid
            container
            spacing={{ xs: 2, sm: 8, md: 8 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {TaskCenterData.map((item, index) => {
              if (item.name === 'joinSchool' && user.organization.id) {
                return null // show join school if the user is not assigned to any
              }

              if (item.name === 'studentLists') {
                item.path = `${TEACHER_STUDENT_LIST.replace(
                  ':id',
                  selectedClassroom?.id
                )}`
              }

              return (
                <Grid key={`Card ${index}`} item xs={4} sm={4} md={6}>
                  <LearningCard
                    label={item.title}
                    to={item.path}
                    isActive={item.isActive}
                    classroom={selectedClassroom}
                  />
                </Grid>
              )
            })}
          </Grid>
        </div>
      </div>
      <Footer />
    </AppLayout>
  )
}

export default TaskCenter
