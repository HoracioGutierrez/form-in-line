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

export const spaceSchema = yup.object({
    name: yup.string().required(),
    subject: yup.string().optional(),
    slug: yup.string().required(),
});

export type SignUpUser = yup.InferType<typeof userSchema>;
export type EditUser = yup.InferType<typeof userWithProfile>;
export type CreateSpace = yup.InferType<typeof spaceSchema>;