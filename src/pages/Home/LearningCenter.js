import { Grid } from '@mui/material'
import { AppLayout } from 'src/components/AppLayout/AppLayout'
import { LearningCenterData } from 'src/pages/Home/LearningCenterData'
import LearningCard from 'src/components/Cards/LearningCard'
import Footer from 'src/components/AppLayout/Footer'
import './Learning.css'
import '../Assignment/DailyGoal.css'
import '../../App.css'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'

function LearningCenterContainer() {
  /** @property {User} user * */
  const { user } = useAuth()
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
            <p>Let's practice English together!</p>
          </div>
        </Grid>

        <div className='learn-container theme-text'>
          <Grid
            container
            spacing={{ xs: 2, sm: 8, md: 8 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {LearningCenterData.map((item, index) => {
              if (item.name === 'joinSchool' && user.orgId) {
                return null // show join school if the user is not assigned to any
              }

              return (
                <Grid key={`Card ${index}`} item xs={4} sm={4} md={6}>
                  <LearningCard
                    label={item.title}
                    to={item.path}
                    isActive={item.isActive}
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
