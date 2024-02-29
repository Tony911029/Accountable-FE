import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { ROLES } from 'src/config/CONSTANTS';

export const SidebarData = [
  {
    title: 'HOME',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text home',
    isMain: true,
    role: ROLES.ALL,
  },
  {
    title: 'Learning Center',
    path: '/learning-center',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    isMain: true,
    role: ROLES.STUDENT,
  },
  {
    title: 'Task Center',
    path: '/task-center',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    isMain: true,
    role: ROLES.TEACHER,
  },
  {
    title: 'Admin Center',
    path: '/admin-center',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    isMain: true,
    role: ROLES.ADMIN,
  },
];
