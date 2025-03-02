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

export interface QueueUser {
  id: string;
  user_id: string;
  space_id: string;
  message: string | null;
  position: number;
  is_paused: boolean;
  is_current_speaker: boolean;
  joined_at: string;
  started_speaking_at: string | null;
  total_speaking_time: number;
  email: string | null;
  full_name: string | null;
}

export interface SpaceWithUser extends Space {
  user: {
    email: string;
    full_name: string | null;
  } | null;
  active_since: string | null;
  is_owner: boolean;
}

export async function getSpaceBySlug(slug: string, userId: string): Promise<SpaceWithUser | null> {
  const supabase = await createClient();

  const { data: space, error: spaceError } = await supabase
    .from('spaces')
    .select('*')
    .eq('slug', slug)
    .single();

  if (space) {
    // Fetch user separately
    const { data: user, error: userError } = await supabase
      .from('auth.users')
      .select(`
        email,
        user_profiles(full_name)
      `)
      .eq('id', space.user_id)
      .single();

    if (user) {
      space.user = {
        email: user.email,
        full_name: user.user_profiles?.[0]?.full_name || null
      };
    }
  }

  if (spaceError || !space) {
    console.error('Error fetching space:', spaceError);
    return null;
  }

  // Flatten user data
  const spaceWithUser = {
    ...space,
    user: space.user ? {
      email: space.user.email,
      full_name: space.user.user_profiles?.[0]?.full_name || null
    } : null,
    is_owner: space.user_id === userId,
    active_since: space.activated_at
  };

  return spaceWithUser as SpaceWithUser;
}

export async function getQueueForSpace(spaceId: string): Promise<QueueUser[]> {
  const supabase = await createClient();

  // First, get the queue entries
  const { data: queueEntries, error: queueError } = await supabase
    .from('queue')
    .select('*')
    .eq('space_id', spaceId)
    .order('position', { ascending: true });

  if (queueError || !queueEntries) {
    console.error('Error fetching queue:', queueError);
    return [];
  }

  // Then fetch user data for each queue entry
  const queueUsers = await Promise.all(queueEntries.map(async (item) => {
    // Get user data for this queue entry
    const { data: user, error: userError } = await supabase
      .from('user_profiles_view')
      .select(`
        email,
        full_name
      `)
      .eq('id', item.user_id)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
      return {
        ...item,
        email: null,
        full_name: null
      };
    }

    return {
      ...item,
      email: user?.email || null,
      full_name: user?.user_profiles?.[0]?.full_name || null
    };
  }));

  return queueUsers as QueueUser[];
}

export async function joinQueue(spaceId: string, userId: string, message?: string) {
  const supabase = await createClient();

  // Get the current highest position
  const { data: maxPositionData, error: posError } = await supabase
    .from('queue')
    .select('position')
    .eq('space_id', spaceId)
    .order('position', { ascending: false })
    .limit(1);

  if (posError) {
    console.error('Error getting max position:', posError);
    throw new Error('Failed to join queue');
  }

  const nextPosition = maxPositionData.length > 0 ? maxPositionData[0].position + 1 : 1;

  // Check if user is already in the queue
  const { data: existingUser, error: checkError } = await supabase
    .from('queue')
    .select('id')
    .eq('space_id', spaceId)
    .eq('user_id', userId);

  if (checkError) {
    console.error('Error checking queue:', checkError);
    throw new Error('Failed to join queue');
  }

  if (existingUser.length > 0) {
    // User is already in queue, update their message if provided
    if (message) {
      const { error: updateError } = await supabase
        .from('queue')
        .update({ message })
        .eq('space_id', spaceId)
        .eq('user_id', userId);

      if (updateError) {
        console.error('Error updating queue message:', updateError);
        throw new Error('Failed to update message');
      }
    }
    return { success: true, alreadyInQueue: true };
  }

  // Add user to the queue
  const { error } = await supabase
    .from('queue')
    .insert({
      space_id: spaceId,
      user_id: userId,
      message: message || null,
      position: nextPosition,
      is_paused: false,
      is_current_speaker: nextPosition === 1 && maxPositionData.length === 0
    });

  if (error) {
    console.error('Error joining queue:', error);
    throw new Error('Failed to join queue');
  }

  revalidatePath(`/spaces/${spaceId}`);
  return { success: true, alreadyInQueue: false };
}

export async function leaveQueue(queueId: string, spaceId: string) {
  const supabase = await createClient();

  // Get the current entry to check if it's the current speaker
  const { data: entry, error: getError } = await supabase
    .from('queue')
    .select('position, is_current_speaker')
    .eq('id', queueId)
    .single();

  if (getError) {
    console.error('Error getting queue entry:', getError);
    throw new Error('Failed to leave queue');
  }

  // Delete the entry
  const { error } = await supabase
    .from('queue')
    .delete()
    .eq('id', queueId);

  if (error) {
    console.error('Error leaving queue:', error);
    throw new Error('Failed to leave queue');
  }

  // If this was the current speaker, promote the next in line
  if (entry.is_current_speaker) {
    await promoteNextInLine(spaceId);
  }

  // Reorder positions for remaining entries
  await reorderQueuePositions(spaceId);

  revalidatePath(`/spaces/${spaceId}`);
  return { success: true };
}

