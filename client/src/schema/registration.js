import { object, string, ref } from "yup";

export const registrationSchema = object({
    name: string()
        .required("Name is required")
        .matches(/^[a-zA-z ]+$/, "Please enter a valid name"),
    username: string().required("User Name is required"),
    address: string().required("Address is required"),
    mobile_number: string().required("Mobile Number is required"),
    email: string().required("Email is required").email("Please enter a valid email"),
    password: string()
        .required("Password is required")
        .min(6, "Password should be atleast 6 characters"),
    confirmPassword: string()
        .required("Confirm Password is required")
        .oneOf([ref("password")], "Passwords don't match"),
});
