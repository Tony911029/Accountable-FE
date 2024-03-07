import { AppLayout } from 'src/components/AppLayout/AppLayout'
import Footer from 'src/components/AppLayout/Footer'
import UserListTable from 'src/components/Tables/UserListTable'
import 'App.css'
import AddPersonIcon from 'src/components/Icon/Badge'

function AdminUserList() {
  return (
    <AppLayout
      showSubHeader
      subHeaderLabel='Back to Previous Page'
      isPracticing
    >
      <div className='assignment-container'>
        <div className='assignment-section'>
          <h1>Teacher of Tony's Grind School</h1>
          <p className='mb-30'>you have 20 teachers on the list</p>
        </div>

        <div className='assignment-wrapper align-top full-w'>
          <div className='view-30 table-info'>
            <h1 className='theme-text'>Capacity</h1>
            <h1>15/30</h1>
          </div>
          <UserListTable />
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
