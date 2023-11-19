import React from "react";
import {useState } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./AppHeader";
import Footer from "./Footer";
import "./AppHeader.css"

export function AppLayout({children,}) {
    const [isPageAuthorized, setIsPageAuthorized] = useState(true);

    return (
        <div id="pageLayoutWrapper" className={"app-layout"}>
            <CssBaseline />
            <AppHeader/>
            <main id="pageContentWrapper" className="main">
                {isPageAuthorized ? children : <></>}
            </main>
            {/*TODO: For some reasons, the footer keep overlapping with the main content*/}
            {/*<Footer/>*/}
        </div>
    );
}

AppLayout.propTypes = {
    window: PropTypes.func,
};
