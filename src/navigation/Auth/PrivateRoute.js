// A wrapper for <Route> that redirects to the login

import React, { createContext, useContext, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./ProvideAuth";
import {ROOT, ASSIGNMENT, PROGRESS, LEADERBOARD, SIGNUP, LOGIN} from "navigation/CONSTANTS";

// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    let {user, isLoading} = useAuth();
    if (isLoading){
        // TODO: render loading page
        return <></>
    }

    if (!user){
        return <Route to= "/" />
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    <>
                        {children}
                        <br />
                        <div>This is a protected route</div>
                    </>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
export default PrivateRoute;
