import { AppLayout } from 'src/components/AppLayout/AppLayout'
import { Grid } from '@mui/material'
import Footer from 'src/components/AppLayout/Footer'
import 'App.css'
import { useAuth } from 'src/navigation/Auth/ProvideAuth'
import ClassroomTable from 'src/components/Tables/ClassroomsTable'
import MainButton from 'src/components/MainButton'

function Classrooms() {
  const { user, role } = useAuth()
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
          <div className='header'>
            <div>My Class</div>
            <div>Number of People</div>
            <div>Join Request</div>
          </div>
          <ClassroomTable />
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
