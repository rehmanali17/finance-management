import React from "react";
import {TextField, MenuItem, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const SelectField = props => {
    const { user } = useSelector(state => state.auth);

    const styles = {
        selectField: {
            "& .MuiInputBase-input": {
                p: ".25rem .75rem",
                color: "#6D7382",
                fontSize: "1rem",
                borderColor: "#E5EBF0",
            },
            ...props.styles,
        },
    };
    return (
        <>
            <Typography variant="p" component="p">
                User
            </Typography>
            <TextField
                select
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                name={props.name}
                sx={styles.selectField}
            >
                {props.options.map((option, index) => (
                    user._id !== option._id && (
                        <MenuItem value={option._id} key={index}>
                            {option.name}
                        </MenuItem>
                    )
                ))}
            </TextField>
        </>
    );
};

SelectField.propTypes = {
    options: PropTypes.array.isRequired,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    styles: PropTypes.object,
};

export default SelectField;
