import { object, number } from "yup";

export const balanceSchema = object({
    amount: number()
        .required("Amount is required"),
});
