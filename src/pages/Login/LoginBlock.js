import React from "react";
import "./Login.css"
import {TextField} from "@mui/material";
import MainButton from "../../components/MainButton";
import {Link} from "react-router-dom";
function LoginBlock() {
    return (
        <div className="login-container">
            <div className={"colored-border"}>
                <h1>Login</h1>
                <form className="login-form">
                    <TextField
                        id="outlined-name-input"
                        label="Email/Username"
                        type="name"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <Link>Forget Password?</Link>
                    <MainButton type="Login" btnLabel={"Login"}/>
                </form>
            </div>
        </div>
    );
}

export default LoginBlock;
