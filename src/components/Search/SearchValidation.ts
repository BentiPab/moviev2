import { object, string } from "yup";

export const searchSchema = object({
    search: string().matches(/^[aA-zZ\s]+$/, 'Value must be alphanumerical')
})