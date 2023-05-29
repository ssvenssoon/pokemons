import React, { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import axios from "../../axios"
import { useAuth } from "../../contexts/AuthContext"
import "../ProtectedLayout/ProtectedLayout.scss"

export default function DefaultLayout() {
  const { user, setUser } = useAuth()

  useEffect(() => {
    ;(async () => {
      try {
        const resp = await axios.get("/user")
        if (resp.status === 200) {
          setUser(resp.data.data)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  if (!user) {
    return <Navigate to="/" />
  }

  const handleLogout = async () => {
    try {
      const resp = await axios.post("/logout")
      if (resp.status === 200) {
        localStorage.removeItem("user")
        window.location.href = "/"
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <li className="logout-list">
        <a onClick={handleLogout} href="#">
          Logout
        </a>
      </li>
      <main>
        <Outlet />
      </main>
    </>
  )
}
