import * as yup from 'yup';

export const userSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
});

export const userWithProfile = yup.object({
    email: yup.string().email().required(),
    phone: yup.string(),
    first_name: yup.string().min(2),
    last_name: yup.string().min(2),
});

export type SignUpUser = yup.InferType<typeof userSchema>;
export type EditUser = yup.InferType<typeof userWithProfile>;