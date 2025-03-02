'use client'

import { useState, useEffect } from 'react'
import { QueueUser } from '@/app/actions'
import { promoteNextSpeaker } from '@/app/actions'

interface CurrentSpeakerProps {
  speaker: QueueUser
  isOwner: boolean
  spaceId: string
}

export default function CurrentSpeaker({ speaker, isOwner, spaceId }: CurrentSpeakerProps) {
  const [speakingTime, setSpeakingTime] = useState<string>('00:00')
  const [isPromoting, setIsPromoting] = useState(false)
  
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
  
  const handlePromoteNext = async () => {
    setIsPromoting(true)
    
    try {
      await promoteNextSpeaker(speaker.id, spaceId)
    } catch (error) {
      console.error('Error promoting next speaker:', error)
    } finally {
      setIsPromoting(false)
    }
  }
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-6 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="font-medium">Currently Speaking</span>
          </div>
          
          <h3 className="text-xl font-bold mt-2">
            {speaker.full_name || speaker.email || 'Anonymous'}
          </h3>
          
          {speaker.message && (
            <div className="mt-3 text-gray-600 dark:text-gray-300">
              <p className="italic">{speaker.message}</p>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded-md shadow-sm">
            <div className="text-xs text-gray-500 dark:text-gray-400">Speaking Time</div>
            <div className="font-mono text-xl font-medium">{speakingTime}</div>
          </div>
          
          {isOwner && (
            <button
              onClick={handlePromoteNext}
              disabled={isPromoting}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {isPromoting ? 'Processing...' : 'Next Speaker'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
