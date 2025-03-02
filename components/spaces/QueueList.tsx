'use client'

import { useState } from 'react'
import { QueueUser } from '@/app/actions'
import { leaveQueue, togglePauseStatus } from '@/app/actions'

interface QueueListProps {
  users: QueueUser[]
  isOwner: boolean
  currentUserId: string
  spaceId: string
}

export default function QueueList({ users, isOwner, currentUserId, spaceId }: QueueListProps) {
  const [loadingState, setLoadingState] = useState<Record<string, string>>({})
  
  const handleLeaveQueue = async (queueId: string) => {
    setLoadingState(prev => ({ ...prev, [queueId]: 'leaving' }))
    
    try {
      await leaveQueue(queueId, spaceId)
    } catch (error) {
      console.error('Error leaving queue:', error)
    } finally {
      setLoadingState(prev => {
        const newState = { ...prev }
        delete newState[queueId]
        return newState
      })
    }
  }
  
  const handleTogglePause = async (queueId: string, isPaused: boolean) => {
    setLoadingState(prev => ({ ...prev, [queueId]: 'toggling' }))
    
    try {
      await togglePauseStatus(queueId, spaceId, !isPaused)
    } catch (error) {
      console.error('Error toggling pause status:', error)
    } finally {
      setLoadingState(prev => {
        const newState = { ...prev }
        delete newState[queueId]
        return newState
      })
    }
  }
  
  if (users.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
        <p className="text-gray-500 dark:text-gray-400">
          There are no users waiting in line.
        </p>
      </div>
    )
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user) => {
          const isCurrentUser = user.user_id === currentUserId
          const canManage = isOwner || isCurrentUser
          const isLoading = loadingState[user.id]
          
          return (
            <li 
              key={user.id}
              className={`p-4 ${user.is_paused ? 'bg-gray-50 dark:bg-gray-900/30' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="bg-gray-200 dark:bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center mr-3">
                      {user.position}
                    </span>
                    <div>
                      <p className={`font-medium ${user.is_paused ? 'text-gray-500 dark:text-gray-400' : ''}`}>
                        {user.full_name || user.email || 'Anonymous'}
                        {isCurrentUser && <span className="ml-2 text-xs font-normal text-gray-500">(You)</span>}
                      </p>
                      {user.is_paused && (
                        <span className="text-xs text-yellow-600 dark:text-yellow-500">Paused</span>
                      )}
                      {user.message && (
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">
                          {user.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {canManage && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleTogglePause(user.id, user.is_paused)}
                      disabled={!!isLoading}
                      className={`px-3 py-1 text-sm rounded-md ${
                        user.is_paused
                          ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50'
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:hover:bg-yellow-900/50'
                      }`}
                    >
                      {isLoading === 'toggling' 
                        ? '...' 
                        : user.is_paused
                          ? 'Resume'
                          : 'Pause'
                      }
                    </button>
                    <button 
                      onClick={() => handleLeaveQueue(user.id)}
                      disabled={!!isLoading}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-md dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                    >
                      {isLoading === 'leaving' ? '...' : 'Remove'}
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
