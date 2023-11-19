import React, { useEffect } from "react";
import { Grid, Typography, Stack, CircularProgress } from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
import Hero from "components/Hero";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { loginSchema } from "schema/login";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/authSlice";
import AlertMessage from "components/Alert";

const styles = {
  container: { display: "flex", height: "100vh" },
  formContainer: { width: "50vw", display: "grid", placeItems: "center" },
  stackWidth: { width: "70%" },
  mb: { mb: "1rem" },
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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1.5rem !important",
  },
  newAccountLinkContainer: {
    display: "flex",
    gap: ".5rem",
    alignItems: "center",
  },
  noAccountTextColor: {
    color: "#272C39",
  },
  textDecoration: {
    textDecoration: "none",
  },
  textPrimary: {
    color: "primary.main",
  },
  textDanger: {
    color: "red",
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requestError, inProgress, user } = useSelector(state => state.auth);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleFormSubmit = values => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <Grid container sx={styles.container}>
      <Hero />
      <Grid sx={styles.formContainer}>
        <Stack spacing={1.5} sx={styles.stackWidth}>
          <Typography variant="h2" component="h6" sx={styles.mb1}>
            Login
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <Stack spacing={1}>
                    <TextInput
                      label="Email"
                      name="email"
                      value={values.email}
                      autoFocus={true}
                    />
                    <TextInput
                      label="Password"
                      name="password"
                      type="password"
                      value={values.password}
                    />
                    <CustomButton
                      variant="contained"
                      type="submit"
                      displayText="Login"
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
            <Grid sx={styles.newAccountLinkContainer}>
              <Typography sx={styles.noAccountTextColor}>
                Don&apos;t have an account?
              </Typography>
              <Link to="/signup" style={styles.textDecoration}>
                <CustomButton
                  variant="text"
                  styles={styles.textPrimary}
                  displayText="Signup"
                />
              </Link>
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;
