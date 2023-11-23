import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom";
import {SidebarData} from "./SideBarData";
import './AppHeader.css'
import {Button} from "@material-ui/core";
import { CgProfile } from "react-icons/cg";
import {makeStyles} from "tss-react/mui";
import {LOGIN, ROOT} from "../../navigation/CONSTANTS";
import {useAuth} from "../../navigation/Auth/ProvideAuth";
import { MdLogout } from "react-icons/md";

function AppHeader(){
    let iconStyles = { backgroundColor: "FF9900", color: "#fff", fontSize: "1.2rem", borderRadius: '50%'};
    const {user, signOut} = useAuth()
    const history = useHistory();
    const handleLogin = () => {
        history.push(LOGIN);
    };


    const handleSignOut = () => {
        signOut()
    };

    const [profile, setProfile] = useState(false)
    const toggleProfile = () => setProfile(!profile)

    const useStyles = makeStyles()(() => ({
        customButton: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 20px",
            whiteSpace: "pre",
            boxShadow: " 0px 2px 2px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            "&:hover": {
                boxShadow: "0px 10px 30px 0px #FF99004A !important",
            },
            background: "#FFF !important",
            fontFamily: 'Poppins, sans-serif !important',
            fontWeight: "700 !important",
        },
    }));

    const {classes} = useStyles();

    const loginButton = (
        <Button
            className={classes.customButton}
            startIcon={<CgProfile style={iconStyles}/>}
            onClick={handleLogin}
        >
            Login/Register
        </Button>
    )


    const profileDropDown= (
        // TODO: Fixed the username overflow
        <ul className={"dropDownProfile"}>
            <li
                 onClick={toggleProfile}>
                <CgProfile style={iconStyles} size={"1.7rem"}/> Hello, Tony123
            </li>
            <li className={profile ? "" : "hideDropDown"}
                onClick={toggleProfile}>
                <CgProfile style={iconStyles} size={"1.7rem"}/> My Account
            </li>
            <li className={profile ? "" : "hideDropDown"}
                onClick={handleSignOut}>
                <MdLogout style={iconStyles} size={"1.7rem"}/> Log Out
            </li>
        </ul>
    )

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
                {user? profileDropDown: loginButton}
            </div>
        </nav>
    )
}

export default AppHeader