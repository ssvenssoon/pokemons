import { createBrowserRouter } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import ProtectedLayout from "./components/ProtectedLayout/ProtectedLayout"
import GuestLayout from "./components/GuestLayout/GuestLayout"
import GameWrapper from "./GameWrapper"

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        path: "/game-wrapper",
        element: <GameWrapper />
      }
    ]
  }
])

export default router
