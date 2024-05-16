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

// TODO: Switch to TypeScript, this is dumb af
/**
 * @typedef {Object} Params
 * @property {string} id - The id of the class.
 * @property {string} name - The name of the class.
 * @property {number} number - number of users within the class
 */

/** @property {Params} params * */
function AddPersonIcon({ classInfo }) {
  // Custom styling

  const { classes } = useStyles()

  const [open, setOpen] = useState(false)
  const toggleModal = event => {
    event.stopPropagation()
    setOpen(!open)
  }
  console.log('params', classInfo)

  const badgeRef = useRef(null)

  // TDOO: If class is 0, the badge will not show
  return (
    <Badge
      overlap='circular'
      badgeContent={classInfo?.number} // TODO: This is the entire class number not just pending
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
        classInfo={classInfo}
      />
    </Badge>
  )
}

export default AddPersonIcon
