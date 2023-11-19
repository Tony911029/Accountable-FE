import React from "react";
import {useState } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

export function AppLayout({children,}) {
    const [isPageAuthorized, setIsPageAuthorized] = useState(true);

    return (
        <div id="pageLayoutWrapper" >
            <CssBaseline />
            <AppHeader/>
            <main id="pageContentWrapper" className="main">
                {isPageAuthorized ? children : <></>}
            </main>
            <Footer/>
        </div>
    );
}

AppLayout.propTypes = {
    window: PropTypes.func,
};
