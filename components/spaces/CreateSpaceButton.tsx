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
        <PlusIcon/>
        Crear Espacio
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Space"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900"
              placeholder="Space name"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject (optional)
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900"
              placeholder="What is this space about?"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-75"
            >
              {isLoading ? 'Creating...' : 'Create Space'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
