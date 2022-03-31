import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Home from '../pages/home';
import Auth from '../pages/auth';
import Profile from '../pages/profile';
import NeuroRadiology from '../pages/neuro-radiology';
import { useSelector } from 'react-redux';

const AppRoutes = () => {  

  const { user } = useSelector(state => state.auth);

  return useRoutes([
      {
        path: "/",
        element: user === null ? <Navigate to="/auth" /> : <Home />
      },
      {
        path: "/auth",
        element: user !== null ? <Navigate to="/" /> : <Auth />
      },
      {
        path: "/neuro-radiology",
        element: user === null ? <Navigate to="/auth" /> : <NeuroRadiology />
      },
      {     
        path: "/profile",
        element: user === null ? <Navigate to="/auth" /> : <Profile />
      }
  ])
}

export default AppRoutes