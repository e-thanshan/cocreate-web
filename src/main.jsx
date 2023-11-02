import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
