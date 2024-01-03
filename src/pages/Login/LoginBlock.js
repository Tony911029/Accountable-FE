import React, {useContext, useState} from "react";
import "./Login.css"
import {IconButton, InputAdornment, TextField} from "@mui/material";
import MainButton from "../../components/MainButton";
import {Link, Redirect, Route, useHistory} from "react-router-dom";
import {useAuth} from "../../navigation/Auth/ProvideAuth";
import {ASSIGNMENT, ROOT, SIGNUP} from "../../navigation/CONSTANTS";
import {Controller, useForm} from "react-hook-form";
import {Visibility, VisibilityOff} from "@material-ui/icons";
function LoginBlock() {
    const { control, handleSubmit, setError, formState: { errors }, watch} = useForm();
    const history = useHistory();

    const [signInErr, setSignInErr] = useState("")
    const {signIn, isLoading } = useAuth()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = async (userData) => {
        const { username, password} = userData;
        try {
            await signIn(username, password)
            history.push(ASSIGNMENT)
        } catch (err) {
            console.log(err.message)
            setSignInErr("Invalid credential")
        }
    }




    return (
        <div className="login-container">
            <div className={"colored-border"}>
                <h1>Login</h1>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        rules={{ required: '* User name / Email is required' }}
                        render={({ field }) => (
                        <TextField
                            label="Email/Username"
                            type="text"
                            {...field}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />)}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: '* Password is required' }}
                        render={({ field }) => (
                            <TextField
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                {...field}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                    <Link>Forget Password?</Link>
                    <MainButton type="submit" btnLabel={"Login"} isLoading={isLoading}/>
                    <div className={"flex pl-65"}>
                        <div className={"mr-5"}>Don't have an account? </div><Link to={SIGNUP}>Sign up</Link>
                    </div>

                </form>
                {signInErr? <div className={"bad"}>* The email/user name or password you entered does not exist</div> : <></>}
            </div>
        </div>
    );
}

export default LoginBlock;
