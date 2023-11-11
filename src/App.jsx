import React, { useState } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppContext from './components/AppContext';
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
  const [user, setUser] = useState(null);

  const contextSettings = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={contextSettings}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

export default App
