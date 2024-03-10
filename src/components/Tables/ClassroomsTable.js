import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import './Tables.css'
import { makeStyles } from 'tss-react/mui'
import * as React from 'react'
import AddPersonIcon from 'src/components/Icon/Badge'
import { useCallback } from 'react'

const Row = ({ params }) => {
  console.log('params', params)
  const rowInfo = params.row
  return (
    <div className='classroom-row'>
      <div>{rowInfo.name}</div>
      <div>{rowInfo.number}</div>
      <AddPersonIcon />
    </div>
  )
}
const columns = [
  {
    field: 'classInfo',
    renderCell: params => <Row params={params} />,
    flex: 1,
    editable: false
  }
]

const rows = [
  { id: 1, name: 'ECE140', number: 23 },
  { id: 2, name: 'ECE109', number: 16 },
  { id: 3, name: 'ECE222', number: 28 }
]

const useStyles = makeStyles()(() => ({
  root: {
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
      outline: 'none'
    },
    '& .Mui-focused': {
      outline: 'none'
    },
    '& .MuiDataGrid-cell': {
      border: 'none'
    },
    '& .MuiDataGrid-columnHeaders': {
      border: 'none'
    },
    '& .MuiDataGrid-footerContainer ': {
      border: 'none',
      display: 'none'
    },
    border: 'none',
    padding: '25px 0px 0px 25px'
  }
}))

// I don't think there will be hundreds of classrooms for each teacher so pagination might not be too important now
function ClassroomTable() {
  const { classes } = useStyles()

  const getRowSpacing = useCallback(params => {
    return {
      bottom: params.isLastVisible ? 0 : '3%'
    }
  }, [])

  return (
    <Box
      sx={{
        height: 700,
        width: '70%'
      }}
    >
      <DataGrid
        autoheight
        columnHeaderHeight={0}
        getRowSpacing={getRowSpacing}
        rows={rows}
        columns={columns}
        rowHeight={130}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: rows.length // load all in once
            }
          }
        }}
        className={classes.root}
      />
    </Box>
  )
}

export default ClassroomTable
