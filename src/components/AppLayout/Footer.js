import React from "react";
import "./AppHeader.css"
import {LuCopyright} from "react-icons/lu";
import {makeStyles} from "tss-react/mui";

function Footer() {

    return (
        <div className="footer">
            <div className={"footerText"}>
                ACCOUNTABLE
            </div>
            <div>
                Copyright <LuCopyright size={'13px'} style={{color: "#0"}}/> 2023 Accountable
            </div>
        </div>
    );
}

export default Footer;
