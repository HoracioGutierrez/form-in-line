"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { nanoid } from 'nanoid';

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  supabase.auth.updateUser({ data: { role: "admin" } })
  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Gracias por registrarte! Por favor, revisa tu correo para un enlace de verificación.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/dashboard");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export interface Space {
  id: string;
  created_at: string;
  name: string;
  subject: string | null;
  slug: string;
  user_id: string;
  is_active: boolean;
  activated_at: string | null;
}

export async function createSpace({ 
  name, 
  subject, 
  userId 
}: { 
  name: string; 
  subject?: string; 
  userId: string;
}) {
  const supabase = await createClient();
  
  // Create a random slug (URL-friendly ID)
  const slug = nanoid(10);
  
  const { error } = await supabase
    .from('spaces')
    .insert({
      name,
      subject: subject || null,
      slug,
      user_id: userId,
      is_active: false,
    });

  if (error) {
    console.error('Error creating space:', error);
    throw new Error('Failed to create space');
  }

  revalidatePath('/dashboard');
  return { success: true };
}

export async function getUserSpaces(userId: string): Promise<Space[]> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('spaces')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching spaces:', error);
    throw new Error('Failed to fetch spaces');
  }
  
  return data as Space[];
}

export async function toggleSpaceStatus(spaceId: string, isActive: boolean) {
  const supabase = await createClient();
  
  const updates: any = { is_active: isActive };
  
  // If activating the space, set the activated_at timestamp
  if (isActive) {
    updates.activated_at = new Date().toISOString();
  }
  
  const { error } = await supabase
    .from('spaces')
    .update(updates)
    .eq('id', spaceId);
  
  if (error) {
    console.error('Error updating space status:', error);
    throw new Error('Failed to update space status');
  }
  
  revalidatePath('/dashboard');
  return { success: true };
}
