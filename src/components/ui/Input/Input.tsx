import React from 'react'
import type { InputProps } from './Input.types'
import '@/styles/Input.css'

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  icon,
}) => {
  return (
    <div className="input-container">
      {icon && <div className="input-icon">{icon}</div>}

      <input
        className="input-field"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
