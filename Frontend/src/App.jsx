import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router'
import AppLayout from './Components/AppLayout'
import Home from "./Pages/Home"
import ReportIncident from "./Pages/ReportIncident"
import LiveAlerts from "./Pages/LiveAlerts"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Login from './Pages/Login'
import Signup from './Pages/Signup'

const router = createBrowserRouter([
  {
    path:"/",
    element:<><AppLayout/></>,
    children:[{
      path:"/",
      element:<><Home/></>
    },{
      path:"/reportIncident",
      element:<><ReportIncident/></>
    },{
      path:"/liveAlerts",
      element:<><LiveAlerts/></>
    },{
      path:"/about",
      element:<><About/></>
    },{
      path:"/contact",
      element:<><Contact/></>
    }]
  },{
    path:"/login",
    element:<><Login/></>
  },{
    path:"/signup",
    element:<><Signup/></>
  }
])

function App() {
  

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
