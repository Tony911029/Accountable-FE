import React from "react"
import { CircularProgress } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import {Button} from "@material-ui/core";

const useStyles = makeStyles()(() => ({
    mainButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 20px",
        whiteSpace: "pre",
        boxShadow: " 0px 2px 2px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px",
        "&:hover": {
            boxShadow: " 0px 5px 5px rgba(0, 0, 0, 0.3)",
        },
        background: "#74A3F8FF !important",
        backgroundColor: "#74a3f8"
    },
}));

function MainButton({
                        width,
                        isLoading,
                        style,
                        isSaved,
                        type,
                        disabled,
                        onClick,
                        onMouseDown,
                        btnLabel,
                        id,
                        isLabelCapitalize = true,
                        ariaExpanded = false,
                        ...props
                    }) {
    const { classes } = useStyles();
    return (
        <Button
            type={type}
            style={style}
            id={id}
            onMouseDown={onMouseDown}
            disabled={disabled || isLoading}
            className={
                isLabelCapitalize
                    ? classes.mainButton
                    : `${classes.mainButton} noCapitalize`
            }
            onClick={onClick ? onClick : () => {}}
            aria-expanded={ariaExpanded ? "true" : undefined}
            {...props}
        >
            {isLoading ? (
                <span
                    style={{
                        marginRight: "10px",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
          {" "}
                    <CircularProgress
                        size={15}
                        style={{
                            marginRight: "10px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    />{" "}
                    {"Saving"}
        </span>
            ) : isSaved ? (
                "Saved"
            ) : (
                btnLabel
            )}
        </Button>
    );
}

export default MainButton;
