import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
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
    path: "/",
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
