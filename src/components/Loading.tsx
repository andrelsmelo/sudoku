'use client'

import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className="p-2 text-white bg-blue-500 rounded-full transition-all ease-in-out animate-bounce"
        style={{ animationDelay: '0s' }}
      >
        S
      </div>
      <div
        className="p-2 text-white bg-green-500 rounded-full transition-all ease-in-out animate-bounce"
        style={{ animationDelay: '0.1s' }}
      >
        U
      </div>
      <div
        className="p-2 text-white bg-red-500 rounded-full transition-all ease-in-out animate-bounce"
        style={{ animationDelay: '0.2s' }}
      >
        D
      </div>
      <div
        className="p-2 text-white bg-blue-500 rounded-full transition-all ease-in-out animate-bounce"
        style={{ animationDelay: '0.3s' }}
      >
        O
      </div>
      <div
        className="p-2 text-white bg-green-500 rounded-full transition-all ease-in-out animate-bounce"
        style={{ animationDelay: '0.4s' }}
      >
        K
      </div>
      <div
        className="p-2 text-white bg-red-500 rounded-full transition-all ease-in-out animate-bounce"
        style={{ animationDelay: '0.5s' }}
      >
        U
      </div>
    </div>
  )
}

export default Loading
