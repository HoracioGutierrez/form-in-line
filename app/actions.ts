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
  userId,
  slug
}: {
  name: string;
  subject?: string;
  userId: string;
  slug: string;
}) {
  const supabase = await createClient();

  // Create a random slug (URL-friendly ID)
  //const slug = nanoid(10);
  //check if slug is unique
  const { data: existingSpace, error: existingError } = await supabase
    .from('spaces')
    .select('id')
    .eq('slug', slug)
    .single();

  if (existingSpace) {
    console.error('Error creating space:', existingError);
    throw new Error('Failed to create space');
  }

  // Insert into spaces table
  const { data: spaceData, error } = await supabase
    .from('spaces')
    .insert({
      name,
      subject: subject || null,
      slug,
      user_id: userId,
      is_active: false,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating space:', error);
    throw new Error('Failed to create space');
  }

  // Create a record in spaces_history
  const { error: historyError } = await supabase
    .from('spaces_history')
    .insert({
      space_id: spaceData.id,
      space_name: name,
      slug: slug,
      created_by: userId,
      queue_count: 0
    });

  if (historyError) {
    console.error('Error recording space history:', historyError);
    // Continue anyway since the space was created
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
        user_profiles(full_name),
        user_profiles_view(full_name)
        `)
      .eq('id', space.user_id)
      .single();

    const { data : userView } = await supabase.from("user_profiles_view").select("*").eq("id", space.user_id).single();

    if (userView) {
      space.user = {
        email: userView.email,
        full_name: userView.full_name
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
      full_name: user?.full_name || null
    };
  }));

  return queueUsers as QueueUser[];
}

export async function joinQueue(spaceId: string, userId: string, message?: string, alias?: string) {
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

  // Determine if this user will be the current speaker
  const isCurrentSpeaker = nextPosition === 1 && maxPositionData.length === 0;

  // Add user to the queue
  const { error } = await supabase
    .from('queue')
    .insert({
      space_id: spaceId,
      user_id: userId,
      message: message || null,
      position: nextPosition,
      is_paused: false,
      is_current_speaker: isCurrentSpeaker,
      // Set started_speaking_at if this user is the current speaker
      started_speaking_at: isCurrentSpeaker ? new Date().toISOString() : null
    });

  if (error) {
    console.error('Error joining queue:', error);
    throw new Error('Failed to join queue');
  }

  // Update queue count in current active session
  const { data: activeSession, error: sessionError } = await supabase
    .from('space_sessions')
    .select('id, queue_count')
    .eq('space_id', spaceId)
    .is('deactivated_at', null)
    .single();

  if (!sessionError && activeSession) {
    const newCount = (activeSession.queue_count || 0) + 1;
    await supabase
      .from('space_sessions')
      .update({ queue_count: newCount })
      .eq('id', activeSession.id);
  }

  // Also update the queue_count in spaces_history
  const { data: spaceHistory, error: historyError } = await supabase
    .from('spaces_history')
    .select('id, queue_count')
    .eq('space_id', spaceId)
    .is('deleted_at', null)
    .single();

  if (!historyError && spaceHistory) {
    const newHistoryCount = (spaceHistory.queue_count || 0) + 1;
    await supabase
      .from('spaces_history')
      .update({ queue_count: newHistoryCount })
      .eq('id', spaceHistory.id);
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
  const { data, error } = await supabase
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

  // Only calculate speaking time if started_speaking_at exists
  if (!csError && currentSpeaker && currentSpeaker.started_speaking_at) {
    const startedAt = new Date(currentSpeaker.started_speaking_at);
    const endedAt = new Date();
    const speakingTimeSeconds = Math.floor((endedAt.getTime() - startedAt.getTime()) / 1000);

    const { data, error, status } = await supabase
      .from('queue')
      .update({
        is_current_speaker: false,
        total_speaking_time: speakingTimeSeconds
      })
      .eq('id', currentSpeakerId)
    //.select(); // Add this to return the updated data

  } else {
    // Just mark as not current speaker if we don't have a start time
    const { data, error } = await supabase
      .from('queue')
      .update({
        is_current_speaker: false
      })
      .eq('id', currentSpeakerId)
    //.select(); // Add this to return the updated data

  }

  // Fetch the updated data to confirm changes
  const { data: currentSpeakerData, error: csdError } = await supabase
    .from('queue')
    .select('*')
    .eq('id', currentSpeakerId)
    .single();


  // Remove from queue
  await leaveQueue(currentSpeakerId, spaceId);

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
    .eq('is_current_speaker', false)
    .order('position', { ascending: true })
    .limit(1);


  if (nsError || nextSpeaker.length === 0) {
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


  const { data, error } = await supabase
    .from('queue')
    .delete()
    .eq('space_id', spaceId)
    .select();

  if (error) {
    console.error('Error clearing queue:', error);
    throw new Error('Failed to clear queue');
  }

  return { success: true };
}

// Extend the toggleSpaceStatus function to handle queue clearing and session tracking
export async function toggleSpaceStatus(spaceId: string, isActive: boolean) {
  const supabase = await createClient();

  // Get space details for recording in history
  const { data: space, error: spaceError } = await supabase
    .from('spaces')
    .select('name, slug')
    .eq('id', spaceId)
    .single();

  if (spaceError) {
    console.error('Error fetching space details:', spaceError);
    throw new Error('Failed to update space status');
  }

  const updates: any = { is_active: isActive };
  const userId = (await supabase.auth.getUser()).data.user?.id;

  // If activating the space, set the activated_at timestamp
  if (isActive) {
    updates.activated_at = new Date().toISOString();

    // Create a new session record with queue_count initialized to 0
    await supabase
      .from('space_sessions')
      .insert({
        space_id: spaceId,
        space_name: space.name,
        space_slug: space.slug,
        activated_by: userId,
        activated_at: updates.activated_at,
        queue_count: 0
      });
  } else {
    // If deactivating, clear the queue
    try {
      await clearQueueOnDeactivation(spaceId);
    } catch (error) {
      console.error('Failed to clear queue during space deactivation:', error);
    }

    // Update the session record
    const { data: session, error: sessionError } = await supabase
      .from('space_sessions')
      .select('id')
      .eq('space_id', spaceId)
      .is('deactivated_at', null)
      .single();

    if (!sessionError && session) {
      await supabase
        .from('space_sessions')
        .update({
          deactivated_at: new Date().toISOString()
        })
        .eq('id', session.id);
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
  revalidatePath('/history');
  return { success: true };
}

// Interface for the active queues that a user is part of
export interface ActiveQueue {
  id: string;
  space_id: string;
  space_name: string;
  slug: string;
  position: number;
  is_current_speaker: boolean;
  is_paused: boolean;
  message: string | null;
  active_since: string | null;
}

export async function getUserActiveQueues(userId: string): Promise<ActiveQueue[]> {
  const supabase = await createClient();

  // Get all queue entries for this user with space information
  const { data, error } = await supabase
    .from('queue')
    .select(`
      id,
      position,
      is_current_speaker,
      is_paused,
      message,
      space_id,
      spaces:space_id (
        name,
        slug,
        activated_at
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching active queues:', error);
    return [];
  }

  // Transform the data to match the ActiveQueue interface
  const activeQueues: ActiveQueue[] = (data || []).map(entry => {
    // Safely access space data with fallbacks
    const spaceData = Array.isArray(entry.spaces)
      ? entry.spaces[0] || {}
      : (entry.spaces || {});

    return {
      id: entry.id,
      space_id: entry.space_id,
      space_name: spaceData.name || 'Unknown Space',
      slug: spaceData.slug || '',
      position: entry.position,
      is_current_speaker: entry.is_current_speaker,
      is_paused: entry.is_paused,
      message: entry.message,
      active_since: spaceData.activated_at || null,
    };
  });

  return activeQueues;
}

// Add new interface for session history
export interface SessionHistory {
  id: string;
  space_id: string;
  space_name: string;
  space_slug: string;
  activated_at: string;
  deactivated_at: string | null;
  activated_by: string;
  activated_by_email: string | null;
  activated_by_name: string | null;
  queue_count: number;
  duration_minutes: number;
}

// Add new function to get session history
export async function getSessionHistory(
  userId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ data: SessionHistory[], total: number }> {
  const supabase = await createClient();

  // Get total count for pagination
  const { count, error: countError } = await supabase
    .from('session_history_view')
    .select('*', { count: 'exact', head: true })
    .or(`activated_by.eq.${userId},space_id.in.(select id from spaces where user_id = '${userId}')`);

  if (countError) {
    console.error('Error counting sessions:', countError);
    throw new Error('Failed to fetch session history');
  }

  // Get paginated data
  const { data, error } = await supabase
    .from('session_history_view')
    .select('*')
    .or(`activated_by.eq.${userId},space_id.in.(select id from spaces where user_id = '${userId}')`)
    .order('activated_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (error) {
    console.error('Error fetching session history:', error);
    throw new Error('Failed to fetch session history');
  }

  return {
    data: data as SessionHistory[],
    total: count || 0
  };
}

// Add new interfaces for session and space history
export interface SpaceHistory {
  id: string;
  space_id: string;
  space_name: string;
  slug: string;
  created_at: string;
  deleted_at: string | null;
  created_by: string;
  queue_count: number;
}

export interface SessionHistory {
  id: string;
  space_id: string;
  space_name: string;
  space_slug: string;
  activated_at: string;
  deactivated_at: string | null;
  activated_by: string;
  queue_count: number;
  duration_minutes: number; // Calculated field
}

// New function to get history data
export async function getHistoryData(
  userId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<{ sessions: SessionHistory[], spaces: SpaceHistory[], total: number }> {
  const supabase = await createClient();

  // Get sessions data with proper filter syntax - Fix the OR syntax
  const { data: sessionsData, error: sessionsError, count: sessionsCount } = await supabase
    .from('space_sessions')
    .select('*, spaces!inner(user_id)', { count: 'exact' })
    .filter('activated_by', 'eq', userId)
    .range((page - 1) * pageSize, page * pageSize - 1)
    .order('activated_at', { ascending: false });

  if (sessionsError) {
    console.error('Error fetching sessions history:', sessionsError);
    throw new Error('Failed to fetch history data');
  }

  // Get additional sessions where the user is the space owner
  const { data: ownerSessionsData, error: ownerSessionsError } = await supabase
    .from('space_sessions')
    .select('*, spaces!inner(user_id)')
    .eq('spaces.user_id', userId)
    .not('activated_by', 'eq', userId) // Avoid duplicates
    .order('activated_at', { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1);

  if (ownerSessionsError) {
    console.error('Error fetching owner sessions history:', ownerSessionsError);
    // Continue with what we have
  }

  // Combine both result sets
  const allSessions = [...sessionsData, ...(ownerSessionsData || [])];

  // Sort combined results by activated_at
  allSessions.sort((a, b) =>
    new Date(b.activated_at).getTime() - new Date(a.activated_at).getTime()
  );

  // Limit to pageSize after combining
  const paginatedSessions = allSessions.slice(0, pageSize);

  // Calculate duration for each session
  const sessions = paginatedSessions.map(session => {
    const startTime = new Date(session.activated_at).getTime();
    const endTime = session.deactivated_at
      ? new Date(session.deactivated_at).getTime()
      : new Date().getTime();

    const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));

    return {
      ...session,
      duration_minutes: durationMinutes
    };
  });

  // Get spaces history
  const { data: spacesData, error: spacesError } = await supabase
    .from('spaces_history')
    .select('*')
    .eq('created_by', userId)
    .order('created_at', { ascending: false })
    .limit(pageSize);

  if (spacesError) {
    console.error('Error fetching spaces history:', spacesError);
    // Continue and return sessions at least
  }

  // For pagination, we'd ideally want the total count of all sessions matching our criteria
  // Since we're doing two queries and combining, this is a bit tricky
  // For now, we'll use the count from the first query + the length of the second query
  const approximateTotalCount = (sessionsCount || 0) + (ownerSessionsData?.length || 0);

  return {
    sessions: sessions as SessionHistory[],
    spaces: (spacesData || []) as SpaceHistory[],
    total: approximateTotalCount
  };
}

export async function updateUserName(name: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    data: { full_name: name }
  });

  if (error) {
    console.error('Error updating user name:', error);
    throw new Error('Failed to update user name');
  }

  /* revalidatePath('/account') */
  return { success: true };
}


//get all spaces
export async function getAllSpaces() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('spaces')
    .select('*');

  if (error) {
    console.error('Error fetching spaces:', error);
    throw new Error('Failed to fetch spaces');
  }

  return data as Space[];
}