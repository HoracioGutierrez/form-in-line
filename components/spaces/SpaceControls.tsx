'use client'

import { useState } from 'react'
import { SpaceWithUser } from '@/app/actions'
import { promoteNextInLine } from '@/app/actions'

interface SpaceControlsProps {
  space: SpaceWithUser
  hasQueue: boolean
}

export default function SpaceControls({ space, hasQueue }: SpaceControlsProps) {
  const [isPromoting, setIsPromoting] = useState(false)

  const handlePromoteNext = async () => {
    setIsPromoting(true)

    try {
      // We need to implement promoteNextInLine as a public function in actions.ts
      // Currently it's only used internally by other functions
      await promoteNextInLine(space.id)
    } catch (error) {
      console.error('Error promoting next speaker:', error)
    } finally {
      setIsPromoting(false)
    }
  }

  if (!space.is_active) {
    return null
  }

  return (
    <div className="mt-6 bg-white dark:bg-muted/30 p-4 rounded-lg border border-gray-200 dark:border-muted">
      <h3 className="text-lg font-medium mb-4">Controles del Espacio</h3>

      <div className="flex flex-wrap gap-3">
        {hasQueue && (
          <button
            onClick={handlePromoteNext}
            disabled={isPromoting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPromoting ? 'Procesando...' : 'Llamar al siguiente orador'}
          </button>
        )}
      </div>
    </div>
  )
}
