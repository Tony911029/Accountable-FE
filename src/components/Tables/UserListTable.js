import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import './Tables.css'
import { makeStyles } from 'tss-react/mui'

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

function UserListTable({
  height = 800,
  width = '70%',
  rowHeight = 70,
  useHeader = true,
  // pageSize = 15,// kinda buggy
  infiniteScroll = false,
  pageSizeOptions = [5, 10, 15, 20],
  rows,
  columns
}) {
  const { classes } = useStyles()
  const conditionalProps = !useHeader ? { columnHeaderHeight: 0 } : {}
  // if (infiniteScroll) {
  //   pageSize = rows.length
  // }

  return (
    <Box
      sx={{
        height,
        width
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={rowHeight}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15
            }
          }
        }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection
        className={classes.root}
        {...conditionalProps}
      />
    </Box>
  )
}

export default UserListTable
