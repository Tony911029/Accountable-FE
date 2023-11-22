import React, {useContext, useState} from "react";
import "./Login.css"
import {TextField} from "@mui/material";
import MainButton from "../../components/MainButton";
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../navigation/Auth/ProvideAuth";
import {ASSIGNMENT} from "../../navigation/CONSTANTS";
function LoginBlock() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const history = useHistory();
    const { user, signIn } = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            await signIn(username, password)
        } catch (err) {
            setError(err.message)
        }
    }

    // If the user is logged in, don't show the login form
    if (user) {
        history.push(ASSIGNMENT)
    }

    return (
        <div className="login-container">
            <div className={"colored-border"}>
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <TextField
                        label="Email/Username"
                        type="text"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Link>Forget Password?</Link>
                    <MainButton type="submit" btnLabel={"Login"}/>
                </form>
            </div>
        </div>
    );
}

export default LoginBlock;
