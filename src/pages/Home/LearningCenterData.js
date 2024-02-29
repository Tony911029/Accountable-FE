import {
  ASSIGNMENT, DAILY_SPEAKING, INVITATION, PROGRESS, SUBMISSION,
} from 'src/navigation/CONSTANTS';

export const LearningCenterData = [
  {
    title: 'Join School',
    name: 'joinSchool',
    path: INVITATION,
    isActive: true,
  },
  {
    title: 'Daily Speaking Practice Zone',
    name: 'speaking',
    path: DAILY_SPEAKING,
    isActive: true,
  },
  {
    title: 'Assignment',
    name: 'assignment',
    path: ASSIGNMENT,
    isActive: false,
  },
  {
    title: 'Submission & Feedback',
    name: 'submission',
    path: SUBMISSION,
    isActive: false,
  },
  {
    title: 'Growth Calendar',
    name: 'calender',
    path: PROGRESS,
    isActive: false,
  },
];
