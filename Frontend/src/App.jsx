import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./Components/AppLayout";
import Home from "./Pages/Home";
import ReportIncident from "./Pages/ReportIncident";
import LiveAlerts from "./Pages/LiveAlerts";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Hero2 from "./Pages/Home2";
import Hero3 from "./Pages/Hero3";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AppLayout />
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
        path: "/about",
        element: (
          <>
            <About />
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
      <RouterProvider router={router} />
    </>
  );
}

export default App;
