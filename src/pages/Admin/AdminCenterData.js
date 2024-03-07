import { TEACHER_LIST } from 'src/navigation/CONSTANTS'

export const AdminCenterData = [
  {
    title: 'Teacher List',
    name: 'teacher',
    path: TEACHER_LIST,
    isActive: true
  },
  {
    title: 'Student List',
    name: 'student',
    path: '/',
    isActive: true
  },
  {
    title: 'Select Function',
    name: 'studentLists',
    path: '/',
    isActive: false
  }
]
