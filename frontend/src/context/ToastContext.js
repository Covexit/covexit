import { useState } from 'react'
import constate from 'constate'

const useToast = () => {
  const [toast, setToast] = useState({ message: '', type: ''})

  return { setToast, toast }
}

export const [ToastProvider, useToastContext] = constate(useToast)
