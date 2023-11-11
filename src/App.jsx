import React, { useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppContext from './components/AppContext';
import ReactDOM from 'react-dom/client';
import ExplorePage from './pages/ExplorePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NewProject from './pages/NewProject.jsx';

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
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
