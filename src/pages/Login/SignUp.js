import React, { useState } from "react";
import {signUp} from "../../navigation/Auth/UserPool";
import {TextField} from "@mui/material";
import {Link} from "react-router-dom";
import MainButton from "../../components/MainButton";
import "./Login.css"


function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await signUp(username, email, password)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    }
  }

  if (success) {
    return (
        <div>
          <h2>SignUp successful!</h2>
          <p>Please check your email for the confirmation code.</p>
        </div>
    )
  }

  return (
      //TODO: Figure out all the type for text boxes
    <div className="login-container">
        <div className={"colored-border"}>
            <h1>Register</h1>
            <form className="login-form">
                <TextField
                    id="outlined-name-input"
                    label="First name"
                    type="name"
                />
                <TextField
                    id="outlined-password-input"
                    label="Last name"
                    type="name"
                    autoComplete="current-password"
                />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                />
                <TextField
                id="outlined-password-input"
                label="Confirm password"
                type="password"
            />
                <MainButton type="Login" btnLabel={"Register"}/>
            </form>
        </div>
    </div>
    );
}


export default SignUp;