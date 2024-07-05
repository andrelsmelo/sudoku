'use client'

import React from 'react'
import { MessageProps } from '@/utils/types'

const Message: React.FC<MessageProps> = ({ message }) => {
  return message ? <div className="mt-4 text-lg">{message}</div> : null
}

export default Message
