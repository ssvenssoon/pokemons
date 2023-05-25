import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import GameWrapper from "../../GameWrapper"

export default function GuestLayout() {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/game-wrapper" />
  }

  return (
    <>
      <Outlet />
    </>
  )
}
