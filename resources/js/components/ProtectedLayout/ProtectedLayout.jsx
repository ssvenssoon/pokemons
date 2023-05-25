import React, { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import axios from "../../axios"
import { useAuth } from "../../contexts/AuthContext"

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
      <li>
        <a
          onClick={handleLogout}
          href="#"
          className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        >
          Logout
        </a>
      </li>
      <main className="container flex justify-center flex-col items-center mt-10">
        <Outlet />
      </main>
    </>
  )
}
