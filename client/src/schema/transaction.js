import { object, number, string } from "yup";

export const transactionSchema = object({
    amount: number()
        .required("Amount is required"),
    user: string()
        .required("Please select a user")
});
