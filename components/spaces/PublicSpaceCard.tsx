'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Space } from '@/app/actions'
import { toggleSpaceStatus } from '@/app/actions'
import { Button } from '../ui/button'
import { Ban, Eye, ListCheck, Loader, LogIn } from 'lucide-react'
import IconButtonWithTooltip from '../shared/IconButtonWithTooltip'

interface SpaceCardProps {
  space: Space
}

export default function PublicSpaceCard({ space }: SpaceCardProps) {
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
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-muted dark:border-muted-foreground">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2 flex-col gap-4 sm:flex-row">
          <div>
            <h3 className="text-lg font-semibold">{space.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{space.subject || "Este espacio no tiene asunto"}</p>
          </div>
          <div className='flex gap-2 items-center'>
            <span
              className={`px-2 py-1 text-xs rounded ${isActive
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
            >
              {isActive ? 'Activo' : 'Inactivo'}
            </span>
            <IconButtonWithTooltip message="Ver Espacio">
              <Link
                href={`/spaces/${space.slug}`}
                className="flex items-center gap-2"
              >
                <LogIn />
              </Link>
            </IconButtonWithTooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
