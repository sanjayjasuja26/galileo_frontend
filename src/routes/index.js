import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/home';
import Auth from '../pages/auth';
import Profile from '../pages/profile';

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
        path: "/profile",
        element: <Profile />
      }
  ])
}

export default AppRoutes