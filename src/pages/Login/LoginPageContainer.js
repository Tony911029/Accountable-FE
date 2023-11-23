import React from "react";
import {AppLayout} from "../../components/AppLayout/AppLayout";
import LoginBlock from "./LoginBlock";
import SignUp from "./SignUp";
import "./Login.css"
import Footer from "../../components/AppLayout/Footer";
import {Redirect} from "react-router-dom";
import {ROOT} from "../../navigation/CONSTANTS";
import {useAuth} from "../../navigation/Auth/ProvideAuth";

export default function LoginPageContainer() {

    const { user} = useAuth()

    // If the user is logged in, don't show the login form
    // TODO: Figure out a better way to do this (it is still rendering the page)
    if (user) {
        return <Redirect to={ROOT}/>
    }

    return (
        <AppLayout>
            <div className={"login-container"}>
                <LoginBlock/>
                <div>--- New user can register here! ---</div>
                <SignUp/>
            </div>
            <Footer/>
        </AppLayout>
    )
}