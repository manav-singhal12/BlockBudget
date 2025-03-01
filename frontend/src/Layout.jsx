import React from 'react'
import { Outlet } from 'react-router'
import {ToastContainer} from 'react-toastify'
function Layout() {
  return (
    
    <>
   
     {/* <Header /> */}
     <ToastContainer/>
    <Outlet/>
    {/* <Footer/> */}

    

    </>
  )
}

export default Layout