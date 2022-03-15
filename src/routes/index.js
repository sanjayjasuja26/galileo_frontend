import React from 'react'
import { useRoutes } from 'react-router-dom'
import Home from '../pages/home';
import Auth from '../pages/auth';

const AppRoutes = () => {
  return useRoutes([
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/auth",
        element: <Auth />
      }
  ])
}

export default AppRoutes