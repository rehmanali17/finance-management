import React from "react";
import {
  Grid,
  Typography,
  Stack,
  CircularProgress,
  Divider,
} from "@mui/material";
import TextInput from "components/TextInput";
import CustomButton from "components/Button";
// import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "store/authSlice";
import AlertMessage from "components/Alert";
import {userProfileSchema} from "../../schema/userProfile";
import {Link} from "react-router-dom";

const styles = {
  container: { display: "flex", height: "100vh" },
};

const EditProfile = () => {
  const dispatch = useDispatch();
  const { requestError, inProgress, user, accessToken, successMessage } = useSelector(state => state.auth);

  const initialValues = {
    name: user.name,
    username: user.username,
    password: "",
    address: user.address,
    mobile_number: user.mobile_number,
    confirmPassword: "",
  };

  const handleFormSubmit = values => {
    dispatch(updateProfile(values, user, accessToken));
  };

  return (
    <Grid container sx={styles.container}>
      <Grid
        sx={{
          width: "100vw",
          display: "grid",
          justifyItems: "center",
          margin: "3rem 0",
        }}
      >
        <Stack spacing={1} width="50%">
          <Typography
            variant="h2"
            component="h6"
            sx={{ color: "primary.main", mb: ".5rem" }}
          >
            Edit Profile
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={userProfileSchema}
            onSubmit={handleFormSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <Stack spacing={1}>
                    <Grid>
                      <Grid mb="1.5rem !important">
                        <Typography
                          variant="h5"
                          component="p"
                          sx={{
                            color: "primary.main",
                          }}
                        >
                          User Information
                        </Typography>
                        <Divider />
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          label="Name"
                          name="name"
                          value={values.name}
                          autoFocus={true}
                          styles={{
                            width: "22vw",
                          }}
                        />
                        <TextInput
                          label="Username"
                          name="username"
                          value={values.username}
                          styles={{
                            width: "22vw",
                          }}
                        />
                      </Grid>
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          label="Mobile Number"
                          name="mobile_number"
                          type="text"
                          value={values.mobile_number}
                          styles={{
                            width: "22vw",
                          }}
                        />
                        <TextInput
                          label="Address"
                          name="address"
                          type="text"
                          value={values.address}
                          styles={{
                            width: "22vw",
                          }}
                        />
                      </Grid>
                      <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        styles={{
                          width: "22vw",
                        }}
                      />
                      <TextInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        styles={{
                          width: "22vw",
                        }}
                      />
                    </Grid>
                    <CustomButton
                      variant="contained"
                      type="submit"
                      displayText="Update Profile"
                      isDisabled={inProgress}
                      icon={
                        inProgress ? (
                          <CircularProgress
                            sx={{
                              width: "1.25rem !important",
                              height: "1.25rem !important",
                              mr: "1rem",
                            }}
                          />
                        ) : null
                      }
                    />
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
      </Grid>
    </Grid>
  );
};

export default EditProfile;
