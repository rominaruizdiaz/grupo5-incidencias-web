import {
  Home,
  Plus,
  FolderOpen,
  Users,
  Building2,
  BarChart3,
  Bell,
  User,
} from 'lucide-react'

// links para la navegacion de sidebar y bottombar
export const NAV_ITEMS = [
  {
    to: '/panel',
    label: 'Inicio',
    icon: Home,
    showOn: ['mobile', 'desktop'],
  },

  {
    to: '/createIncidencia',
    label: 'Crear',
    icon: Plus,
    showOn: ['mobile', 'desktop'],
  },

  {
    to: '/areas',
    label: 'Mis Áreas',
    icon: FolderOpen,
    showOn: ['mobile', 'desktop'],
    userOnly: true,
  },

  {
    to: '/personal',
    label: 'Personal',
    icon: Users,
    showOn: ['mobile', 'desktop'],
    adminOnly: true,
  },

  {
    to: '/departamentos',
    label: 'Departamentos',
    icon: Building2,
    showOn: ['mobile', 'desktop'],
    adminOnly: true,
  },

  {
    to: '/statistics',
    label: 'Estadísticas',
    icon: BarChart3,
    showOn: ['mobile', 'desktop'],
  },

  {
    to: '/notifications',
    label: 'Notificaciones',
    icon: Bell,
    showOn: ['mobile', 'desktop'],
    hasBadge: true,
  },

  {
    to: '/userProfile',
    label: 'Perfil',
    icon: User,
    showOn: ['mobile', 'desktop'],
  },
]
