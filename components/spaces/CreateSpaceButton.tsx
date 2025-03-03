'use client'

import { useState } from 'react'
import Modal from '@/components/shared/Modal'
import { createSpace } from '@/app/actions'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
/* import { PlusIcon } from '@heroicons/react/24/outline' */

interface CreateSpaceButtonProps {
  userId: string
}

export default function CreateSpaceButton({ userId }: CreateSpaceButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createSpace({ name, subject, userId })
      setName('')
      setSubject('')
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating space:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} variant="outline" className="flex items-center gap-2">
        <PlusIcon className='size-4' />
        Crear Espacio
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nuevo Espacio"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre del Espacio *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-muted-foreground/30"
              placeholder="Nombre del Espacio"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tema del Espacio (opcional)
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-muted-foreground/30"
              placeholder="¿De qué se trata este espacio?"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="flex items-center gap-2">
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="flex items-center gap-2" variant="outline">
              {isLoading ? 'Creando...' : 'Crear Espacio'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
