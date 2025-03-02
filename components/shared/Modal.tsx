'use client'

import { useCallback, useEffect, useState } from 'react'
/* import { XMarkIcon } from '@heroicons/react/24/outline' */

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [isShown, setIsShown] = useState(isOpen)

  useEffect(() => {
    setIsShown(isOpen)
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsShown(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [onClose])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    
    if (isShown) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEsc)
    }
    
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isShown, handleClose])

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300 ${
        isShown ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg w-full max-w-md transition-all duration-300 ${
          isShown ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={handleClose}
          >
            {/* <XMarkIcon className="h-5 w-5" /> */}
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
