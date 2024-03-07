import { makeStyles } from 'tss-react/mui'
import { useHistory } from 'react-router-dom'
import { cardStyle } from 'src/styles/CardStyle'
import { List, ListItemText } from '@material-ui/core'
import { Box, ListItemButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

const options = [
  'Select classrooms',
  'Self Growing Zone',
  'Class A106',
  'Class B207'
]

function DropDownList({ label, to, isActive }) {
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
    button: {
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
      width: '100%',
      minWidth: '200px',
      '&:hover': {
        backgroundColor: '#FFDEAB'
      },
      '&.Mui-selected, &.Mui-selected:hover': {
        backgroundColor: '0px 10px 30px 0px #FF99004A !important',
        color: '0px 10px 30px 0px #FF99004A !important'
      },
      color: '#FF9900',
      fontWeight: '600 !important',
      textAlign: 'center'
    }
  }))

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
            className={classes.button}
          >
            <ListItemText
              primary={
                <Box className={classes.listItemText}>
                  {options[selectedIndex]}
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
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={event => handleMenuItemClick(event, index)}
              className={classes.listItem}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </>
  )
}

export default DropDownList
