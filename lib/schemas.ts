import { getI18n } from '@/locales/server';
import * as yup from 'yup';

const t = getI18n()

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
    name: yup.string().required("The space name is required").min(2, "The name is too short. It should be at least 2 characters long"),
    subject: yup.string().optional(),
    slug: yup.string().required("The space URL is required").min(2, "The slug for the space URL is too short. It should be at least 2 characters long").matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "The slug for the space URL can only contain lowercase letters, numbers, and hyphens"),
});

export type SignUpUser = yup.InferType<typeof userSchema>;
export type EditUser = yup.InferType<typeof userWithProfile>;
export type CreateSpace = yup.InferType<typeof spaceSchema>;