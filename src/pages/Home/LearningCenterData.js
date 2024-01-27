import {ASSIGNMENT, DAILY_SPEAKING, PROGRESS, SUBMISSION} from "src/navigation/CONSTANTS";

export const LearningCenterData = [
    {
        title: 'Daily Speaking Practice Zone',
        name: 'speaking',
        path: DAILY_SPEAKING,
        isActive: true
    },
    {
        title: 'Assignment',
        name: 'assignment',
        path: ASSIGNMENT,
        isActive: false
    },
    {
        title: 'Growth Calendar',
        name: 'calender',
        path: PROGRESS,
        isActive: false
    },
    {
        title: 'Submission & Feedback',
        name: 'submission',
        path: SUBMISSION,
        isActive: false
    },
]