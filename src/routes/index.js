import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/home';
import Auth from '../pages/auth';
import Profile from '../pages/profile';
import NeuroRadiology from '../pages/neuro-radiology';
import Cases from '../pages/cases';

const AppRoutes = () => {
  return useRoutes([
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/neuro-radiology",
        element: <NeuroRadiology />
      },
      {
        path: '/cases',
        element: <Cases />
      },
      {
        path: "/profile",
        element: <Profile />
      }
  ])
}

export default AppRoutes