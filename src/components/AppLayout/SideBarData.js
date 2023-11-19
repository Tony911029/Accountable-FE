import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'HOME',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text home',
        isMain: true
    },
    {
        title: 'Assignment',
        path: '/assignment',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        isMain: true
    },
    {
        title: 'Progress',
        path: '/progress',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        isMain: true
    },
    {
        title: 'Leaderboard',
        path: '/leaderboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text',
        isMain: false
    }
]