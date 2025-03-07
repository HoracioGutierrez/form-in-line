'use client'

import { useState } from 'react'
import Link from 'next/link'
import { deleteSpace, Space } from '@/app/actions'
import { toggleSpaceStatus } from '@/app/actions'
import { Button } from '../ui/button'
import { Ban, Eye, ListCheck, Loader, Trash, Trash2 } from 'lucide-react'

interface SpaceCardProps {
  space: Space
}

export default function SpaceCard({ space }: SpaceCardProps) {
  const [isActive, setIsActive] = useState(space.is_active)
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const handleDeleteSpace = async () => {
    setIsDeleting(true)
    try {
      await deleteSpace(space.id)
      console.log('Deleting space:', space.id)
    } catch (error) {
      console.error('Error deleting space:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-muted dark:border-muted-foreground">
      <div className="p-4">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-lg font-semibold">{space.name}</h3>
            {space.subject && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{space.subject}</p>
            )}
          </div>
          <span
            className={`px-2 py-1 text-xs rounded ${isActive
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
          >
            {isActive ? 'Activo' : 'Inactivo'}
          </span>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            onClick={handleToggleStatus}
            disabled={isLoading}
            variant={isActive ? 'destructive' : 'outline'}
            className='flex items-center gap-2 cursor-pointer'
            size="sm"
          >
            {isLoading ? <Loader className='animate-spin size-4' /> : isActive ? <Ban className='size-4' /> : <ListCheck className='size-4' />}
            {/* {isLoading ? 'Cargando ...' : isActive ? 'Desactivar' : 'Activar'} */}
          </Button>
          <Button
            onClick={handleDeleteSpace}
            disabled={isLoading}
            variant={isActive ? 'destructive' : 'outline'}
            className='flex items-center gap-2 cursor-pointer'
            size="sm"
          >
            {isDeleting ? <Loader className='animate-spin' /> : <Trash2 className='size-4' />}
            {/* {isLoading ? 'Cargando ...' : 'Borrar'} */}
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link
              href={`/spaces/${space.slug}`}
              className="flex items-center gap-2"
            >
              <Eye className='size-4' />
              {/* Ver Espacio */}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
