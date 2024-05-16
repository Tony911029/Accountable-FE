import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import './Tables.css'
import { makeStyles } from 'tss-react/mui'
import * as React from 'react'
import { useCallback } from 'react'

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
    padding: '25px 0px 0px px'
  }
}))

function ClassroomTable({
  height = 800,
  width = '70%',
  rows = [],
  columns,
  handleRowClick
}) {
  const { classes } = useStyles()
  const getRowSpacing = useCallback(params => ({ bottom: '5%' }), [])
  return (
    <Box
      sx={{
        height,
        width
      }}
    >
      <DataGrid
        columnHeaderHeight={0}
        // getRowSpacing={getRowSpacing} // TODO: giving us issues in the console
        rows={rows}
        columns={columns}
        rowHeight={150}
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: {
              // pageSize: rows.length // TODO:infinite scrolling not working
              pageSize: 30
            }
          }
        }}
        className={classes.root}
      />
    </Box>
  )
}

export default ClassroomTable
