import { Grid } from '@mui/material'
import { AppLayout } from 'src/components/AppLayout/AppLayout'
import { LearningCenterData } from 'src/pages/Home/LearningCenterData'
import LearningCard from 'src/components/Cards/LearningCard'
import Footer from 'src/components/AppLayout/Footer'
import './Learning.css'
import '../Assignment/DailyGoal.css'
import '../../App.css'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'
import ClassDropDownList from 'src/components/DropDownList/ClassDropDownList'
import { useEffect, useState } from 'react'
import { getClassroomsByUserId } from 'src/services/classroomService'

function LearningCenterContainer() {
  /** @property {User} user * */
  const { user } = useAuth()
  const [classrooms, setClassrooms] = useState([])
  const [selectedClassroom, setSelectedClassroom] = useState(null)

  useEffect(() => {
    const fetchClassrooms = async () => {
      if (user) {
        try {
          const res = await getClassroomsByUserId(user.userId)
          const defaultOptions = [
            { className: 'Select classrooms' },
            { className: 'Self Growing Zone' }
          ]
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
            <h1>Learning Center</h1>
            <p className='mb-30'>Let's practice English together!</p>
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
            {LearningCenterData.map((item, index) => {
              if (item.name === 'joinSchool' && user?.organization?.id) {
                return null // show join school if the user is not assigned to any
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

export default LearningCenterContainer
