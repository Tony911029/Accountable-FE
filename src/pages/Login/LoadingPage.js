import {PacmanLoader} from "react-spinners";
import React from "react";

export const LoadingPage = () => {
    return (<PacmanLoader
        color="#FF9900"
        size={"5rem"}
        style={{
            position: 'fixed',  // Fixed positioning relative to the viewport
            top: '30%',
            left: '30%',
        }}
    />)
}
