import React from "react";
import { Alert } from "@mui/material";
import PropTypes from "prop-types";

const AlertMessage = props => {
    const styles = {
        alert: { mt: "1rem !important", width: "100%", ...props.styles },
    };

    return (
        <Alert sx={styles.alert} severity={props.severity}>
            {props.message}
        </Alert>
    );
};

AlertMessage.propTypes = {
    severity: PropTypes.string,
    message: PropTypes.string,
    styles: PropTypes.object,
};

export default AlertMessage;
