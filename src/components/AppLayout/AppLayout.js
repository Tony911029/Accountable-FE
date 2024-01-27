import React from "react";
import {useState } from "react";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import AppHeader from "./AppHeader";
import Footer from "./Footer";
import "./AppHeader.css"

export function AppLayout({
          children,
          showSubHeader,
          subHeaderLabel ,
          to = '',}) {
    const [isPageAuthorized, setIsPageAuthorized] = useState(true);
    const [isPracticing, setIsPracticing] = useState(false);
    return (
        <div id="pageLayoutWrapper" className={"app-layout"}>
            <CssBaseline />
            <AppHeader
                showSubHeader={showSubHeader}
                subHeaderLabel={subHeaderLabel}
                to={to}
                isPracticing = {isPracticing}
                setIsPracticing={setIsPracticing}
            />
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
