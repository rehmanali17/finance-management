import React from "react";
import { Grid, Typography, Stack, CircularProgress } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import {balanceSchema} from "../../schema/balance";
import AlertMessage from "components/Alert";
import { updateBalance } from "../../store/authSlice";
import {useDispatch, useSelector} from "react-redux";

const styles = {
    container: { display: "flex", height: "100vh" },
    formContainer: { width: "100vw", display: "grid", placeItems: "center" },
    stack: {
        width: "50%",
    },
    mb1: {
        mb: "1rem",
    },
    textDecoration: { textDecoration: "none" },
    btnContainer: {
        display: "flex",
        justifyContent: "center",
        mt: "2rem",
    },
    textPrimary: {
        color: "primary.main",
    },
    loader: {
        width: "1.25rem !important",
        height: "1.25rem !important",
        mr: "1rem",
    },
    alert: {
        p: "0 .5rem !important",
        boxSizing: "border-box",
    },
};

const WithdrawBalance = () => {
    const dispatch = useDispatch();
    const { requestError, inProgress, user, accessToken, successMessage } = useSelector(state => state.auth);
    const initialValues = {
        amount: null,
    };

    const handleFormSubmit = async values => {
        dispatch(updateBalance(values, 'WITHDRAW', user._id, accessToken))
    };

    return (
        <Grid container sx={styles.container}>
            <Grid sx={styles.formContainer}>
                <Stack spacing={2.5} sx={styles.stack}>
                    <Typography variant="h3" component="h6" sx={styles.mb1}>
                        Withdraw Balance
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={balanceSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ values }) => {
                            return (
                                <Form>
                                    <Stack spacing={1.5}>
                                        <TextInput
                                            label="Amount"
                                            type="number"
                                            name="amount"
                                            value={values.amount}
                                            autoFocus={true}
                                        />
                                        <CustomButton
                                            variant="contained"
                                            type="submit"
                                            displayText="Withdraw Balance"
                                            isDisabled={inProgress}
                                            icon={
                                                inProgress ? (
                                                    <CircularProgress sx={styles.loader} />
                                                ) : null
                                            }
                                        />
                                        {requestError.isError && (
                                            <AlertMessage
                                                severity={"error"}
                                                message={requestError.message}
                                                styles={{
                                                    p: "0 .5rem !important",
                                                    boxSizing: "border-box",
                                                }}
                                            />
                                        )}
                                        {successMessage && (
                                            <AlertMessage
                                                severity={"success"}
                                                message={successMessage}
                                                styles={{
                                                    p: "0 .5rem !important",
                                                    boxSizing: "border-box",
                                                }}
                                            />
                                        )}
                                    </Stack>
                                </Form>
                            );
                        }}
                    </Formik>
                    <Link to="/home" style={styles.textDecoration}>
                        <Grid sx={styles.btnContainer}>
                            <CustomButton
                                variant="text"
                                styles={styles.textPrimary}
                                displayText="Back to Home"
                            />
                        </Grid>
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default WithdrawBalance;
