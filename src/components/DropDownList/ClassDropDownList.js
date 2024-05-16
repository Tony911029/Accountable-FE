import { makeStyles } from 'tss-react/mui'
import { List, ListItemText } from '@material-ui/core'
import { Box, ListItemButton, Menu, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'

const useStyles = makeStyles()(() => ({
  label: {
    fontWeight: '600',
    fontSize: '1.25rem',
    color: '#C19D72'
  },
  backGround: {
    boxShadow: '0px 2px 10px 0px #FF990033',
    borderRadius: '10px'
  },
  dropDownButton: {
    width: '100%',
    minWidth: '200px',
    textAlign: 'center'
  },
  listItemText: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#FF9900'
  },
  listItem: {
    width: '100% !important',
    minWidth: '200px',
    '&:hover': {
      backgroundColor: '#FFDEAB'
    },
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: '0px 10px 30px 0px #FF99004A !important',
      color: '0px 10px 30px 0px #FF99004A !important'
    },
    color: '#FF9900 !important',
    fontWeight: '600 !important',
    textAlign: 'center'
  }
}))

function ClassDropDownList({
  label,
  to,
  isActive,
  onClassChange,
  classrooms = []
}) {
  const { classes } = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(1)
  const open = Boolean(anchorEl)
  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
    onClassChange(classrooms[index])
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div className={classes.label}>My Classroom</div>
      <div className={classes.backGround}>
        <List component='nav' aria-label='Select Classroom'>
          <ListItemButton
            id='lock-button'
            aria-haspopup='listbox'
            aria-controls='lock-menu'
            aria-label='My classroom'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClickListItem}
            className={classes.dropDownButton}
          >
            <ListItemText
              primary={
                <Box className={classes.listItemText}>
                  {classrooms[selectedIndex]?.className}
                </Box>
              }
            />
          </ListItemButton>
        </List>
        <Menu
          id='lock-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {classrooms.map((option, index) => (
            <MenuItem
              key={`${option} + ${index}`}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={event => handleMenuItemClick(event, index)}
              className={classes.listItem}
            >
              {option.className}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  )
}

export default ClassDropDownList
