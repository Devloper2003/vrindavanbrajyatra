import type { Metadata } from 'next'
import AdminContent from './admin-content'

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Admin panel for Vrindavan Braj Yatra website management',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminContent />
}
