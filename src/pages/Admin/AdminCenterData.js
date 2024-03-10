import {
  ADMIN_STUDENT_LIST,
  ADMIN_TEACHER_LIST
} from 'src/navigation/CONSTANTS'

export const AdminCenterData = [
  {
    title: 'Teacher List',
    name: 'teacher',
    path: ADMIN_TEACHER_LIST,
    isActive: true
  },
  {
    title: 'Student List',
    name: 'student',
    path: ADMIN_STUDENT_LIST,
    isActive: true
  },
  {
    title: 'Select Function',
    name: 'studentLists',
    path: '/',
    isActive: false
  }
]
