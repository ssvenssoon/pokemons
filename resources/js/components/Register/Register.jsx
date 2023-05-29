import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "../../axios"
import { useAuth } from "../../contexts/AuthContext"
import "../Register/Register.scss"

export default function Register() {
  const { setUser } = useAuth()
  const [nameError, setNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { name, email, password, cpassword } = e.target.elements
    const body = {
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: cpassword.value
    }
    try {
      const resp = await axios.post("auth/register", body)
      if (resp.status === 200) {
        setUser(resp.data.user)
        return <Navigate to="/game-wrapper" />
      }
    } catch (error) {
      if (error.response.status === 422) {
        if (error.response.data.errors.name) {
          setNameError(error.response.data.errors.name[0])
        } else {
          setNameError("")
        }
        if (error.response.data.errors.email) {
          setEmailError(error.response.data.errors.email[0])
        } else {
          setEmailError("")
        }
        if (error.response.data.errors.password) {
          setPasswordError(error.response.data.errors.password[0])
        } else {
          setPasswordError("")
        }
      }
    }
  }

  return (
    <div className="login-form-wrapper">
      <form class="login-form" action="#" method="post" onSubmit={handleSubmit}>
        <div class="flex-row">
          <label class="lf--label" for="username">
            <svg x="0px" y="0px" width="12px" height="13px">
              <path
                fill="#B1B7C4"
                d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"
              />
            </svg>
          </label>
          <input class="lf--input name" type="text" name="name" id="name" placeholder="Jhone Doe" required />
        </div>
        {nameError && <p className="input-error">{nameError}</p>}
        <div class="flex-row">
          <label class="lf--label" for="email">
            <svg x="0px" y="0px" width="12px" height="13px">
              <path
                fill="#B1B7C4"
                d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"
              />
            </svg>
          </label>
          <input class="lf--input" type="email" name="email" id="email" placeholder="name@example.com" required />
        </div>
        {emailError && <p className="input-error">{emailError}</p>}
        <div class="flex-row">
          <label class="lf--label" for="password">
            <svg x="0px" y="0px" width="15px" height="5px">
              <g>
                <path
                  fill="#B1B7C4"
                  d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
                />
              </g>
            </svg>
          </label>
          <input class="lf--input" type="password" name="password" id="password" placeholder="••••••••" required />
        </div>
        {passwordError && <p className="input-error">{passwordError}</p>}
        <div class="flex-row">
          <label class="lf--label" for="password">
            <svg x="0px" y="0px" width="15px" height="5px">
              <g>
                <path
                  fill="#B1B7C4"
                  d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
                />
              </g>
            </svg>
          </label>
          <input class="lf--input" type="password" name="cpassword" id="cpassword" placeholder="••••••••" required />
        </div>
        <button class="lf--submit" type="submit">
          Register
        </button>
        <p className="switch-to-login-or-sign-up">
          Already have an account? <Link to="/">Log in</Link>
        </p>
      </form>
    </div>
  )
}
