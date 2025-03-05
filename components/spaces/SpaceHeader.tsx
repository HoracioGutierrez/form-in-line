'use client'

import { useState, useEffect, Suspense } from 'react'
import { SpaceWithUser } from '@/app/actions'
import { joinQueue } from '@/app/actions'
import { toggleSpaceStatus } from '@/app/actions'
import { Button } from '../ui/button'
import { Ban, ListCheck, ListPlus, Loader } from 'lucide-react'
import JoinQueueButton from './JoinQueueButton'
import { User } from '@supabase/supabase-js'

interface SpaceHeaderProps {
  space: SpaceWithUser
  isOwner: boolean
  currentUserId: string
  activeDuration?: string | null
  isUserInQueue: boolean
  user?: User
}

export default function SpaceHeader({
  space,
  isOwner,
  currentUserId,
  activeDuration,
  isUserInQueue,
  user
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
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{space.name}</h1>
          {space.subject && (
            <p className="text-gray-600 dark:text-gray-300 mt-1">{space.subject}</p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {/* Created by {space.user?.full_name || space.user?.email || 'Unknown'} */}
            Creado por {'Unknown'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
          {space.is_active && (
            <div className="flex items-center px-4">
              <span className="font-mono font-medium">
                {elapsedTime}
              </span>
            </div>
          )}

          {isOwner ? (
            <Button
              onClick={handleToggleStatus}
              disabled={isTogglingStatus}
              variant={space.is_active ? 'destructive' : 'outline'}
              className='flex items-center gap-2'
            >
              {isTogglingStatus ? <Loader className="animate-spin" /> : space.is_active ? <Ban /> : <ListCheck />}
              {isTogglingStatus
                ? 'Procesando ...'
                : space.is_active
                  ? 'Desactivar Espacio'
                  : 'Activar Espacio'
              }
            </Button>
          ) : (
            space.is_active && !space.is_owner && !isUserInQueue && (
              <Suspense fallback={<div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>}>
                <JoinQueueButton
                  spaceId={space?.id}
                  userId={user?.id || ''}
                  email={user?.user_metadata.full_name || user?.email || ''}
                  isAlreadyInQueue={isUserInQueue}
                />
              </Suspense>
            )
          )}
        </div>
      </div>

      {showMessageForm && (<hr className="my-6 border-t border-gray-200 dark:border-muted" />)}

      {/* Join queue form */}
      {showMessageForm && (
        <form onSubmit={handleJoinQueue} className="mt-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Unirse a la lista de espera</h3>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-foreground/50">
              Mensaje / Pregunta (opcional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="¿Qué te gustaría preguntar o discutir?"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-black dark:bg-muted/30"
              rows={3}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className={` inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
        ${space.is_active
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}>
              {space.is_active ? 'Activo' : 'Inactivo'}
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setShowMessageForm(false)} variant={"outline"} className="flex items-center gap-2">
                <Ban />
                Cancelar
              </Button>
              <Button type="submit" disabled={isJoining} variant={"outline"} className='flex items-center gap-2'>
                {isJoining ? <Loader className="animate-spin" /> : <ListPlus />}
                {isJoining ? 'Uniendo...' : 'Unirse'}
              </Button>
            </div>
          </div>
        </form>
      )}

      {/* Status indicator */}

    </div>
  )
}
