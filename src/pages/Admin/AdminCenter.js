import { AppLayout } from 'src/components/AppLayout/AppLayout'
import { Grid } from '@mui/material'
import LearningCard from 'src/components/Cards/LearningCard'
import Footer from 'src/components/AppLayout/Footer'

// todo: gotta move this to comment view
import '../Assignment/DailyGoal.css'
import '../Home/Learning.css'
import { AdminCenterData } from 'src/pages/Admin/AdminCenterData'
import ClassDropDownList from 'src/components/DropDownList/ClassDropDownList'

function AdminCenter() {
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
            <h1>School Admin Center</h1>
            <p>Click to choose your task to start</p>
          </div>
        </Grid>
        <div className='learn-container theme-text'>
          <Grid
            container
            spacing={{ xs: 2, sm: 8, md: 8 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {AdminCenterData.map((item, index) => (
              <Grid key={index} item xs={4} sm={8} md={6}>
                <LearningCard
                  label={item.title}
                  to={item.path}
                  isActive={item.isActive}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Footer />
    </AppLayout>
  )
}

export default AdminCenter
