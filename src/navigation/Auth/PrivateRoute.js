// A wrapper for <Route> that redirects to the login

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./ProvideAuth";

function PrivateRoute({ children, component: Component, redirectPath = "/login", ...rest }) {
    let {user} = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
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
