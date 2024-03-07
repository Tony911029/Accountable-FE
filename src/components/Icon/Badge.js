import React, { useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import { makeStyles } from 'tss-react/mui'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded'
import JoinRequestModal from 'src/components/Icon/JoinModal'
const useStyles = makeStyles()(() => ({
  font: { fontSize: '30px' },
  badge: {
    boxShadow: '0px 10px 16px 0px rgba(255, 153, 0, 0.3)',
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    '& .MuiBadge-badge': {
      backgroundColor: '#FF9900',
      color: 'white',
      fontSize: '1.1rem'
    }
  },
  icon: {
    backgroundColor: 'white',
    color: '#FF9900',
    width: '5rem',
    height: '5rem',
    '&:hover': {
      boxShadow: '0px 10px 30.5px 0px #FF99004A',
      cursor: 'pointer'
    }
  },
  people: {
    width: '3rem',
    height: '3rem',
    margin: '0 0 0px 12px'
  }
}))
function AddPersonIcon() {
  // Custom styling

  const { classes } = useStyles()

  const [open, setOpen] = useState(false)
  const toggleModal = () => setOpen(!open)

  const badgeRef = useRef(null)

  return (
    <Badge
      overlap='circular'
      badgeContent={5}
      className={classes.badge}
      classes={{
        badge: classes.font1
      }}
      ref={badgeRef}
    >
      <Avatar className={classes.icon} onClick={toggleModal}>
        <PersonAddAltRoundedIcon className={classes.people} />
      </Avatar>
      <JoinRequestModal
        handleClose={toggleModal}
        open={open}
        badgeRef={badgeRef}
      />
    </Badge>
  )
}

export default AddPersonIcon
