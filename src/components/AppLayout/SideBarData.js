import React from "react";
import * as AiIcons from "react-icons/ai";
import { ROLES } from "src/config/CONSTANTS";
import {
  ADMIN_CENTER,
  LEARNING_CENTER,
  TASK_CENTER,
} from "src/navigation/CONSTANTS";

export const SidebarData = [
  {
    title: "HOME",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text home",
    isMain: true,
    role: ROLES.ALL,
  },
  {
    title: "Learning Center",
    path: LEARNING_CENTER,
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    isMain: true,
    role: ROLES.STUDENT,
  },
  {
    title: "Task Center",
    path: TASK_CENTER,
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    isMain: true,
    role: ROLES.TEACHER,
  },
  {
    title: "Admin Center",
    path: ADMIN_CENTER,
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
    isMain: true,
    role: ROLES.ADMIN,
  },
];
