import { users } from "@/prisma/generated/prisma-client-js";

//Layouts
export type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

//Pages


//Models
export type User = users;
export type Users = User[];