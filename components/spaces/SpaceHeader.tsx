'use client'

import { useState, useEffect, Suspense } from 'react'
import { editSpace, SpaceWithUser } from '@/app/actions'
import { joinQueue } from '@/app/actions'
import { toggleSpaceStatus } from '@/app/actions'
import { Button } from '../ui/button'
import { Ban, Edit, ListCheck, ListPlus, Loader, PlusIcon } from 'lucide-react'
import JoinQueueButton from './JoinQueueButton'
import { User } from '@supabase/supabase-js'
import Modal from '../shared/Modal'
import { nanoid } from 'nanoid'
import { redirect } from 'next/navigation'

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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(space.name || '')
  const [subject, setSubject] = useState(space.subject || '')
  const [slug, setSlug] = useState(space.slug || nanoid(10))

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await editSpace(space.id, name, subject, slug)
      setName('')
      setSubject('')
      setIsModalOpen(false)
      //redirect(`/spaces/${slug}`)
    } catch (error) {
      console.error('Error creating space:', error)
    } finally {
      setIsLoading(false)
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
            Creado por {space.user?.full_name || space.user?.email || 'Unknown'}
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
          {isOwner && (
            <Button className='flex items-center gap-2' variant={"outline"} onClick={() => setIsModalOpen(true)}>
              <Edit className='size-5' />
              Editar
            </Button>
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Editar Espacio"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-muted-foreground/50 mb-1">
                  Nombre del Espacio *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-muted-foreground rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-muted-foreground/30"
                  placeholder="Nombre del Espacio"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-muted-foreground/50 mb-1">
                  Tema del Espacio (opcional)
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-muted-foreground rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-muted-foreground/30"
                  placeholder="¿De qué se trata este espacio?"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-muted-foreground/50 mb-1">
                  URL Personalizada (opcional)
                </label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-muted-foreground rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-muted-foreground/30"
                  placeholder="¿De qué se trata este espacio?"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex items-center gap-2">
                  <Ban className='size-5' />
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading} className="flex items-center gap-2" variant="outline">
                  {isLoading ? <Loader className='animate-spin' /> : <Edit />}
                  {isLoading ? 'Creando...' : 'Editar Espacio'}
                </Button>
              </div>
            </form>
          </Modal>

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
