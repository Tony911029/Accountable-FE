import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom";
import {SidebarData} from "./SideBarData";
import './AppHeader.css'
import {Button} from "@material-ui/core";
import { CgProfile } from "react-icons/cg";
import {makeStyles} from "tss-react/mui";
import {LOGIN, ROOT} from "../../navigation/CONSTANTS";

function AppHeader(){
    let iconStyles = { backgroundColor: "FF9900", color: "#fff", fontSize: "1.2rem", borderRadius: '50%'};

    const history = useHistory();
    const handleLogin = () => {
        history.push(LOGIN);
    };

    const useStyles = makeStyles()(() => ({
        customButton: {
            backgroundColor: '#fff',
            textTransform: 'none',
            fontFamily: 'Poppins, sans-serif',
        },
    }));

    const {classes} = useStyles();
    return (
        <nav className="nav">
            <div className="site-title">
                <Link to={ROOT}>
                    ACCOUNTABLE
                </Link>
            </div>
            <div className="header-tabs">
                <ul>
                    {SidebarData.filter(item=>item.isMain).map((item, index) =>{
                        return (
                            <li key={index}
                                className={item.cName}>
                                <Link to={item.path} >
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <Button
                    classes={classes.customButton}
                    startIcon={<CgProfile style={iconStyles}/>}
                    variant="contained"
                    onClick={handleLogin}
                >
                    Login/Register
                </Button>
            </div>
        </nav>
    )
}

export default AppHeader