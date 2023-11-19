import React, {useEffect, useState} from "react";
import {Grid, Typography, Stack, CircularProgress} from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import {Link} from "react-router-dom";
import {Form, Formik} from "formik";
import AlertMessage from "components/Alert";
import {transferBalance} from "../../store/authSlice";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import SelectField from "../../components/SelectField";
import {transactionSchema} from "../../schema/transaction";
import {API_URL} from "../../environment/environment";

const styles = {
    container: {display: "flex", height: "100vh"},
    formContainer: {width: "100vw", display: "grid", placeItems: "center"},
    loadingContainer: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
    },
    initialLoader: {
        width: "3rem !important",
        height: "3rem !important",
    },
    stack: {
        width: "50%",
    },
    mb1: {
        mb: "1rem",
    },
    textDecoration: {textDecoration: "none"},
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
    selectField: {
        width: "100%",
        mt: "1rem",
        mb: "3rem",
    },
};

const TransferBalance = () => {
    const dispatch = useDispatch();
    const {requestError, inProgress, user, accessToken, successMessage} = useSelector(state => state.auth);
    const initialValues = {
        amount: null,
        user: ""
    };
    const [allUsers, setAllUsers] = useState([])
    const [userFetchInProgres, setUserFetchInProgress] = useState(true)
    const [userFetchError, setUserFetchError] = useState("")

    const handleFormSubmit = async values => {
        dispatch(transferBalance(values, user._id, accessToken))
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${API_URL}/api/user/list/all`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setUserFetchInProgress(false)
                setAllUsers(response.data.users);
            } catch (error) {
                setUserFetchInProgress(false)
                setUserFetchError(error.response.data.message)
            }
        })()
    }, []);

    return (
        <>
            {userFetchInProgres ? (
                <Grid sx={styles.loadingContainer}>
                    <CircularProgress sx={styles.initialLoader}/>
                </Grid>
            ) : (
                <>
                    <Grid container sx={styles.container}>
                        <Grid sx={styles.formContainer}>
                            <Stack spacing={2.5} sx={styles.stack}>
                                <Typography variant="h3" component="h6" sx={styles.mb1}>
                                    Transfer Balance
                                </Typography>
                                {userFetchError || !allUsers.length ? (
                                    <Grid sx={styles.alertContainer}>
                                        <AlertMessage
                                            severity="error"
                                            message={
                                                userFetchError
                                                    ? userFetchError
                                                    : "No Other Users exists in the records"
                                            }
                                        />
                                    </Grid>
                                ) : (
                                    <>
                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={transactionSchema}
                                            onSubmit={handleFormSubmit}
                                        >
                                            {({values, handleChange, handleBlur}) => {
                                                return (
                                                    <Form>
                                                        <Stack spacing={1.5}>
                                                            <SelectField
                                                                name="user"
                                                                value={values.user}
                                                                label="User"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                styles={styles.selectField}
                                                                options={allUsers}
                                                            />
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
                                                                displayText="Transfer Balance"
                                                                isDisabled={inProgress}
                                                                icon={
                                                                    inProgress ? (
                                                                        <CircularProgress sx={styles.loader}/>
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
                                    </>
                                )}
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
                </>
            )}
        </>
    );
};

export default TransferBalance;
