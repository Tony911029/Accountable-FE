import React from "react";
import {useContext, useState} from "react"
import {AuthContext} from "../../navigation/Auth/ProvideAuth";
import {Route} from "react-router-dom";
import {AppLayout} from "../../components/AppLayout/AppLayout";
import LoginBlock from "./LoginBlock";
import SignUp from "./SignUp";
import "./Login.css"
import Footer from "../../components/AppLayout/Footer";

export default function LoginPageContainer() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")


    const { user, signIn } = useContext(AuthContext)
    //
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     setError("")
    //
    //     try {
    //         // We're not calling the context signIn function to update the user data in the context.
    //         // This will trigger a re-render of any components that use the useContext hook.
    //         await signIn(username, password)
    //         // TODO: Redirect to the app's main page or dashboard
    //     } catch (err) {
    //         setError(err.message)
    //     }
    // }
    //
    //
    // // TODO: If the user is logged in, redirect them to somewhere else
    // if (user) {
    //     // Redirect to the profile page
    //     return <Route to="/profile" />
    // }

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