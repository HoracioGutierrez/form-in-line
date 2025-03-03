"use client";

import { QueueUser, leaveQueue, promoteNextSpeaker, togglePauseStatus } from "@/app/actions";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Loader, Pause, Play } from "lucide-react";

interface CurrentSpeakerProps {
  speaker: QueueUser;
  isOwner: boolean;
  spaceId: string;
}

export default function CurrentSpeaker({
  speaker,
  isOwner,
  spaceId
}: CurrentSpeakerProps) {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [speakingTime, setSpeakingTime] = useState<string>('00:00')

  useEffect(() => {
    if (!speaker.started_speaking_at) return

    const startedAt = new Date(speaker.started_speaking_at)

    const updateTimer = () => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - startedAt.getTime()) / 1000)

      const minutes = Math.floor(diff / 60).toString().padStart(2, '0')
      const seconds = (diff % 60).toString().padStart(2, '0')

      setSpeakingTime(`${minutes}:${seconds}`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [speaker.started_speaking_at])

  const handleNextSpeaker = async () => {
    setIsLoading(prev => ({ ...prev, next: true }));
    try {
      await promoteNextSpeaker(speaker.id, spaceId);
    } catch (error) {
      console.error("Error promoting next speaker:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, next: false }));
    }
  };

  const handleLeaveQueue = async () => {
    setIsLoading(prev => ({ ...prev, leave: true }));
    try {
      await leaveQueue(speaker.id, spaceId);
    } catch (error) {
      console.error("Error leaving queue:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, leave: false }));
    }
  };

  const handleTogglePause = async () => {
    setIsLoading(prev => ({ ...prev, pause: true }));
    try {
      await togglePauseStatus(speaker.id, spaceId, !speaker.is_paused);
    } catch (error) {
      console.error("Error toggling pause status:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, pause: false }));
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">
            {speaker.full_name || speaker.email || "Anonymous"}
          </h3>
          {speaker.message && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {speaker.message}
            </p>
          )}
          {speaker.is_paused && (
            <div className="mt-2 px-3 py-1 inline-block text-sm bg-yellow-100 text-yellow-800 rounded">
              Speaking Paused
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          {/* Controls for admins or the current speaker */}
          {isOwner && (
            <Button
              onClick={handleNextSpeaker}
              disabled={isLoading.next}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isLoading.next ? <Loader /> : <ArrowRight />}
              {isLoading.next ? "Procesando..." : "Siguiente Orador"}
            </Button>
          )}

          {(isOwner || speaker.user_id === speaker.user_id) && (
            <>
              <Button
                onClick={handleTogglePause}
                disabled={isLoading.pause}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isLoading.pause ? <Loader /> : speaker.is_paused ? <Play /> : <Pause />}
                {isLoading.pause ? "Procesando..." : speaker.is_paused ? "Reanudar" : "Pausar"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
