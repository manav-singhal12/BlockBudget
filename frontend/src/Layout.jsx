import React from 'react'
import { Outlet } from 'react-router'
import {ToastContainer} from 'react-toastify'
import Home from './pages/Home'
import LeftSideBar from './components/LeftSideBar'
function Layout() {
  return (
    
    <>
    <div className="flex h-screen bg-gray-100">
      <LeftSideBar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <ToastContainer />
        <Outlet />
      </div>
    </div>

    

    </>
  )
}

export default Layout