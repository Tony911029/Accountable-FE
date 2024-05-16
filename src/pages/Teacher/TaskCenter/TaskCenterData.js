import {
  INVITATION,
  TEACHER_CLASSROOMS,
  TEACHER_STUDENT_LIST
} from 'src/navigation/CONSTANTS'

export const TaskCenterData = [
  {
    title: 'Join School',
    name: 'joinSchool',
    path: INVITATION,
    isActive: true
  },
  {
    title: 'My Student List',
    name: 'studentLists',
    path: TEACHER_STUDENT_LIST,
    isActive: true
  },
  {
    title: 'Add/Manage Classroom',
    name: 'manage',
    path: TEACHER_CLASSROOMS,
    isActive: true
  },
  {
    title: 'Upload Assignment',
    name: 'upload',
    path: '/',
    isActive: false
  },
  {
    title: 'Marking Assignment',
    name: 'marking',
    path: '/',
    isActive: false
  }
]
