import { string } from "yup";

export const searchSchema = string().matches(
  /^[aA-zZ0-9\s]+$/,
  "Value must be alphanumerical"
);

export const validateSearch = (search: string) => searchSchema.validate(search);