export async function togglePauseStatus(queueId: string, spaceId: string, isPaused: boolean) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('queue')
    .update({ is_paused: isPaused })
    .eq('id', queueId);

  if (error) {
    console.error('Error updating pause status:', error);
    throw new Error('Failed to update pause status');
  }

  revalidatePath(`/spaces/${spaceId}`);
  return { success: true };
}

export async function promoteNextSpeaker(currentSpeakerId: string, spaceId: string) {
  const supabase = await createClient();

  // End current speaker's session and record time
  const { data: currentSpeaker, error: csError } = await supabase
    .from('queue')
    .select('started_speaking_at')
    .eq('id', currentSpeakerId)
    .single();

  if (!csError && currentSpeaker.started_speaking_at) {
    const startedAt = new Date(currentSpeaker.started_speaking_at);
    const endedAt = new Date();
    const speakingTimeSeconds = Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000);

    await supabase
      .from('queue')
      .update({
        is_current_speaker: false,
        total_speaking_time: speakingTimeSeconds
      })
      .eq('id', currentSpeakerId);

    // Remove from queue
    await leaveQueue(currentSpeakerId, spaceId);
  }

  // Find and promote the next available speaker
  return await promoteNextInLine(spaceId);
}

// Make promoteNextInLine available as an exported function
export async function promoteNextInLine(spaceId: string) {
  const supabase = await createClient();

  // Find the next non-paused user in the queue
  const { data: nextSpeaker, error: nsError } = await supabase
    .from('queue')
    .select('id')
    .eq('space_id', spaceId)
    .eq('is_paused', false)
    .order('position', { ascending: true })
    .limit(1);

  if (nsError || nextSpeaker.length === 0) {
    console.log('No next speaker available');
    return { success: true, nextSpeakerId: null };
  }

  // Update this user to be the current speaker
  const { error } = await supabase
    .from('queue')
    .update({
      is_current_speaker: true,
      started_speaking_at: new Date().toISOString()
    })
    .eq('id', nextSpeaker[0].id);

  if (error) {
    console.error('Error promoting next speaker:', error);
    throw new Error('Failed to promote next speaker');
  }

  revalidatePath(`/spaces/${spaceId}`);
  return { success: true, nextSpeakerId: nextSpeaker[0].id };
}

// Helper function to promote the next in line
async function _promoteNextInLine(spaceId: string) {
  return promoteNextInLine(spaceId);
}

// Helper function to reorder positions after removal
async function reorderQueuePositions(spaceId: string) {
  const supabase = await createClient();

  // Get all remaining entries ordered by position
  const { data: entries, error: getError } = await supabase
    .from('queue')
    .select('id')
    .eq('space_id', spaceId)
    .order('position', { ascending: true });

  if (getError) {
    console.error('Error fetching queue entries:', getError);
    return;
  }

  // Update positions
  for (let i = 0; i < entries.length; i++) {
    await supabase
      .from('queue')
      .update({ position: i + 1 })
      .eq('id', entries[i].id);
  }
}

// When a space is deactivated, remove all users from the queue
export async function clearQueueOnDeactivation(spaceId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('queue')
    .delete()
    .eq('space_id', spaceId);

  if (error) {
    console.error('Error clearing queue:', error);
    throw new Error('Failed to clear queue');
  }

  return { success: true };
}

// Extend the toggleSpaceStatus function to handle queue clearing
export async function toggleSpaceStatus(spaceId: string, isActive: boolean) {
  const supabase = await createClient();

  const updates: any = { is_active: isActive };

  // If activating the space, set the activated_at timestamp
  if (isActive) {
    updates.activated_at = new Date().toISOString();

    // Create a new session record
    await supabase
      .from('space_sessions')
      .insert({
        space_id: spaceId,
        activated_by: (await supabase.auth.getUser()).data.user?.id,
        activated_at: updates.activated_at
      });
  } else {
    // If deactivating, clear the queue
    await clearQueueOnDeactivation(spaceId);

    // Update the session record
    const { data: session, error: sessionError } = await supabase
      .from('space_sessions')
      .select('id')
      .eq('space_id', spaceId)
      .is('deactivated_at', null)
      .order('activated_at', { ascending: false })
      .limit(1);

    if (!sessionError && session.length > 0) {
      await supabase
        .from('space_sessions')
        .update({
          deactivated_at: new Date().toISOString()
        })
        .eq('id', session[0].id);
    }
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
  revalidatePath(`/spaces/${spaceId}`);
  return { success: true };
}
