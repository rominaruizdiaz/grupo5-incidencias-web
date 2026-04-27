import React from 'react'

export type InputProps = {
  type?: 'text' | 'email' | 'password'
  name?: string
  value?: string
  placeholder?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?: React.ReactNode
}
