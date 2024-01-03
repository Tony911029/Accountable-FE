import React, {useContext, useState} from "react";
import {signUp} from "../../navigation/Auth/UserPool";
import {IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Link, useHistory} from "react-router-dom";
import MainButton from "../../components/MainButton";
import {useForm, Controller, set} from 'react-hook-form';
import "./Login.css"
import {Visibility, VisibilityOff} from "@material-ui/icons";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import {List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {passWordCondData} from "./PassWordCondData";
import {CONFIRM_SIGNUP, LOGIN} from "../../navigation/CONSTANTS";
import {useAuth} from "../../navigation/Auth/ProvideAuth";
import ConfirmSignUp from "./ConfirmSignUp";
import {AppLayout} from "../../components/AppLayout/AppLayout";
import Footer from "../../components/AppLayout/Footer";


function CheckIcon() {
    return <BsCheck2/>;
}

function ClearIcon() {
    return <RxCross2/>;
}

function SignUp() {
    const { control, handleSubmit, setError, formState: { errors }, watch} = useForm();
    const [requirements, setRequirements] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitErr, setSubmitErr] = useState("");
    const [isSignUp, setIsSignUp] = useState(false)
    const passwordValue = watch('password', '');
    const [isLoading, setIsLoading] = useState(false)

    const history = useHistory();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const verifyInput = (password) =>{
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;
        setRequirements([
            hasUppercase,
            hasLowercase,
            hasNumber,
            hasSpecialChar,
            hasMinLength,
        ])
    }
    const isValidConfirmPassword = (value) => {
        if (value !== passwordValue) {
            return "* The passwords don't match";
        }
        return true
    };
    const isValidEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value)? true: "* Email is invalid";
    };
    const onSubmit = async (userData) => {
        setIsLoading(true)
        setIsSignUp(false)
        const { userName, email, password, confirmPassword } = userData;
        try {
            // await signUp(userName, email, password)
            setIsLoading(false)
            setIsSignUp(true)
        } catch (err) {
            setSubmitErr("The User name or email is already taken!");
            setIsLoading(false)
            console.log(err)
        }
    }

    return (
        <AppLayout>
            {
                isSignUp ? <ConfirmSignUp/> : (
                    <div className="login-container">
                        <div className="colored-border">
                            <h1>Register</h1>
                            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                                <Controller
                                    name="userName"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: '* User name is required' }}
                                    render={({ field }) => (
                                        <TextField
                                            label="User name" type="text" {...field}
                                            error={!!errors.userName}
                                            helperText={errors.userName?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: '* Email is required',
                                        validate: isValidEmail
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            label="Email"
                                            type="text"
                                            {...field}
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: '* Password is required',}}
                                    render={({ field }) => (
                                        <TextField
                                            label='Password'
                                            variant="outlined"
                                            type={showPassword ? "text" : "password"}
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
                                            {...field}
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            onChange={(e) => {
                                                field.onChange(e); // This is handled by React Hook Form
                                                verifyInput(e.target.value); // Pass the current input value to your verifyInput function
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: '* Confirm password is required',
                                        validate: isValidConfirmPassword,}}
                                    render={({ field }) => (
                                        <TextField
                                            label="Confirm password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...field}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                            error={!!errors.confirmPassword}
                                            helperText={errors.confirmPassword?.message}
                                        />
                                    )}
                                />
                                <div>
                                    <List>
                                        {
                                            passWordCondData.map((item,index) => {
                                                const isGood = requirements[index] ? "good" : "bad"
                                                return(
                                                    <ListItem className={isGood} key={index}>
                                                        <ListItemIcon className={isGood}>{requirements[index] ? <CheckIcon /> : <ClearIcon />}</ListItemIcon>
                                                        <ListItemText primary={item.description} className={isGood}/>
                                                    </ListItem>
                                                )})
                                        }
                                    </List>
                                </div>
                                <MainButton type="submit" btnLabel="Register" isLoading={isLoading}/>
                                {submitErr ? <div className={"bad"}>{submitErr}</div> : <></>}
                            </form>
                        </div>
                    </div>)
            }
            <Footer/>
        </AppLayout>
    );
    }


export default SignUp;