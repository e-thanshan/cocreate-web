import React, { useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ExplorePage from './pages/ExplorePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NewProject from './pages/NewProject.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

const router = createBrowserRouter([
  {
    path: "/explore",
    element: <ExplorePage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/project",
    element: <ProjectPage />
  },
  {
    path: "/user",
    element: <ProfilePage />
  },
  {
    path:"/createProject",
    element: <NewProject/>
  },{
    path:"/signup",
    element: <SignUpPage/>
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
