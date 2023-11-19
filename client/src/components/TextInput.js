import React from "react";
import { Grid, TextField, Typography, InputLabel } from "@mui/material";
import { useField } from "formik";
import PropTypes from "prop-types";

const TextInput = ({ label, styles: propStyles, ...props }) => {
  const [field, meta] = useField(props);
  const styles = {
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    textInput: {
      "& .MuiInputBase-input": {
        p: ".5rem .75rem",
        color: "#6D7382",
        fontSize: "1rem",
        borderColor: "#E5EBF0",
        ...propStyles,
      },
    },
    alert: {
      alignSelf: "flex-end",
      position: "relative",
      top: "-.125rem",
      fontSize: ".75rem",
      fontWeight: "bold",
      color: "red",
      opacity: meta.error && meta.touched ? 1 : 0,
    },
  };
  return (
    <Grid sx={styles.inputContainer}>
      <InputLabel>{label}</InputLabel>
      <TextField
        fullWidth
        sx={styles.textInput}
        variant="outlined"
        {...field}
        {...props}
      />
      <Typography sx={styles.alert}>{meta.error || "Erronous text"}</Typography>
    </Grid>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  styles: PropTypes.object,
};

export default TextInput;
