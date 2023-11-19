import React, { useEffect } from "react";
import { Grid, Typography, Stack, CircularProgress } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { registrationSchema } from "schema/registration";
import { useNavigate } from "react-router-dom";
import { signup } from "store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "components/Alert";

const styles = {
  container: { display: "flex", height: "120vh" },
  formContainer: { width: "100vw", display: "grid", placeItems: "center" },
  stack: { width: "35%" },
  mb1: {
    mb: "1rem",
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
  linksContainer: {
    display: "flex",
    gap: ".5rem",
    alignItems: "center",
    marginTop: "1.5rem !important",
  },
  textColor: {
    color: "#272C39",
  },
  textDecoration: {
    textDecoration: "none",
  },
  textPrimary: {
    color: "primary.main",
  },
};

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requestError, inProgress, user } = useSelector(state => state.auth);

  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    address: "",
    mobile_number: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async values => {
    dispatch(signup(values));
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <Grid container sx={styles.container}>
      <Grid sx={styles.formContainer}>
        <Stack spacing={1.5} sx={styles.stack}>
          <Typography variant="h2" component="h6" sx={styles.mb1}>
            Signup
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={registrationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <Stack spacing={1.5}>
                    <TextInput
                      label="Name"
                      name="name"
                      value={values.name}
                      autoFocus={true}
                    />
                    <TextInput
                      label="User Name"
                      name="username"
                      value={values.username}
                    />
                    <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        value={values.email}
                    />
                    <TextInput
                        label="Mobile Number"
                        name="mobile_number"
                        value={values.mobile_number}
                    />
                    <TextInput
                        label="Address"
                        name="address"
                        value={values.address}
                    />
                    <TextInput
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                    />
                    <TextInput
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                    />
                    <CustomButton
                      variant="contained"
                      type="submit"
                      displayText="Signup"
                      isDisabled={inProgress}
                      icon={
                        inProgress ? (
                          <CircularProgress sx={styles.loader} />
                        ) : null
                      }
                    />
                  </Stack>
                </Form>
              );
            }}
          </Formik>
          {requestError.isError && (
            <AlertMessage
              severity={"error"}
              message={requestError.message}
              styles={styles.alert}
            />
          )}
          <Grid sx={styles.linksContainer}>
            <Typography sx={styles.textColor}>
              Already have an account?
            </Typography>
            <Link to="/" style={styles.textDecoration}>
              <CustomButton
                variant="text"
                styles={styles.textPrimary}
                displayText="Login"
              />
            </Link>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Registration;
