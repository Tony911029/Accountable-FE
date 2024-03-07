import React, { useEffect, useRef, useState } from 'react'
import Modal from '@mui/material/Modal'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { Box, Typography } from '@mui/material'
import MainButton from 'src/components/MainButton'
import './JoinModal.css'

const teacherRequests = [
  { id: 1, name: 'Daniel Davis', avatar: '' },
  { id: 2, name: 'Megan Smith', avatar: '' },
  { id: 3, name: 'Karen Miller', avatar: '' }
]

function JoinRequestModal({ handleClose, open, badgeRef }) {
  const modalRef = useRef(null)
  const [modalStyle, setModalStyle] = useState({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Initial off-screen positioning
    visibility: 'hidden' // Hide until positioned
  })

  useEffect(() => {
    if (!badgeRef.current) {
      return
    }

    // TODO: Figure out a way to render the component first to get is width then position
    // const badgeRect = badgeRef.current.getBoundingClientRect()
    // const modalRect = modalRef.current.getBoundingClientRect()

    // const top = badgeRect.top + modalRect.height / 2 + badgeRect.height / 2
    // const left = badgeRect.left - modalRect.width / 2 + badgeRect.width / 2

    setModalStyle({
      position: 'absolute',
      // top: `${top}px`,
      // left: `${left}px`,
      top: `50%`,
      left: `50%`,
      transform: 'translate(-50%, -50%)',
      width: '50%',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 5,
      borderRadius: '10px',
      zIndex: 1300 // Ensure the modal is above other elements
    })
  }, [badgeRef, open])

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div ref={modalRef}>
          <Box sx={{ ...modalStyle }}>
            <Typography variant='h6' component='h2' marginBottom={3}>
              You have{' '}
              <Box component='span' sx={{ color: 'orange' }}>
                {teacherRequests.length}
              </Box>{' '}
              teacher joining request.
            </Typography>

            <List>
              {teacherRequests.map((teacher, index) => (
                <ListItem
                  key={teacher.id}
                  disableGutters
                  className='gap-3rem mb-15'
                  secondaryAction={
                    <>
                      <div className='flex gap-3rem'>
                        <MainButton btnLabel='Accept' />
                        <MainButton btnLabel='Reject' />
                      </div>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar src={teacher.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={teacher.name} className='item-text' />
                </ListItem>
              ))}
            </List>
          </Box>
        </div>
      </Modal>
    </>
  )
}

export default JoinRequestModal
