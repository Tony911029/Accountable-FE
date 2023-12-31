import React, {useEffect} from "react";
import {AppLayout} from "../../components/AppLayout/AppLayout";
import LoginBlock from "./LoginBlock";
import SignUp from "./SignUp";
import "./Login.css"
import Footer from "../../components/AppLayout/Footer";
import {Redirect, useLocation} from "react-router-dom";
import {ROOT} from "../../navigation/CONSTANTS";
import {useAuth} from "../../navigation/Auth/ProvideAuth";
import {PacmanLoader} from "react-spinners";

export default function LoginPageContainer() {
    const { user, isLoading} = useAuth()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (user) {
        return <Redirect to={from} />;
    }

    return (
        !isLoading
        ?<AppLayout>
            <div className={"login-container"}>
                <LoginBlock/>
            </div>
            <Footer/>
        </AppLayout>
        :<PacmanLoader
            color="#FF9900"
            size={"5rem"}
            style={{
                position: 'fixed',  // Fixed positioning relative to the viewport
                top: '30%',
                left: '30%',
            }}
        />
    )
}
