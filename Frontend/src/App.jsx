import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./Components/AppLayout";
import Home from "./Pages/Home";
import ReportIncident from "./Pages/ReportIncident";
import LiveAlerts from "./Pages/LiveAlerts";
import About from "./Pages/AllReports";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Hero2 from "./Pages/Home2";
import Hero3 from "./Pages/Hero3";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute";
import AllReports from "./Pages/AllReports";
import ModeratorDashboard from "./Pages/ModeratorDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
          <ProtectedRoute>

          <AppLayout />
          </ProtectedRoute>
        
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <Home />
            <Hero2 />
            <Hero3 />
          </>
        ),
      },
      {
        path: "/reportIncident",
        element: (
          <>
            <ReportIncident />
          </>
        ),
      },
      {
        path: "/liveAlerts",
        element: (
          <>
            <LiveAlerts />
          </>
        ),
      },
      {
        path: "/viewReports",
        element: (
          <>
            <AllReports />
          </>
        ),
      },
      {
        path: "/contact",
        element: (
          <>
            <Contact />
          </>
        ),
      },
      {
        path:"/about",
        element:<></>
      },{
        path:"/moderator-dashboard",
        element:<><ModeratorDashboard /></>
      }
    ],
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
