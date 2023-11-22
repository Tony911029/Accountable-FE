// A wrapper for <Route> that redirects to the login

import React, {createContext, useContext, useMemo, useState} from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

// screen if you're not yet authenticated.
function PrivateRoute({ children, component: Component, redirectPath = "/login", ...rest }) {
    let {user, isLoading, isAuthenticated} = useAuth();

    // if (isLoading){
    //     // TODO: render loading page
    //     return <></>
    // }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    <>{Component ? <Component /> : children}</>
                ) : (
                    <Redirect
                        to={{
                            pathname: redirectPath,
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
export default PrivateRoute;
