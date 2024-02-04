import React from "react";
import {AppLayout} from "src/components/AppLayout/AppLayout";
import LoginBlock from "./LoginBlock";
import "./Login.css"
import Footer from "../../components/AppLayout/Footer";
import {Redirect, useLocation} from "react-router-dom";
import {useAuth} from "src/navigation/Auth/ProvideAuth";

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
        :<LoadingPage/>
    )
}
