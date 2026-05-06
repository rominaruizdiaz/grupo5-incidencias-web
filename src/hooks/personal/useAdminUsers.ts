import { useEffect, useState } from 'react'
import api from '@/services/api'
import type { Usuario } from '@/types'

// carga todos los users de la app
export const useAdminUsers = () => {
  const [users, setUsers] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    const { data } = await api.get('/users')
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    refetch: fetchUsers,
  }
}
