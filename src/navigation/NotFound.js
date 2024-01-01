import React from "react";
import {AppLayout} from "../components/AppLayout/AppLayout";
import Footer from "../components/AppLayout/Footer";
import "./NotFound.css"
import MainButton from "../components/MainButton";
import {useHistory} from "react-router-dom";

export const NotFound = () => {
    const history = useHistory();
    let handleGoHome = () =>{
        history.push("/")
    }

    return (
    <AppLayout>
        <div className={"not-found"}>
            <h1>404</h1>
            <h2>Oops!</h2>
            <h2>Page Not Found</h2>
            <div>Page you are trying to access could not be found</div>
            <MainButton btnLabel={"GO HOME"} onClick={handleGoHome}/>
        </div>
        <Footer/>
    </AppLayout>
    );
};
