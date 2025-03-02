'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Space } from '@/app/actions'
import { toggleSpaceStatus } from '@/app/actions'

interface SpaceCardProps {
  space: Space
}

export default function SpaceCard({ space }: SpaceCardProps) {
  const [isActive, setIsActive] = useState(space.is_active)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleStatus = async () => {
    setIsLoading(true)
    try {
      await toggleSpaceStatus(space.id, !isActive)
      setIsActive(!isActive)
    } catch (error) {
      console.error('Error toggling space status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{space.name}</h3>
            {space.subject && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{space.subject}</p>
            )}
          </div>
          <span 
            className={`px-2 py-1 text-xs rounded ${
              isActive 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleToggleStatus}
            disabled={isLoading}
            className={`px-3 py-1 text-sm rounded-md ${
              isActive
                ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
            } disabled:opacity-50`}
          >
            {isLoading ? '...' : isActive ? 'Deactivate' : 'Activate'}
          </button>
          
          <Link 
            href={`/spaces/${space.slug}`} 
            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-md dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
          >
            View Space
          </Link>
        </div>
      </div>
    </div>
  )
}
