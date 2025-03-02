"use client";

import { QueueUser, leaveQueue, togglePauseStatus } from "@/app/actions";
import { useState } from "react";

interface QueueListProps {
  users: QueueUser[];
  isOwner: boolean;
  currentUserId: string;
  spaceId: string;
}

export default function QueueList({ users, isOwner, currentUserId, spaceId }: QueueListProps) {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const handleLeaveQueue = async (queueId: string) => {
    setIsLoading(prev => ({ ...prev, [queueId]: true }));
    try {
      await leaveQueue(queueId, spaceId);
    } catch (error) {
      console.error("Error leaving queue:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, [queueId]: false }));
    }
  };

  const handleTogglePause = async (queueId: string, currentPaused: boolean) => {
    setIsLoading(prev => ({ ...prev, [`pause_${queueId}`]: true }));
    try {
      await togglePauseStatus(queueId, spaceId, !currentPaused);
    } catch (error) {
      console.error("Error toggling pause status:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, [`pause_${queueId}`]: false }));
    }
  };

  if (users.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <p className="text-center text-gray-500 dark:text-gray-400">
          No one is waiting in the queue.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className={`p-4 rounded-lg border ${
            user.is_paused
              ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center space-x-2">
                <div className="font-medium">
                  {user.full_name || user.email || "Anonymous"}
                </div>
                {user.is_paused && (
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                    Paused
                  </span>
                )}
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                  #{user.position}
                </span>
              </div>
              {user.message && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {user.message}
                </p>
              )}
            </div>
            
            <div className="flex space-x-2">
              {/* Show controls for own entry or if admin */}
              {(isOwner || user.user_id === currentUserId) && (
                <>
                  <button
                    onClick={() => handleTogglePause(user.id, user.is_paused)}
                    disabled={isLoading[`pause_${user.id}`]}
                    className={`px-3 py-1 text-sm rounded-md ${
                      user.is_paused
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}
                  >
                    {isLoading[`pause_${user.id}`] ? "..." : user.is_paused ? "Resume" : "Pause"}
                  </button>
                  
                  <button
                    onClick={() => handleLeaveQueue(user.id)}
                    disabled={isLoading[user.id]}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 hover:bg-red-200 rounded-md"
                  >
                    {isLoading[user.id] ? "..." : (user.user_id === currentUserId ? "Leave" : "Remove")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
