import React, {useState} from "react";
import {makeStyles} from "tss-react/mui";
import {Link, useHistory} from "react-router-dom";
import MainButton from "src/components/MainButton";
import "./Card.css"


/**
 * Card used in the learning center main page
 *
 * **/
function AssignmentContentCard(
    {children, className, label, title, to, isActive, button=false, buttonText, onClick, wordCount=false, count}
) {

    const useStyles = makeStyles()(() => ({
        card: {
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "700 !important",
            display: "flex",
            flexDirection: "column",
            color: "#FF9900 !important",
            fontSize: "2rem",
            textDecoration: "none !important",
            boxShadow: "0px 10px 30px 0px #FF99004A !important",
            borderRadius: "8px",
            padding: "50px 50px 30px 50px",
            marginBottom: "30px"
        },
        title:{
            fontSize: "2rem",
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "40px"
        },
        footer:{
            fontSize: "1rem",
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
            marginTop: "30px"
        },
    }));


    const { classes } = useStyles();

    const history = useHistory();
    const handleClick = () => {
        if (isActive){
            history.push(to);
        }
    };

    return (
        <div className={classes.card}>
            <div className={classes.title}>
                <div className={"kk"}>{title}</div>
                {button&&<MainButton btnLabel={buttonText} onClick={onClick}/>}
            </div>
            <div className={className}>{children}</div>
            {wordCount && <div className={classes.footer}>{`Word Count: ${count}`}</div>}
        </div>
    );
}

export default AssignmentContentCard;
