import React from "react";
import "./AppHeader.css"
import {LuCopyright} from "react-icons/lu";
import {makeStyles} from "tss-react/mui";

function Footer() {

    return (
        <footer className="footer">
            <hr className={"full-w hl"}/>
            <div className={"footerText"}>
                ACCOUNTABLE
            </div>
            <div className={"cpy-right"}>
                Copyright <LuCopyright size={'13px'} style={{color: "#0"}}/> 2023 Accountable
            </div>
        </footer>
    );
}

export default Footer;
