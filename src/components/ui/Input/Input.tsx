import React from 'react'
import type { InputProps } from './Input.types'

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  icon,
}) => {
  return (
    <div className="flex items-center w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition">
      {icon && <div className="mr-2 text-gray-500">{icon}</div>}

      <input
        className="w-full outline-none text-sm text-gray-800 placeholder-gray-400"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
