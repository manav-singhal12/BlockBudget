import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store.js';
import Dashboard from './pages/Dashboard.jsx';
import Register from './pages/Register.jsx';
import Layout from './Layout.jsx';
import Login from './pages/Login.jsx';
import UpdateProfile from './components/UpdateProfile.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path='register' element={<Register />}/>
      <Route path='login' element={<Login />}/>
      <Route path="dashboard" element={<Dashboard />}/>
      <Route path="/update-profile" element={<UpdateProfile />} />

    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App/>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
