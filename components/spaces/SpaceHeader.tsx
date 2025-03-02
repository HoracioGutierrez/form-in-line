'use client'

import { useState, useEffect } from 'react'
import { SpaceWithUser, Space } from '@/app/actions'
import { joinQueue } from '@/app/actions'
import { toggleSpaceStatus } from '@/app/actions'

interface SpaceHeaderProps {
  space: Space
  isOwner: boolean
  currentUserId: string
  activeDuration?: string | null
}

export default function SpaceHeader({ 
  space, 
  isOwner, 
  currentUserId, 
  activeDuration 
}: SpaceHeaderProps) {
  const [elapsedTime, setElapsedTime] = useState<string>('00:00:00')
  const [isJoining, setIsJoining] = useState(false)
  const [message, setMessage] = useState('')
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [isTogglingStatus, setIsTogglingStatus] = useState(false)

  useEffect(() => {
    if (!space.is_active || !space.activated_at) return
    
    // Calculate and display elapsed time
    const activatedAt = new Date(space.activated_at)
    
    const updateTimer = () => {
      const now = new Date()
      const diff = Math.floor((now.getTime() - activatedAt.getTime()) / 1000)
      
      const hours = Math.floor(diff / 3600).toString().padStart(2, '0')
      const minutes = Math.floor((diff % 3600) / 60).toString().padStart(2, '0')
      const seconds = (diff % 60).toString().padStart(2, '0')
      
      setElapsedTime(`${hours}:${minutes}:${seconds}`)
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    
    return () => clearInterval(interval)
  }, [space.is_active, space.activated_at])
  
  const handleJoinQueue = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsJoining(true)
    
    try {
      await joinQueue(space.id, currentUserId, message)
      setShowMessageForm(false)
      setMessage('')
    } catch (error) {
      console.error('Error joining queue:', error)
    } finally {
      setIsJoining(false)
    }
  }
  
  const handleToggleStatus = async () => {
    setIsTogglingStatus(true)
    
    try {
      await toggleSpaceStatus(space.id, !space.is_active)
    } catch (error) {
      console.error('Error toggling space status:', error)
    } finally {
      setIsTogglingStatus(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{space.name}</h1>
          {space.subject && (
            <p className="text-gray-600 dark:text-gray-300 mt-1">{space.subject}</p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Created by {space.user?.full_name || space.user?.email || 'Unknown'}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
          {space.is_active && (
            <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">
              <span className="font-mono font-medium">
                {elapsedTime}
              </span>
            </div>
          )}
          
          {isOwner ? (
            <button 
              onClick={handleToggleStatus}
              disabled={isTogglingStatus}
              className={`px-4 py-2 rounded-md ${
                space.is_active 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isTogglingStatus 
                ? 'Processing...' 
                : space.is_active 
                  ? 'Deactivate Space' 
                  : 'Activate Space'
              }
            </button>
          ) : (
            space.is_active && !showMessageForm && (
              <button
                onClick={() => setShowMessageForm(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Join Waiting List
              </button>
            )
          )}
        </div>
      </div>
      
      {/* Join queue form */}
      {showMessageForm && (
        <form onSubmit={handleJoinQueue} className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Join Waiting List</h3>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message / Question (optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What would you like to ask or discuss?"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowMessageForm(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isJoining}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {isJoining ? 'Joining...' : 'Join Queue'}
            </button>
          </div>
        </form>
      )}
      
      {/* Status indicator */}
      <div className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
        ${space.is_active 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        }`}>
        {space.is_active ? 'Active' : 'Inactive'}
      </div>
    </div>
  )
}
