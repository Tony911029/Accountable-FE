import TextField from "@mui/material/TextField";
import { makeStyles } from "tss-react/mui";

function TextBox({
  variant = "outlined",
  value,
  onChange,
  fullWidth,
  ...props
}) {
  const useStyles = makeStyles()(() => ({
    customBox: {
      // TODO: make the border when selected not blue
      fontWeight: "700 !important",
      boxShadow: "0px 10px 30px 0px #FF99004A !important",
      borderRadius: "8px",
      width: "100%",

      "& .MuiInputBase-input": {
        fontSize: "2rem",
      },

      "& .MuiFilledInput-input": {
        fontSize: "2rem", // Adjust the font size as needed
      },

      "& .MuiInput-input": {
        fontSize: "2rem", // Adjust the font size as needed
      },
    },
  }));

  const { classes } = useStyles();

  return (
    <TextField
      {...props}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      className={classes.customBox}
      autoComplete={props.autoComplete || "off"}
    />
  );
}

export default TextBox;
