import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import './Tables.css'
import { makeStyles } from 'tss-react/mui'

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

const rows = [
  { id: 1, avatar: 'Snow', username: 'Giannis Antetokounmpo' },
  { id: 2, avatar: 'Lancaster', username: 'Amanda Anderson' },
  { id: 3, avatar: 'Tony', username: 'Michael Wilson' },
  { id: 4, avatar: 'Tommy', username: 'Emily Johnson' },
  { id: 5, avatar: 'Chris', username: 'Maria Rodriguez' },
  { id: 6, avatar: 'Ben', username: 'Benjamin Lewis' },
  { id: 7, avatar: 'Evan', username: 'Linh Nguyen' },
  { id: 8, avatar: 'God', username: 'Mei-Ling Chan' },
  { id: 9, avatar: 'West', username: 'Kanye West' },
  { id: 10, avatar: 'West', username: 'Paul George' },
  { id: 11, avatar: 'West', username: 'Max Verstappen' },
  { id: 12, avatar: 'West', username: 'Elon Mush' },
  { id: 13, avatar: 'West', username: 'Hello Wolrd' }
]

const useStyles = makeStyles()(() => ({
  root: {
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
      outline: 'none'
    },
    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
      {
        outline: 'none'
      },
    '& .Mui-focused': {
      outline: 'none'
    },
    '& .MuiCheckbox-root svg': {
      width: 25,
      height: 25,
      backgroundColor: 'transparent',
      border: `3px solid #FFC56D`,
      borderRadius: '50%'
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none'
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#FFC56D',
      borderColor: '#FFC56D'
    },
    '& .MuiDataGrid-cell': {
      border: 'none'
    },
    '& .MuiDataGrid-columnHeaders': {
      border: 'none'
    },
    '& .MuiDataGrid-footerContainer ': {
      border: 'none'
    },
    border: 'none',
    boxShadow: '0px 5px 21px 0px rgba(255, 153, 0, 0.2)',
    borderRadius: '10px',
    '& .MuiDataGrid-main': {
      borderRadius: '10px'
    },
    padding: '25px 0px 0px 25px'
  }
}))

function UserListTable() {
  const { classes } = useStyles()
  return (
    <Box
      sx={{
        height: 800,
        width: '70%'
      }}
    >
      <DataGrid
        autoheight
        columnHeaderHeight={0}
        rows={rows}
        columns={columns}
        rowHeight={70}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20
            }
          }
        }}
        pageSizeOptions={[5, 10, 15, 20]}
        checkboxSelection
        className={classes.root}
      />
    </Box>
  )
}

export default UserListTable
