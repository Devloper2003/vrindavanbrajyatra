'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import {
  LayoutDashboard, FileText, Inbox, Image, LogOut,
  Plus, Trash2, Eye, EyeOff, Search, Save,
  Home, Package, BookOpen, Camera, MessageSquare, HelpCircle,
  Phone, Edit, ExternalLink, Mail, Star, ChevronDown, ChevronUp,
  Menu, X, Globe, Heart, MapPin, Clock, DollarSign, Sparkles,
  ArrowUp, ArrowDown, CheckCircle, AlertCircle, Copy, RefreshCw,
  Users, Map, Footprints, Settings, Shield, Lock, UserCog
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { DEFAULT_SECTION_CONTENT } from '@/lib/default-content'

// ============== Types ==============
interface Blog {
  id: string; title: string; slug: string; content: string; excerpt: string | null;
  category: string; featuredImage: string | null; published: boolean; createdAt: string
}
interface Inquiry {
  id: string; name: string; email: string; phone: string | null;
  message: string; package: string | null; read: boolean; createdAt: string
}
interface GalleryImage {
  id: string; src: string; alt: string; category: string; createdAt: string
}
interface SectionData {
  id?: string; section: string; title: string | null; subtitle: string | null; content: string | null
}

type Tab = 'dashboard' | 'hero' | 'about' | 'highlights' | 'packages' | 'testimonials' | 'faq' | 'contact' | 'footer' | 'blogs' | 'inquiries' | 'gallery' | 'settings' | 'users'

interface AdminUser {
  id: string; username: string; name: string; role: string;
  canEditHero: boolean; canEditAbout: boolean; canEditHighlights: boolean;
  canEditPackages: boolean; canEditTestimonials: boolean; canEditFAQ: boolean;
  canEditContact: boolean; canEditFooter: boolean; canManageBlogs: boolean;
  canManageGallery: boolean; canViewInquiries: boolean;
}

const DEFAULT_USER: AdminUser = {
  id: 'default', username: 'admin', name: 'Admin', role: 'admin',
  canEditHero: true, canEditAbout: true, canEditHighlights: true,
  canEditPackages: true, canEditTestimonials: true, canEditFAQ: true,
  canEditContact: true, canEditFooter: true, canManageBlogs: true,
  canManageGallery: true, canViewInquiries: true,
}

function hasPermission(user: AdminUser | null, tab: Tab): boolean {
  if (!user || user.role === 'admin') return true
  const permMap: Record<string, keyof AdminUser> = {
    hero: 'canEditHero', about: 'canEditAbout', highlights: 'canEditHighlights',
    packages: 'canEditPackages', testimonials: 'canEditTestimonials', faq: 'canEditFAQ',
    contact: 'canEditContact', footer: 'canEditFooter', blogs: 'canManageBlogs',
    gallery: 'canManageGallery', inquiries: 'canViewInquiries',
  }
  if (tab === 'dashboard' || tab === 'settings') return true
  if (tab === 'users') return user.role === 'admin'
  const perm = permMap[tab]
  return perm ? (user[perm] as boolean) : false
}

// ============== Animation Config ==============
const tabVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

const tabTransition = { duration: 0.25, ease: 'easeOut' }

const cardHover = {
  scale: 1.01,
  boxShadow: '0 4px 24px rgba(12, 57, 46, 0.08)',
  transition: { duration: 0.2 },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.04 } },
}

const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

// ============== Tab Header Config ==============
const TAB_META: Record<Tab, { icon: React.ElementType; title: string; description: string; accent: string }> = {
  dashboard: { icon: LayoutDashboard, title: 'Dashboard', description: 'Overview of your Braj Yatra website', accent: 'bg-braj-dark-green' },
  hero: { icon: Home, title: 'Hero Section', description: 'Edit the main hero banner of your website', accent: 'bg-braj-dark-green' },
  about: { icon: BookOpen, title: 'About Section', description: 'Edit the about page content', accent: 'bg-braj-teal' },
  highlights: { icon: Camera, title: 'Highlights', description: 'Manage sacred destinations', accent: 'bg-rose-500' },
  packages: { icon: Package, title: 'Packages', description: 'Manage yatra packages', accent: 'bg-amber-600' },
  testimonials: { icon: MessageSquare, title: 'Testimonials', description: 'Manage devotee reviews', accent: 'bg-violet-500' },
  faq: { icon: HelpCircle, title: 'FAQ', description: 'Manage frequently asked questions', accent: 'bg-cyan-600' },
  contact: { icon: Phone, title: 'Contact Section', description: 'Edit contact information and CTA', accent: 'bg-braj-teal' },
  footer: { icon: Globe, title: 'Footer', description: 'Edit footer content', accent: 'bg-braj-dark-green' },
  blogs: { icon: FileText, title: 'Blog Management', description: 'Create and manage blog posts', accent: 'bg-emerald-600' },
  inquiries: { icon: Inbox, title: 'Inquiries', description: 'Manage customer inquiries', accent: 'bg-sky-600' },
  gallery: { icon: Image, title: 'Gallery', description: 'Manage image gallery', accent: 'bg-pink-600' },
  settings: { icon: Settings, title: 'Settings', description: 'Manage your account settings', accent: 'bg-braj-dark-green' },
  users: { icon: UserCog, title: 'User Management', description: 'Manage admin and staff users', accent: 'bg-braj-saffron' },
}

// ============== Tab Header Component ==============
function TabHeader({ tab, onSave, saving, showSave = true }: { tab: Tab; onSave?: () => void; saving?: boolean; showSave?: boolean }) {
  const meta = TAB_META[tab]
  const Icon = meta.icon
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${meta.accent} rounded-xl flex items-center justify-center shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-braj-dark-green">{meta.title}</h1>
          <p className="text-muted-foreground text-sm">{meta.description}</p>
        </div>
      </div>
      {showSave && onSave && (
        <Button onClick={onSave} disabled={saving} className="bg-braj-dark-green hover:bg-braj-teal text-white gap-2 transition-all duration-200" asChild>
          <motion.button whileTap={{ scale: 0.97 }}>
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </Button>
      )}
    </div>
  )
}

// ============== Animated Counter ==============
function AnimatedCounter({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const prevTarget = useRef(0)

  useEffect(() => {
    const start = prevTarget.current
    const diff = target - start
    if (diff === 0) return
    const startTime = Date.now()
    let rafId: number
    const step = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(start + diff * eased))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    prevTarget.current = target
    return () => cancelAnimationFrame(rafId)
  }, [target, duration])

  return <span>{count}</span>
}

// ============== Password Strength ==============
function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 6) score++
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' }
  if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-orange-500' }
  if (score <= 3) return { score: 3, label: 'Good', color: 'bg-yellow-500' }
  if (score <= 4) return { score: 4, label: 'Strong', color: 'bg-emerald-500' }
  return { score: 5, label: 'Very Strong', color: 'bg-green-600' }
}

// ============== Sidebar Config ==============
const SIDEBAR_GROUPS = [
  {
    label: 'Content',
    items: [
      { id: 'hero' as Tab, label: 'Hero', icon: Home },
      { id: 'about' as Tab, label: 'About', icon: BookOpen },
      { id: 'highlights' as Tab, label: 'Highlights', icon: Camera },
      { id: 'packages' as Tab, label: 'Packages', icon: Package },
      { id: 'testimonials' as Tab, label: 'Testimonials', icon: MessageSquare },
      { id: 'faq' as Tab, label: 'FAQ', icon: HelpCircle },
      { id: 'contact' as Tab, label: 'Contact', icon: Phone },
      { id: 'footer' as Tab, label: 'Footer', icon: Globe },
    ],
  },
  {
    label: 'Media',
    items: [
      { id: 'blogs' as Tab, label: 'Blogs', icon: FileText },
      { id: 'gallery' as Tab, label: 'Gallery', icon: Image },
    ],
  },
  {
    label: 'Communication',
    items: [
      { id: 'inquiries' as Tab, label: 'Inquiries', icon: Inbox },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings' as Tab, label: 'Settings', icon: Settings },
      { id: 'users' as Tab, label: 'Users', icon: UserCog },
    ],
  },
]

// ============== Helper: save section content ==============
async function saveSectionContent(section: string, title: string, subtitle: string, content: string) {
  const res = await fetch('/api/section-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ section, title, subtitle, content, password: 'brajyatra2024' }),
  })
  if (!res.ok) throw new Error('Failed to save')
  return res.json()
}

// ============== Helper: get section data ==============
function getSectionField(sections: SectionData[], sectionId: string, field: 'title' | 'subtitle' | 'content') {
  const s = sections.find(s => s.section === sectionId)
  const defaults = DEFAULT_SECTION_CONTENT[sectionId]
  return s?.[field] ?? defaults?.[field] ?? (field === 'content' ? '' : null)
}

// ============== Admin Content ==============
export default function AdminContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('braj-admin-logged') === 'true'
    }
    return false
  })
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('braj-admin-user')
      if (stored) { try { return JSON.parse(stored) } catch { return null } }
    }
    return null
  })

  const handleLogin = (user: AdminUser) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
    localStorage.setItem('braj-admin-logged', 'true')
    localStorage.setItem('braj-admin-user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    localStorage.removeItem('braj-admin-logged')
    localStorage.removeItem('braj-admin-user')
  }

  const visibleGroups = useMemo(() => SIDEBAR_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => hasPermission(currentUser, item.id)),
  })).filter(group => group.items.length > 0), [currentUser])

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />
  }

  const userName = currentUser?.name || 'Admin'

  return (
    <div className="min-h-screen bg-gray-50/80 flex">
      {/* Desktop Sidebar */}
      <aside className={`bg-braj-dark-green text-white shrink-0 hidden lg:flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className={`p-4 border-b border-white/10 flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
          <img src="/logo.png" alt="Logo" width={36} height={36} className="rounded-full shrink-0" />
          {!sidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <h2 className="font-bold text-sm">Braj Yatra Admin</h2>
              <p className="text-braj-saffron text-xs">Management Panel</p>
            </motion.div>
          )}
        </div>
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {/* Dashboard */}
          <div className="relative">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'dashboard'
                  ? 'bg-braj-saffron text-braj-dark-green'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? 'Dashboard' : undefined}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && 'Dashboard'}
            </button>
            {activeTab === 'dashboard' && (
              <motion.div
                layoutId="sidebar-indicator"
                className="absolute left-0 top-1 bottom-1 w-1 bg-braj-saffron rounded-r-full"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </div>

          {visibleGroups.map(group => (
            <div key={group.label}>
              {!sidebarCollapsed && (
                <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold px-3 pt-3 pb-1">{group.label}</p>
              )}
              {sidebarCollapsed && <div className="border-t border-white/10 my-2" />}
              {group.items.map(item => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-braj-saffron text-braj-dark-green'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!sidebarCollapsed && item.label}
                  </button>
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-1 bottom-1 w-1 bg-braj-saffron rounded-r-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </nav>
        {!sidebarCollapsed && currentUser && (
          <div className="px-3 py-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Shield className="w-3 h-3" />
              <span className="truncate">{currentUser.name} ({currentUser.role})</span>
            </div>
          </div>
        )}
        <div className="p-2 border-t border-white/10">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/50 hover:bg-white/10 hover:text-white transition-colors mb-1"
          >
            <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${sidebarCollapsed ? 'rotate-90' : '-rotate-90'}`} />
            {!sidebarCollapsed && 'Collapse'}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 w-72 h-full bg-braj-dark-green text-white flex flex-col lg:hidden"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="Logo" width={32} height={32} className="rounded-full" />
                  <div>
                    <h2 className="font-bold text-sm">Braj Yatra Admin</h2>
                    <p className="text-braj-saffron text-xs">Management Panel</p>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-1 text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                <button
                  onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false) }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' ? 'bg-braj-saffron text-braj-dark-green' : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </button>
                {visibleGroups.map(group => (
                  <div key={group.label}>
                    <p className="text-[10px] uppercase tracking-wider text-white/30 font-semibold px-4 pt-3 pb-1">{group.label}</p>
                    {group.items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === item.id ? 'bg-braj-saffron text-braj-dark-green' : 'text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <item.icon className="w-4 h-4" /> {item.label}
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
              <div className="p-3 border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-braj-dark-green text-white p-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 text-white/80 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
            <img src="/logo.png" alt="Logo" width={28} height={28} className="rounded-full" />
            <span className="font-bold text-sm">Admin</span>
          </div>
          <button onClick={handleLogout} className="p-2 text-white/70 hover:text-white">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={tabTransition}
            >
              {activeTab === 'dashboard' && <AdminDashboard onNavigate={setActiveTab} userName={userName} />}
              {activeTab === 'hero' && (hasPermission(currentUser, 'hero') ? <AdminHero onNavigate={setActiveTab} /> : <AccessDenied />)}
              {activeTab === 'about' && (hasPermission(currentUser, 'about') ? <AdminAbout /> : <AccessDenied />)}
              {activeTab === 'highlights' && (hasPermission(currentUser, 'highlights') ? <AdminHighlights /> : <AccessDenied />)}
              {activeTab === 'packages' && (hasPermission(currentUser, 'packages') ? <AdminPackages /> : <AccessDenied />)}
              {activeTab === 'testimonials' && (hasPermission(currentUser, 'testimonials') ? <AdminTestimonials /> : <AccessDenied />)}
              {activeTab === 'faq' && (hasPermission(currentUser, 'faq') ? <AdminFAQ /> : <AccessDenied />)}
              {activeTab === 'contact' && (hasPermission(currentUser, 'contact') ? <AdminContact /> : <AccessDenied />)}
              {activeTab === 'footer' && (hasPermission(currentUser, 'footer') ? <AdminFooter /> : <AccessDenied />)}
              {activeTab === 'blogs' && (hasPermission(currentUser, 'blogs') ? <AdminBlogs /> : <AccessDenied />)}
              {activeTab === 'inquiries' && (hasPermission(currentUser, 'inquiries') ? <AdminInquiries /> : <AccessDenied />)}
              {activeTab === 'gallery' && (hasPermission(currentUser, 'gallery') ? <AdminGallery /> : <AccessDenied />)}
              {activeTab === 'settings' && <AdminSettingsTab currentUser={currentUser} />}
              {activeTab === 'users' && (currentUser?.role === 'admin' ? <AdminUsers /> : <AccessDenied />)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

// ============== Access Denied ==============
function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6"
      >
        <Lock className="w-10 h-10 text-red-500" />
      </motion.div>
      <h2 className="text-2xl font-bold text-braj-dark-green mb-2">Access Denied</h2>
      <p className="text-muted-foreground text-center max-w-md">
        You do not have permission to access this section. Contact your administrator to request access.
      </p>
    </div>
  )
}

// ============== Login ==============
function AdminLogin({ onLogin }: { onLogin: (user: AdminUser) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username || undefined, password }),
      })
      if (res.ok) {
        const data = await res.json()
        const user: AdminUser = data.user || DEFAULT_USER
        onLogin(user)
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-braj-dark-green via-braj-teal to-braj-dark-green flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <img src="/logo.png" alt="Logo" width={64} height={64} className="mx-auto rounded-full mb-4" />
          </motion.div>
          <h1 className="text-2xl font-bold text-braj-dark-green">Admin Login</h1>
          <p className="text-muted-foreground text-sm mt-1">Vrindavan Braj Yatra Management</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin (optional for default login)"
              className="mt-1.5 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30"
            />
          </div>
          <div>
            <Label htmlFor="login-password">Password</Label>
            <div className="relative mt-1.5">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-braj-dark-green hover:bg-braj-teal text-white font-semibold py-6 rounded-xl transition-all duration-200"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Logging in...
              </span>
            ) : (
              'Login to Admin Panel'
            )}
          </Button>
        </form>
        <p className="text-center text-muted-foreground text-xs mt-6">
          Secure admin access for authorized personnel only
        </p>
      </motion.div>
    </div>
  )
}

// ============== Dashboard ==============
function AdminDashboard({ onNavigate, userName }: { onNavigate: (tab: Tab) => void; userName: string }) {
  const [stats, setStats] = useState({
    blogs: 0, inquiries: 0, unreadInquiries: 0, images: 0,
    highlights: 0, packages: 0, testimonials: 0, faqs: 0,
  })
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    Promise.all([
      fetch('/api/blogs').then(r => r.json()),
      fetch('/api/inquiries').then(r => r.json()),
      fetch('/api/gallery').then(r => r.json()),
      fetch('/api/section-content').then(r => r.json()),
    ]).then(([blogs, inquiries, images, sections]) => {
      const blogsArr = Array.isArray(blogs) ? blogs : []
      const inqArr = Array.isArray(inquiries) ? inquiries : []
      const imgArr = Array.isArray(images) ? images : []
      const secArr = Array.isArray(sections) ? sections : []

      const countItems = (sectionId: string) => {
        const sec = secArr.find((s: SectionData) => s.section === sectionId)
        const content = sec?.content ?? DEFAULT_SECTION_CONTENT[sectionId]?.content
        if (!content) return 0
        try {
          const parsed = JSON.parse(content)
          if (Array.isArray(parsed)) return parsed.length
          if (parsed?.packages && Array.isArray(parsed.packages)) return parsed.packages.length
          return 0
        } catch { return 0 }
      }

      setStats({
        blogs: blogsArr.length,
        inquiries: inqArr.length,
        unreadInquiries: inqArr.filter((i: Inquiry) => !i.read).length,
        images: imgArr.length,
        highlights: countItems('highlights'),
        packages: countItems('packages'),
        testimonials: countItems('testimonials'),
        faqs: countItems('faq'),
      })
      setRecentInquiries(inqArr.slice(0, 5))
    }).catch(() => {})
  }, [])

  const statCards = [
    { label: 'Highlights', value: stats.highlights, icon: Camera, gradient: 'from-rose-500 to-pink-600', tab: 'highlights' as Tab },
    { label: 'Packages', value: stats.packages, icon: Package, gradient: 'from-amber-500 to-orange-600', tab: 'packages' as Tab },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, gradient: 'from-violet-500 to-purple-600', tab: 'testimonials' as Tab },
    { label: 'FAQs', value: stats.faqs, icon: HelpCircle, gradient: 'from-cyan-500 to-teal-600', tab: 'faq' as Tab },
    { label: 'Blogs', value: stats.blogs, icon: FileText, gradient: 'from-emerald-500 to-green-600', tab: 'blogs' as Tab },
    { label: 'Gallery', value: stats.images, icon: Image, gradient: 'from-pink-500 to-rose-600', tab: 'gallery' as Tab },
    { label: 'Inquiries', value: stats.inquiries, icon: Inbox, gradient: 'from-sky-500 to-blue-600', tab: 'inquiries' as Tab },
    { label: 'Unread', value: stats.unreadInquiries, icon: AlertCircle, gradient: 'from-red-500 to-red-600', tab: 'inquiries' as Tab },
  ]

  const greeting = () => {
    const h = currentTime.getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div>
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-braj-dark-green">{greeting()}, {userName}! 🙏</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} &bull;{' '}
          {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
      >
        {statCards.map(card => (
          <motion.button
            key={card.label}
            variants={staggerItem}
            onClick={() => onNavigate(card.tab)}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow text-left group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            <div className={`w-9 h-9 bg-gradient-to-br ${card.gradient} rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200`}>
              <card.icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-xl font-bold text-braj-dark-green">
              <AnimatedCounter target={card.value} />
            </p>
            <p className="text-muted-foreground text-xs">{card.label}</p>
          </motion.button>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { onClick: () => onNavigate('highlights'), label: 'Add Highlight', icon: Plus, color: 'bg-braj-dark-green hover:bg-braj-teal' },
          { onClick: () => onNavigate('packages'), label: 'Add Package', icon: Package, color: 'bg-braj-teal hover:bg-braj-dark-green' },
          { onClick: () => onNavigate('blogs'), label: 'New Blog', icon: FileText, color: 'bg-braj-gold hover:bg-braj-saffron' },
        ].map(action => (
          <motion.button
            key={action.label}
            onClick={action.onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${action.color} text-white rounded-xl p-4 transition-colors flex items-center gap-2 text-sm font-medium`}
          >
            <action.icon className="w-4 h-4" /> {action.label}
          </motion.button>
        ))}
        <a href="/" target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-braj-saffron text-white rounded-xl p-4 hover:bg-braj-gold transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Globe className="w-4 h-4" /> View Website
          </motion.div>
        </a>
      </div>

      {/* Recent Inquiries */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-braj-dark-green flex items-center gap-2">
            <Inbox className="w-4 h-4" /> Recent Inquiries
            {stats.unreadInquiries > 0 && (
              <Badge className="bg-red-500 text-white text-[10px] px-1.5 py-0">{stats.unreadInquiries}</Badge>
            )}
          </h2>
          <button onClick={() => onNavigate('inquiries')} className="text-braj-teal text-sm font-medium hover:underline">
            View All
          </button>
        </div>
        {recentInquiries.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <Inbox className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No inquiries yet</p>
            <p className="text-xs mt-1">Inquiries from the contact form will appear here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentInquiries.map(inq => (
              <div key={inq.id} className={`p-4 flex items-center justify-between transition-colors hover:bg-gray-50 ${!inq.read ? 'bg-braj-light-gold/30' : ''}`}>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-braj-dark-green truncate">
                    {inq.name} {!inq.read && <span className="w-2 h-2 bg-braj-saffron rounded-full inline-block ml-1" />}
                  </p>
                  <p className="text-muted-foreground text-xs truncate">{inq.message}</p>
                </div>
                <div className="text-xs text-muted-foreground ml-4 shrink-0">
                  {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

// ============== Hero Editor ==============
function AdminHero({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [sections, setSections] = useState<SectionData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchSections = useCallback(() => {
    fetch('/api/section-content')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSections(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchSections() }, [fetchSections])

  const title = getSectionField(sections, 'hero', 'title') || ''
  const subtitle = getSectionField(sections, 'hero', 'subtitle') || ''
  const rawContent = getSectionField(sections, 'hero', 'content') || '{}'

  const [editTitle, setEditTitle] = useState(title)
  const [editSubtitle, setEditSubtitle] = useState(subtitle)

  let parsed: Record<string, string> = {}
  try { parsed = JSON.parse(rawContent) } catch { parsed = {} }

  const [ctaPrimary, setCtaPrimary] = useState(parsed.ctaPrimary || '')
  const [ctaSecondary, setCtaSecondary] = useState(parsed.ctaSecondary || '')
  const [backgroundImage, setBackgroundImage] = useState(parsed.backgroundImage || '')

  useEffect(() => {
    if (sections.length > 0 || !loading) {
      setEditTitle(title)
      setEditSubtitle(subtitle)
      let p: Record<string, string> = {}
      try { p = JSON.parse(rawContent) } catch { p = {} }
      setCtaPrimary(p.ctaPrimary || '')
      setCtaSecondary(p.ctaSecondary || '')
      setBackgroundImage(p.backgroundImage || '')
    }
  }, [loading])

  const handleSave = async () => {
    setSaving(true)
    try {
      const content = JSON.stringify({ ctaPrimary, ctaSecondary, backgroundImage })
      await saveSectionContent('hero', editTitle, editSubtitle, content)
      toast.success('Hero section saved!')
      fetchSections()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="hero" onSave={handleSave} saving={saving} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
          <motion.div variants={staggerItem} className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            <div>
              <Label>Title</Label>
              <Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="Hero title" />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Textarea value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={3} placeholder="Hero subtitle" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>CTA Primary Text</Label>
                <Input value={ctaPrimary} onChange={e => setCtaPrimary(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="Explore Packages" />
              </div>
              <div>
                <Label>CTA Secondary Text</Label>
                <Input value={ctaSecondary} onChange={e => setCtaSecondary(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="Watch Yatra Video" />
              </div>
            </div>
            <div>
              <Label>Background Image URL</Label>
              <Input value={backgroundImage} onChange={e => setBackgroundImage(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="https://..." />
              {backgroundImage && (
                <img src={backgroundImage} alt="Preview" className="mt-2 rounded-lg h-24 object-cover w-full" />
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-braj-dark-green text-sm">Live Preview</h3>
          </div>
          <div className="relative h-80 bg-braj-dark-green overflow-hidden">
            {backgroundImage && (
              <img src={backgroundImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-white text-xl font-bold mb-2">{editTitle || 'Hero Title'}</h2>
              <p className="text-white/80 text-xs mb-4 line-clamp-2">{editSubtitle || 'Hero subtitle goes here'}</p>
              <div className="flex gap-2">
                {ctaPrimary && <span className="px-3 py-1 bg-braj-saffron text-braj-dark-green text-xs rounded-full font-medium">{ctaPrimary}</span>}
                {ctaSecondary && <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full">{ctaSecondary}</span>}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// ============== About Editor ==============
function AdminAbout() {
  const [sections, setSections] = useState<SectionData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editTitle, setEditTitle] = useState('')
  const [editSubtitle, setEditSubtitle] = useState('')
  const [story, setStory] = useState('')
  const [mission, setMission] = useState('')
  const [vision, setVision] = useState('')
  const [image, setImage] = useState('')
  const [whyChooseUs, setWhyChooseUs] = useState<{ title: string; desc: string }[]>([])
  const [editingWcu, setEditingWcu] = useState<number | null>(null)
  const [showWcuForm, setShowWcuForm] = useState(false)
  const [wcuForm, setWcuForm] = useState({ title: '', desc: '' })

  const fetchSections = useCallback(() => {
    fetch('/api/section-content')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setSections(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchSections() }, [fetchSections])

  useEffect(() => {
    if (!loading) {
      const t = getSectionField(sections, 'about', 'title') || ''
      const st = getSectionField(sections, 'about', 'subtitle') || ''
      const raw = getSectionField(sections, 'about', 'content') || '{}'
      setEditTitle(t)
      setEditSubtitle(st)
      try {
        const p = JSON.parse(raw)
        setStory(p.story || '')
        setMission(p.mission || '')
        setVision(p.vision || '')
        setImage(p.image || '')
        setWhyChooseUs(p.whyChooseUs || [])
      } catch { /* empty */ }
    }
  }, [loading])

  const handleSave = async () => {
    setSaving(true)
    try {
      const content = JSON.stringify({ story, mission, vision, image, whyChooseUs })
      await saveSectionContent('about', editTitle, editSubtitle, content)
      toast.success('About section saved!')
      fetchSections()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const addWcu = () => {
    if (!wcuForm.title.trim()) return
    if (editingWcu !== null) {
      const updated = [...whyChooseUs]
      updated[editingWcu] = wcuForm
      setWhyChooseUs(updated)
      setEditingWcu(null)
    } else {
      setWhyChooseUs([...whyChooseUs, wcuForm])
    }
    setWcuForm({ title: '', desc: '' })
    setShowWcuForm(false)
  }

  const removeWcu = (idx: number) => {
    setWhyChooseUs(whyChooseUs.filter((_, i) => i !== idx))
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="about" onSave={handleSave} saving={saving} />

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Title</Label><Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" /></div>
            <div><Label>Subtitle</Label><Input value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" /></div>
          </div>
          <div><Label>Our Story</Label><Textarea value={story} onChange={e => setStory(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={4} /></div>
          <div><Label>Our Mission</Label><Textarea value={mission} onChange={e => setMission(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={3} /></div>
          <div><Label>Our Vision</Label><Textarea value={vision} onChange={e => setVision(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={3} /></div>
          <div>
            <Label>Section Image URL</Label>
            <Input value={image} onChange={e => setImage(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="https://..." />
            {image && <img src={image} alt="About" className="mt-2 rounded-lg h-24 object-cover" />}
          </div>
        </motion.div>

        {/* Why Choose Us Items */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-braj-dark-green flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-braj-saffron" /> Why Choose Us Items
            </h3>
            <Button size="sm" onClick={() => { setShowWcuForm(true); setEditingWcu(null); setWcuForm({ title: '', desc: '' }) }} className="bg-braj-teal hover:bg-braj-dark-green text-white gap-1">
              <Plus className="w-3 h-3" /> Add Item
            </Button>
          </div>

          {showWcuForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-braj-cream/30 rounded-lg p-4 mb-4 space-y-3"
            >
              <Input value={wcuForm.title} onChange={e => setWcuForm({ ...wcuForm, title: e.target.value })} placeholder="Item title" className="transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" />
              <Textarea value={wcuForm.desc} onChange={e => setWcuForm({ ...wcuForm, desc: e.target.value })} placeholder="Item description" rows={2} className="transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" />
              <div className="flex gap-2">
                <Button size="sm" onClick={addWcu} className="bg-braj-dark-green text-white">{editingWcu !== null ? 'Update' : 'Add'}</Button>
                <Button size="sm" variant="outline" onClick={() => { setShowWcuForm(false); setEditingWcu(null) }}>Cancel</Button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={cardHover}
                className="border rounded-xl p-3 flex items-start justify-between gap-2 transition-shadow"
              >
                <div>
                  <p className="font-medium text-sm text-braj-dark-green">{item.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.desc}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => { setEditingWcu(idx); setShowWcuForm(true); setWcuForm(item) }} className="p-1 text-braj-teal hover:bg-braj-teal/10 rounded-lg transition-colors">
                    <Edit className="w-3 h-3" />
                  </button>
                  <button onClick={() => removeWcu(idx)} className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          {whyChooseUs.length === 0 && !showWcuForm && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>No items yet. Click &quot;Add Item&quot; to get started.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// ============== Highlights Editor ==============
interface HighlightItem {
  title: string; description: string; image: string; link: string;
}

function AdminHighlights() {
  const [sections, setSections] = useState<SectionData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<HighlightItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [form, setForm] = useState<HighlightItem>({ title: '', description: '', image: '', link: '' })

  const fetchSections = useCallback(() => {
    fetch('/api/section-content')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSections(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchSections() }, [fetchSections])

  const [sectionTitle, setSectionTitle] = useState('')
  const [sectionSubtitle, setSectionSubtitle] = useState('')

  useEffect(() => {
    if (!loading) {
      const title = getSectionField(sections, 'highlights', 'title') || ''
      const subtitle = getSectionField(sections, 'highlights', 'subtitle') || ''
      const raw = getSectionField(sections, 'highlights', 'content') || '[]'
      setSectionTitle(title)
      setSectionSubtitle(subtitle)
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      } catch { setItems([]) }
    }
  }, [loading])

  const openAdd = () => {
    setEditIndex(null)
    setForm({ title: '', description: '', image: '', link: '' })
    setShowForm(true)
  }

  const openEdit = (idx: number) => {
    setEditIndex(idx)
    setForm(items[idx])
    setShowForm(true)
  }

  const handleFormSave = () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    if (editIndex !== null) {
      const updated = [...items]
      updated[editIndex] = form
      setItems(updated)
    } else {
      setItems([...items, form])
    }
    setShowForm(false)
    setEditIndex(null)
  }

  const handleDelete = (idx: number) => {
    if (!confirm('Delete this highlight?')) return
    setItems(items.filter((_, i) => i !== idx))
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      await saveSectionContent('highlights', sectionTitle, sectionSubtitle, JSON.stringify(items))
      toast.success('Highlights saved!')
      fetchSections()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-braj-dark-green">Highlights</h1>
            <p className="text-muted-foreground text-sm">{items.length} sacred destinations</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={openAdd} className="bg-braj-teal hover:bg-braj-dark-green text-white gap-2">
            <Plus className="w-4 h-4" /> Add Highlight
          </Button>
          <Button onClick={handleSaveAll} disabled={saving} className="bg-braj-dark-green hover:bg-braj-teal text-white gap-2">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      {/* Section Title/Subtitle */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Section Title</Label><Input value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" /></div>
          <div><Label>Section Subtitle</Label><Input value={sectionSubtitle} onChange={e => setSectionSubtitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" /></div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-6"
        >
          <h3 className="font-bold text-braj-dark-green mb-4">{editIndex !== null ? 'Edit Highlight' : 'Add New Highlight'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="Vrindavan — The Playground of Krishna" /></div>
              <div><Label>Link</Label><Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="/destinations/vrindavan" /></div>
            </div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={2} placeholder="Highlight description" /></div>
            <div>
              <Label>Image URL</Label>
              <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="https://..." />
              {form.image && <img src={form.image} alt="Preview" className="mt-2 rounded-lg h-20 object-cover" />}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleFormSave} className="bg-braj-dark-green text-white gap-2"><Save className="w-4 h-4" /> {editIndex !== null ? 'Update' : 'Add'}</Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditIndex(null) }}>Cancel</Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Items Grid */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <motion.div key={idx} variants={staggerItem} whileHover={cardHover} className="bg-white rounded-xl shadow-sm overflow-hidden group">
            {item.image && (
              <div className="relative h-36">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-2 left-3 text-white font-bold text-sm drop-shadow">{item.title}</h3>
              </div>
            )}
            <div className="p-4">
              {!item.image && <h3 className="font-bold text-braj-dark-green text-sm mb-1">{item.title}</h3>}
              <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{item.description}</p>
              {item.link && <p className="text-braj-teal text-xs truncate mb-3">{item.link}</p>}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => openEdit(idx)} className="gap-1 text-xs">
                  <Edit className="w-3 h-3" /> Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(idx)} className="gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-3 h-3" /> Delete
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {items.length === 0 && !showForm && (
        <div className="text-center py-16 text-muted-foreground">
          <Camera className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No highlights yet</p>
          <p className="text-xs mt-1">Add sacred destinations for your Braj Yatra</p>
          <Button onClick={openAdd} variant="outline" className="mt-3 gap-2"><Plus className="w-4 h-4" /> Add First Highlight</Button>
        </div>
      )}
    </div>
  )
}

// ============== Packages Editor ==============
interface PackageItem {
  id: string; name: string; price: string; pricePer: string; duration: string;
  places: string[]; inclusions: string[]; exclusions: string[];
  idealFor: string; popular: boolean; color: string;
}

function AdminPackages() {
  const [sections, setSections] = useState<SectionData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<PackageItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [form, setForm] = useState<PackageItem>({
    id: '', name: '', price: '', pricePer: 'per person', duration: '',
    places: [], inclusions: [], exclusions: [], idealFor: '', popular: false, color: 'braj-teal',
  })
  const [placesText, setPlacesText] = useState('')
  const [inclusionsText, setInclusionsText] = useState('')
  const [exclusionsText, setExclusionsText] = useState('')
  const [sectionTitle, setSectionTitle] = useState('')
  const [sectionSubtitle, setSectionSubtitle] = useState('')
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const fetchSections = useCallback(() => {
    fetch('/api/section-content')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSections(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchSections() }, [fetchSections])

  useEffect(() => {
    if (!loading) {
      const t = getSectionField(sections, 'packages', 'title') || ''
      const st = getSectionField(sections, 'packages', 'subtitle') || ''
      const raw = getSectionField(sections, 'packages', 'content') || '{}'
      setSectionTitle(t)
      setSectionSubtitle(st)
      try {
        const p = JSON.parse(raw)
        if (p?.packages && Array.isArray(p.packages)) setItems(p.packages)
      } catch { /* empty */ }
    }
  }, [loading])

  const openAdd = () => {
    setEditIndex(null)
    setForm({ id: `pkg-${Date.now()}`, name: '', price: '', pricePer: 'per person', duration: '', places: [], inclusions: [], exclusions: [], idealFor: '', popular: false, color: 'braj-teal' })
    setPlacesText('')
    setInclusionsText('')
    setExclusionsText('')
    setShowForm(true)
  }

  const openEdit = (idx: number) => {
    setEditIndex(idx)
    const item = items[idx]
    setForm(item)
    setPlacesText(item.places.join('\n'))
    setInclusionsText(item.inclusions.join('\n'))
    setExclusionsText(item.exclusions.join('\n'))
    setShowForm(true)
  }

  const handleFormSave = () => {
    if (!form.name.trim()) { toast.error('Package name is required'); return }
    const finalForm = {
      ...form,
      places: placesText.split('\n').map(s => s.trim()).filter(Boolean),
      inclusions: inclusionsText.split('\n').map(s => s.trim()).filter(Boolean),
      exclusions: exclusionsText.split('\n').map(s => s.trim()).filter(Boolean),
    }
    if (editIndex !== null) {
      const updated = [...items]
      updated[editIndex] = finalForm
      setItems(updated)
    } else {
      setItems([...items, { ...finalForm, id: finalForm.id || `pkg-${Date.now()}` }])
    }
    setShowForm(false)
    setEditIndex(null)
  }

  const handleDelete = (idx: number) => {
    if (!confirm('Delete this package?')) return
    setItems(items.filter((_, i) => i !== idx))
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      await saveSectionContent('packages', sectionTitle, sectionSubtitle, JSON.stringify({ packages: items }))
      toast.success('Packages saved!')
      fetchSections()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const colorOptions = [
    { value: 'braj-teal', label: 'Teal', bg: 'bg-braj-teal' },
    { value: 'braj-dark-green', label: 'Dark Green', bg: 'bg-braj-dark-green' },
    { value: 'braj-gold', label: 'Gold', bg: 'bg-braj-gold' },
    { value: 'braj-saffron', label: 'Saffron', bg: 'bg-braj-saffron' },
  ]

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-braj-dark-green">Packages</h1>
            <p className="text-muted-foreground text-sm">{items.length} yatra packages</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={openAdd} className="bg-braj-teal hover:bg-braj-dark-green text-white gap-2">
            <Plus className="w-4 h-4" /> Add Package
          </Button>
          <Button onClick={handleSaveAll} disabled={saving} className="bg-braj-dark-green hover:bg-braj-teal text-white gap-2">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      {/* Section Title/Subtitle */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Section Title</Label><Input value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" /></div>
          <div><Label>Section Subtitle</Label><Input value={sectionSubtitle} onChange={e => setSectionSubtitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" /></div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-6"
        >
          <h3 className="font-bold text-braj-dark-green mb-4">{editIndex !== null ? 'Edit Package' : 'Add New Package'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="Same Day Braj Darshan" /></div>
              <div><Label>Price</Label><Input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="₹1,499" /></div>
              <div><Label>Price Per</Label><Input value={form.pricePer} onChange={e => setForm({ ...form, pricePer: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="per person" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Duration</Label><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="1 Day" /></div>
              <div><Label>Ideal For</Label><Input value={form.idealFor} onChange={e => setForm({ ...form, idealFor: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="Devotees with limited time" /></div>
            </div>
            <div>
              <Label>Places (one per line)</Label>
              <Textarea value={placesText} onChange={e => setPlacesText(e.target.value)} className="mt-1 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={4} placeholder="Vrindavan Temple Tour&#10;Banke Bihari Darshan&#10;ISKCON Temple" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Inclusions (one per line)</Label>
                <Textarea value={inclusionsText} onChange={e => setInclusionsText(e.target.value)} className="mt-1 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={4} placeholder="AC Vehicle&#10;Pickup & Drop" />
              </div>
              <div>
                <Label>Exclusions (one per line)</Label>
                <Textarea value={exclusionsText} onChange={e => setExclusionsText(e.target.value)} className="mt-1 font-mono text-sm transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={4} placeholder="Meals&#10;Pooja Samagri" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.popular} onCheckedChange={checked => setForm({ ...form, popular: checked })} />
                <Label>Popular Badge</Label>
              </div>
              <div className="flex items-center gap-2">
                <Label>Color:</Label>
                <div className="flex gap-1">
                  {colorOptions.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setForm({ ...form, color: c.value })}
                      className={`w-7 h-7 rounded-full ${c.bg} ${form.color === c.value ? 'ring-2 ring-offset-2 ring-braj-dark-green' : ''} transition-transform hover:scale-110`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleFormSave} className="bg-braj-dark-green text-white gap-2"><Save className="w-4 h-4" /> {editIndex !== null ? 'Update' : 'Add'}</Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditIndex(null) }}>Cancel</Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Package Cards */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <motion.div key={idx} variants={staggerItem} whileHover={cardHover} className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 border-${item.color}`}>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-braj-dark-green">{item.name}</h3>
                    {item.popular && <Badge className="bg-braj-saffron text-white text-[10px]">Popular</Badge>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-braj-saffron font-bold">{item.price}</span>
                    <span className="text-muted-foreground text-xs">{item.pricePer}</span>
                    <span className="text-muted-foreground text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {item.duration}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(idx)} className="p-1.5 text-braj-teal hover:bg-braj-teal/10 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(idx)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)} className="text-braj-teal text-xs font-medium flex items-center gap-1 hover:underline">
                {expandedIdx === idx ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {expandedIdx === idx ? 'Hide Details' : 'Show Details'}
              </button>
              <AnimatePresence>
                {expandedIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-3 text-xs">
                      <div>
                        <p className="font-semibold text-braj-dark-green mb-1">Places:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                          {item.places.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-green-700 mb-1">Inclusions:</p>
                        <ul className="list-disc list-inside text-green-600 space-y-0.5">
                          {item.inclusions.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-red-600 mb-1">Exclusions:</p>
                        <ul className="list-disc list-inside text-red-500 space-y-0.5">
                          {item.exclusions.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                      {item.idealFor && <p className="text-muted-foreground"><span className="font-semibold">Ideal For:</span> {item.idealFor}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </motion.div>
      {items.length === 0 && !showForm && (
        <div className="text-center py-16 text-muted-foreground">
          <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No packages yet</p>
          <p className="text-xs mt-1">Create yatra packages for devotees</p>
          <Button onClick={openAdd} variant="outline" className="mt-3 gap-2"><Plus className="w-4 h-4" /> Add First Package</Button>
        </div>
      )}
    </div>
  )
}

// ============== Testimonials Editor ==============
interface TestimonialItem {
  name: string; location: string; quote: string; rating: number; package: string;
}

function AdminTestimonials() {
  const [sections, setSections] = useState<SectionData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<TestimonialItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [form, setForm] = useState<TestimonialItem>({ name: '', location: '', quote: '', rating: 5, package: '' })
  const [sectionTitle, setSectionTitle] = useState('')
  const [sectionSubtitle, setSectionSubtitle] = useState('')

  const fetchSections = useCallback(() => {
    fetch('/api/section-content')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setSections(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { fetchSections() }, [fetchSections])

  useEffect(() => {
    if (!loading) {
      const t = getSectionField(sections, 'testimonials', 'title') || ''
      const st = getSectionField(sections, 'testimonials', 'subtitle') || ''
      const raw = getSectionField(sections, 'testimonials', 'content') || '[]'
      setSectionTitle(t)
      setSectionSubtitle(st)
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setItems(parsed)
      } catch { setItems([]) }
    }
  }, [loading])

  const openAdd = () => {
    setEditIndex(null)
    setForm({ name: '', location: '', quote: '', rating: 5, package: '' })
    setShowForm(true)
  }

  const openEdit = (idx: number) => {
    setEditIndex(idx)
    setForm(items[idx])
    setShowForm(true)
  }

  const handleFormSave = () => {
    if (!form.name.trim() || !form.quote.trim()) { toast.error('Name and quote are required'); return }
    if (editIndex !== null) {
      const updated = [...items]
      updated[editIndex] = form
      setItems(updated)
    } else {
      setItems([...items, form])
    }
    setShowForm(false)
    setEditIndex(null)
  }

  const handleDelete = (idx: number) => {
    if (!confirm('Delete this testimonial?')) return
    setItems(items.filter((_, i) => i !== idx))
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      await saveSectionContent('testimonials', sectionTitle, sectionSubtitle, JSON.stringify(items))
      toast.success('Testimonials saved!')
      fetchSections()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-braj-dark-green">Testimonials</h1>
            <p className="text-muted-foreground text-sm">{items.length} devotee reviews</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={openAdd} className="bg-braj-teal hover:bg-braj-dark-green text-white gap-2">
            <Plus className="w-4 h-4" /> Add Testimonial
          </Button>
          <Button onClick={handleSaveAll} disabled={saving} className="bg-braj-dark-green hover:bg-braj-teal text-white gap-2">
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save All'}
          </Button>
        </div>
      </div>

      {/* Section Title/Subtitle */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Section Title</Label><Input value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" /></div>
          <div><Label>Section Subtitle</Label><Input value={sectionSubtitle} onChange={e => setSectionSubtitle(e.target.value)} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" /></div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-6"
        >
          <h3 className="font-bold text-braj-dark-green mb-4">{editIndex !== null ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="Suresh Sharma" /></div>
              <div><Label>Location</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="Delhi" /></div>
            </div>
            <div><Label>Quote *</Label><Textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" rows={3} placeholder="Their testimonial..." /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Rating</Label>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onClick={() => setForm({ ...form, rating: star })} className="p-0.5 transition-transform hover:scale-125">
                      <Star className={`w-6 h-6 ${star <= form.rating ? 'text-braj-saffron fill-braj-saffron' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div><Label>Package</Label><Input value={form.package} onChange={e => setForm({ ...form, package: e.target.value })} className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-braj-teal/30" placeholder="2-Day Braj Yatra" /></div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleFormSave} className="bg-braj-dark-green text-white gap-2"><Save className="w-4 h-4" /> {editIndex !== null ? 'Update' : 'Add'}</Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setEditIndex(null) }}>Cancel</Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Testimonial Cards */}
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <motion.div key={idx} variants={staggerItem} whileHover={cardHover} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-4 h-4 ${star <= item.rating ? 'text-braj-saffron fill-braj-saffron' : 'text-gray-200'}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic line-clamp-3 mb-3">&ldquo;{item.quote}&rdquo;</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-braj-dark-green">{item.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(idx)} className="p-1.5 text-braj-teal hover:bg-braj-teal/10 rounded-lg transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(idx)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {item.package && <Badge className="mt-2 bg-braj-cream text-braj-dark-green text-[10px]">{item.package}</Badge>}
          </motion.div>
        ))}
      </motion.div>
      {items.length === 0 && !showForm && (
        <div className="text-center py-16 text-muted-foreground">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No testimonials yet</p>
          <p className="text-xs mt-1">Share devotee experiences to build trust</p>
          <Button onClick={openAdd} variant="outline" className="mt-3 gap-2"><Plus className="w-4 h-4" /> Add First Testimonial</Button>
        </div>
      )}
    </div>
  )
}

// ============== FAQ Editor ==============
interface FaqItem { question: string; answer: string }

function AdminFAQ() {
  const [sections, setSections] = useState<SectionData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editTitle, setEditTitle] = useState('')
  const [editSubtitle, setEditSubtitle] = useState('')
  const [items, setItems] = useState<FaqItem[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [form, setForm] = useState<FaqItem>({ question: '', answer: '' })

  const fetchSections = useCallback(() => {
    fetch('/api/section-content').then(r => r.json()).then(data => { if (Array.isArray(data)) setSections(data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  useEffect(() => { fetchSections() }, [fetchSections])

  useEffect(() => {
    if (!loading) {
      const t = getSectionField(sections, 'faq', 'title') || ''
      const st = getSectionField(sections, 'faq', 'subtitle') || ''
      const raw = getSectionField(sections, 'faq', 'content') || '[]'
      setEditTitle(t); setEditSubtitle(st)
      try { const p = JSON.parse(raw); if (Array.isArray(p)) setItems(p) } catch { /* empty */ }
    }
  }, [loading])

  const handleSave = async () => {
    setSaving(true)
    try { await saveSectionContent('faq', editTitle, editSubtitle, JSON.stringify(items)); toast.success('FAQ saved!'); fetchSections() } catch { toast.error('Failed to save') } finally { setSaving(false) }
  }

  const addItem = () => {
    if (!form.question.trim()) return
    if (editIndex !== null) { const u = [...items]; u[editIndex] = form; setItems(u); setEditIndex(null) } else { setItems([...items, form]) }
    setForm({ question: '', answer: '' }); setShowForm(false)
  }
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i))
  const moveUp = (i: number) => { if (i <= 0) return; const arr = [...items]; [arr[i-1], arr[i]] = [arr[i], arr[i-1]]; setItems(arr) }
  const moveDown = (i: number) => { if (i >= items.length - 1) return; const arr = [...items]; [arr[i], arr[i+1]] = [arr[i+1], arr[i]]; setItems(arr) }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="faq" onSave={handleSave} saving={saving} />
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Section Title</Label><Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="mt-1" /></div>
          <div><Label>Section Subtitle</Label><Input value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} className="mt-1" /></div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-braj-dark-green">FAQ Items ({items.length})</h3>
          <Button size="sm" onClick={() => { setShowForm(true); setEditIndex(null); setForm({ question: '', answer: '' }) }} className="bg-braj-teal text-white gap-1"><Plus className="w-3 h-3" /> Add FAQ</Button>
        </div>
        {showForm && (
          <div className="bg-braj-cream/30 rounded-lg p-4 mb-4 space-y-3">
            <Input value={form.question} onChange={e => setForm({ ...form, question: e.target.value })} placeholder="Question" />
            <Textarea value={form.answer} onChange={e => setForm({ ...form, answer: e.target.value })} placeholder="Answer" rows={3} />
            <div className="flex gap-2">
              <Button size="sm" onClick={addItem} className="bg-braj-dark-green text-white">{editIndex !== null ? 'Update' : 'Add'}</Button>
              <Button size="sm" variant="outline" onClick={() => { setShowForm(false); setEditIndex(null) }}>Cancel</Button>
            </div>
          </div>
        )}
        <div className="space-y-2">
          {items.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="border rounded-lg p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-braj-dark-green">{item.question}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.answer}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  <button onClick={() => moveUp(idx)} className="p-1 text-muted-foreground hover:text-braj-teal rounded"><ArrowUp className="w-3 h-3" /></button>
                  <button onClick={() => moveDown(idx)} className="p-1 text-muted-foreground hover:text-braj-teal rounded"><ArrowDown className="w-3 h-3" /></button>
                  <button onClick={() => { setEditIndex(idx); setShowForm(true); setForm(item) }} className="p-1 text-braj-teal hover:bg-braj-teal/10 rounded"><Edit className="w-3 h-3" /></button>
                  <button onClick={() => removeItem(idx)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {items.length === 0 && !showForm && <div className="text-center py-12 text-muted-foreground text-sm"><HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-30" />No FAQs yet</div>}
      </div>
    </div>
  )
}

// ============== Contact Editor ==============
function AdminContact() {
  const [sections, setSections] = useState<SectionData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [editTitle, setEditTitle] = useState('')
  const [editSubtitle, setEditSubtitle] = useState('')
  const [ctaText, setCtaText] = useState('')
  const [businessHours, setBusinessHours] = useState('')
  const [whatsappMessage, setWhatsappMessage] = useState('')

  const fetchSections = useCallback(() => {
    fetch('/api/section-content').then(r => r.json()).then(data => { if (Array.isArray(data)) setSections(data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  useEffect(() => { fetchSections() }, [fetchSections])

  useEffect(() => {
    if (!loading) {
      const t = getSectionField(sections, 'contact', 'title') || ''
      const st = getSectionField(sections, 'contact', 'subtitle') || ''
      const raw = getSectionField(sections, 'contact', 'content') || '{}'
      setEditTitle(t); setEditSubtitle(st)
      try { const p = JSON.parse(raw); setCtaText(p.ctaText || ''); setBusinessHours(p.businessHours || ''); setWhatsappMessage(p.whatsappMessage || '') } catch { /* empty */ }
    }
  }, [loading])

  const handleSave = async () => {
    setSaving(true)
    try { await saveSectionContent('contact', editTitle, editSubtitle, JSON.stringify({ ctaText, businessHours, whatsappMessage })); toast.success('Contact section saved!'); fetchSections() } catch { toast.error('Failed to save') } finally { setSaving(false) }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="contact" onSave={handleSave} saving={saving} />
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Section Title</Label><Input value={editTitle} onChange={e => setEditTitle(e.target.value)} className="mt-1" /></div>
          <div><Label>Section Subtitle</Label><Input value={editSubtitle} onChange={e => setEditSubtitle(e.target.value)} className="mt-1" /></div>
        </div>
        <div><Label>CTA Text</Label><Textarea value={ctaText} onChange={e => setCtaText(e.target.value)} className="mt-1" rows={2} /></div>
        <div><Label>Business Hours</Label><Input value={businessHours} onChange={e => setBusinessHours(e.target.value)} className="mt-1" placeholder="Mon-Sat: 9AM-8PM" /></div>
        <div><Label>WhatsApp Default Message</Label><Textarea value={whatsappMessage} onChange={e => setWhatsappMessage(e.target.value)} className="mt-1" rows={2} placeholder="Hi, I'm interested in Braj Yatra..." /></div>
      </div>
    </div>
  )
}

// ============== Footer Editor ==============
function AdminFooter() {
  const [sections, setSections] = useState<SectionData[]>([])
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [description, setDescription] = useState('')
  const [copyright, setCopyright] = useState('')

  const fetchSections = useCallback(() => {
    fetch('/api/section-content').then(r => r.json()).then(data => { if (Array.isArray(data)) setSections(data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  useEffect(() => { fetchSections() }, [fetchSections])

  useEffect(() => {
    if (!loading) {
      const raw = getSectionField(sections, 'footer', 'content') || '{}'
      try { const p = JSON.parse(raw); setDescription(p.description || ''); setCopyright(p.copyright || '') } catch { /* empty */ }
    }
  }, [loading])

  const handleSave = async () => {
    setSaving(true)
    try { await saveSectionContent('footer', '', '', JSON.stringify({ description, copyright })); toast.success('Footer saved!'); fetchSections() } catch { toast.error('Failed to save') } finally { setSaving(false) }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="footer" onSave={handleSave} saving={saving} />
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
        <div><Label>Footer Description</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1" rows={3} /></div>
        <div><Label>Copyright Text</Label><Input value={copyright} onChange={e => setCopyright(e.target.value)} className="mt-1" placeholder="© 2024 Vrindavan Braj Yatra" /></div>
      </div>
    </div>
  )
}

// ============== Blog Management ==============
function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editBlog, setEditBlog] = useState<Blog | null>(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', category: 'yatra', featuredImage: '', published: false })

  const fetchBlogs = useCallback(() => {
    fetch('/api/blogs').then(r => r.json()).then(data => { if (Array.isArray(data)) setBlogs(data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  useEffect(() => { fetchBlogs() }, [fetchBlogs])

  const handleSave = async () => {
    const isEdit = !!editBlog
    const res = await fetch('/api/blogs', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(isEdit ? { id: editBlog.id, ...form } : form),
    })
    if (res.ok) { toast.success(isEdit ? 'Blog updated!' : 'Blog created!'); setShowForm(false); setEditBlog(null); fetchBlogs() } else { toast.error('Failed to save blog') }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog?')) return
    const res = await fetch('/api/blogs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) { toast.success('Blog deleted'); fetchBlogs() } else { toast.error('Failed to delete') }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="blogs" showSave={false} />
      <div className="flex justify-end mb-4">
        <Button onClick={() => { setShowForm(true); setEditBlog(null); setForm({ title: '', slug: '', excerpt: '', content: '', category: 'yatra', featuredImage: '', published: false }) }} className="bg-braj-dark-green text-white gap-2"><Plus className="w-4 h-4" /> New Blog</Button>
      </div>
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') })} className="mt-1" /></div>
            <div><Label>Slug</Label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="mt-1" /></div>
          </div>
          <div><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} className="mt-1" rows={2} /></div>
          <div><Label>Content (Markdown)</Label><Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="mt-1 font-mono text-sm" rows={10} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-1" /></div>
            <div><Label>Featured Image URL</Label><Input value={form.featuredImage} onChange={e => setForm({ ...form, featuredImage: e.target.value })} className="mt-1" /></div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.published} onCheckedChange={v => setForm({ ...form, published: v })} />
            <Label>Published</Label>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-braj-dark-green text-white">{editBlog ? 'Update Blog' : 'Create Blog'}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditBlog(null) }}>Cancel</Button>
          </div>
        </motion.div>
      )}
      <div className="space-y-3">
        {blogs.map(blog => (
          <motion.div key={blog.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-braj-dark-green truncate">{blog.title}</p>
                {blog.published ? <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">Published</Badge> : <Badge className="bg-gray-100 text-gray-500 text-[10px]">Draft</Badge>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{blog.category} &bull; {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
            <div className="flex gap-1 shrink-0">
              <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer"><Button size="sm" variant="ghost"><ExternalLink className="w-3.5 h-3.5" /></Button></a>
              <Button size="sm" variant="ghost" onClick={() => { setEditBlog(blog); setForm({ title: blog.title, slug: blog.slug, excerpt: blog.excerpt || '', content: blog.content, category: blog.category, featuredImage: blog.featuredImage || '', published: blog.published }); setShowForm(true) }}><Edit className="w-3.5 h-3.5" /></Button>
              <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(blog.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </motion.div>
        ))}
      </div>
      {blogs.length === 0 && !showForm && <div className="text-center py-16 text-muted-foreground"><FileText className="w-10 h-10 mx-auto mb-3 opacity-30" /><p>No blogs yet</p></div>}
    </div>
  )
}

// ============== Inquiries Management ==============
function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterRead, setFilterRead] = useState<'all' | 'unread' | 'read'>('all')

  const fetchInquiries = useCallback(() => {
    fetch('/api/inquiries').then(r => r.json()).then(data => { if (Array.isArray(data)) setInquiries(data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  useEffect(() => { fetchInquiries() }, [fetchInquiries])

  const markRead = async (id: string) => {
    await fetch('/api/inquiries', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, read: true }) })
    fetchInquiries()
  }
  const markAllRead = async () => {
    const unread = inquiries.filter(i => !i.read)
    await Promise.all(unread.map(i => fetch('/api/inquiries', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: i.id, read: true }) })))
    toast.success(`Marked ${unread.length} as read`); fetchInquiries()
  }
  const handleDelete = async (id: string) => {
    await fetch('/api/inquiries', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    toast.success('Inquiry deleted'); fetchInquiries()
  }

  const filtered = inquiries.filter(i => {
    if (filterRead === 'unread' && i.read) return false
    if (filterRead === 'read' && !i.read) return false
    if (search) { const s = search.toLowerCase(); return i.name.toLowerCase().includes(s) || i.email.toLowerCase().includes(s) || i.message.toLowerCase().includes(s) }
    return true
  })

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="inquiries" showSave={false} />
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input value={search} onChange={e => setSearch(e.target.value)} className="pl-10" placeholder="Search inquiries..." /></div>
        <div className="flex gap-2">
          <select value={filterRead} onChange={e => setFilterRead(e.target.value as typeof filterRead)} className="border rounded-lg px-3 py-2 text-sm bg-white">
            <option value="all">All</option><option value="unread">Unread</option><option value="read">Read</option>
          </select>
          <Button size="sm" variant="outline" onClick={markAllRead} className="gap-1"><CheckCircle className="w-3 h-3" /> Mark All Read</Button>
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map(inq => (
          <motion.div key={inq.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${!inq.read ? 'border-l-braj-saffron' : 'border-l-transparent'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-sm text-braj-dark-green">{inq.name}</p>
                  {!inq.read && <span className="w-2 h-2 bg-braj-saffron rounded-full" />}
                </div>
                <p className="text-xs text-muted-foreground">{inq.email} {inq.phone && <> &bull; {inq.phone}</>}</p>
                <p className="text-sm text-muted-foreground mt-1">{inq.message}</p>
                {inq.package && <Badge className="mt-1 bg-braj-cream text-braj-dark-green text-[10px]">{inq.package}</Badge>}
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <p className="text-[10px] text-muted-foreground">{new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
                <div className="flex gap-1">
                  {!inq.read && <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => markRead(inq.id)}><Eye className="w-3 h-3" /></Button>}
                  <a href={`mailto:${inq.email}`}><Button size="sm" variant="ghost" className="h-7"><Mail className="w-3 h-3" /></Button></a>
                  <Button size="sm" variant="ghost" className="h-7 text-red-500" onClick={() => handleDelete(inq.id)}><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && <div className="text-center py-16 text-muted-foreground"><Inbox className="w-10 h-10 mx-auto mb-3 opacity-30" /><p>No inquiries found</p></div>}
    </div>
  )
}

// ============== Gallery Management ==============
function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ src: '', alt: '', category: 'temples' })

  const fetchImages = useCallback(() => {
    fetch('/api/gallery').then(r => r.json()).then(data => { if (Array.isArray(data)) setImages(data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  useEffect(() => { fetchImages() }, [fetchImages])

  const handleAdd = async () => {
    const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) { toast.success('Image added!'); setShowForm(false); setForm({ src: '', alt: '', category: 'temples' }); fetchImages() } else { toast.error('Failed to add') }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return
    const res = await fetch('/api/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) { toast.success('Image deleted'); fetchImages() } else { toast.error('Failed to delete') }
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="gallery" showSave={false} />
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowForm(true)} className="bg-braj-dark-green text-white gap-2"><Plus className="w-4 h-4" /> Add Image</Button>
      </div>
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <div><Label>Image URL</Label><Input value={form.src} onChange={e => setForm({ ...form, src: e.target.value })} className="mt-1" placeholder="https://..." /></div>
          <div><Label>Alt Text</Label><Input value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} className="mt-1" /></div>
          <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-1" placeholder="temples, festivals, nature..." /></div>
          {form.src && <img src={form.src} alt={form.alt} className="w-32 h-24 object-cover rounded-lg" />}
          <div className="flex gap-2">
            <Button onClick={handleAdd} className="bg-braj-dark-green text-white">Add Image</Button>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </motion.div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <motion.div key={img.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <Button size="sm" variant="destructive" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={() => handleDelete(img.id)}><Trash2 className="w-4 h-4" /></Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-xs truncate">{img.alt}</p>
              <Badge className="text-[9px] bg-white/20 text-white">{img.category}</Badge>
            </div>
          </motion.div>
        ))}
      </div>
      {images.length === 0 && !showForm && <div className="text-center py-16 text-muted-foreground"><Camera className="w-10 h-10 mx-auto mb-3 opacity-30" /><p>No images yet</p></div>}
    </div>
  )
}

// ============== Settings Tab ==============
function AdminSettingsTab({ currentUser }: { currentUser: AdminUser | null }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [changing, setChanging] = useState(false)

  const handleChangePassword = async () => {
    if (newPassword.length < 6) { toast.error('Password must be at least 6 characters'); return }
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return }
    setChanging(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'changePassword', currentPassword, newPassword }),
      })
      if (res.ok) { toast.success('Password changed successfully!'); setCurrentPassword(''); setNewPassword(''); setConfirmPassword('') }
      else { const data = await res.json(); toast.error(data.error || 'Failed to change password') }
    } catch { toast.error('Network error') } finally { setChanging(false) }
  }

  const strength = getPasswordStrength(newPassword)
  const permissions = currentUser ? [
    { label: 'Hero', key: 'canEditHero' as keyof AdminUser },
    { label: 'About', key: 'canEditAbout' as keyof AdminUser },
    { label: 'Highlights', key: 'canEditHighlights' as keyof AdminUser },
    { label: 'Packages', key: 'canEditPackages' as keyof AdminUser },
    { label: 'Testimonials', key: 'canEditTestimonials' as keyof AdminUser },
    { label: 'FAQ', key: 'canEditFAQ' as keyof AdminUser },
    { label: 'Contact', key: 'canEditContact' as keyof AdminUser },
    { label: 'Footer', key: 'canEditFooter' as keyof AdminUser },
    { label: 'Blogs', key: 'canManageBlogs' as keyof AdminUser },
    { label: 'Gallery', key: 'canManageGallery' as keyof AdminUser },
    { label: 'Inquiries', key: 'canViewInquiries' as keyof AdminUser },
  ] : []

  return (
    <div>
      <TabHeader tab="settings" showSave={false} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-braj-dark-green mb-4 flex items-center gap-2"><Shield className="w-4 h-4" /> Account Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-muted-foreground">Username</span>
              <span className="text-sm font-medium text-braj-dark-green">{currentUser?.username || 'admin'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-sm text-muted-foreground">Name</span>
              <span className="text-sm font-medium text-braj-dark-green">{currentUser?.name || 'Admin'}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">Role</span>
              <Badge className={currentUser?.role === 'admin' ? 'bg-braj-saffron text-braj-dark-green' : 'bg-braj-teal text-white'}>{currentUser?.role || 'admin'}</Badge>
            </div>
          </div>
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-braj-dark-green mb-4 flex items-center gap-2"><Lock className="w-4 h-4" /> Change Password</h3>
          <div className="space-y-4">
            <div>
              <Label>Current Password</Label>
              <div className="relative mt-1">
                <Input type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="pr-10" />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            </div>
            <div>
              <Label>New Password</Label>
              <div className="relative mt-1">
                <Input type={showNew ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="pr-10" />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
              {newPassword && (
                <div className="mt-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= strength.score ? strength.color : 'bg-gray-200'} transition-colors duration-300`} />)}
                  </div>
                  <p className="text-xs mt-1 text-muted-foreground">{strength.label}</p>
                </div>
              )}
            </div>
            <div>
              <Label>Confirm New Password</Label>
              <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1" />
              {confirmPassword && confirmPassword !== newPassword && <p className="text-xs text-red-500 mt-1">Passwords do not match</p>}
            </div>
            <Button onClick={handleChangePassword} disabled={changing || !currentPassword || !newPassword || !confirmPassword} className="w-full bg-braj-dark-green hover:bg-braj-teal text-white">
              {changing ? <><RefreshCw className="w-4 h-4 animate-spin" /> Changing...</> : 'Change Password'}
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Permissions Overview */}
      {currentUser && currentUser.role !== 'admin' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-6 shadow-sm mt-6">
          <h3 className="font-bold text-braj-dark-green mb-4">Your Permissions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {permissions.map(perm => (
              <div key={perm.key} className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${currentUser[perm.key] ? 'bg-emerald-500' : 'bg-red-400'}`} />
                <span className={currentUser[perm.key] ? 'text-foreground' : 'text-muted-foreground'}>{perm.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ============== Users Management ==============
function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState<AdminUser | null>(null)
  const [form, setForm] = useState({ username: '', password: '', name: '', role: 'staff' as 'admin' | 'staff' })
  const [perms, setPerms] = useState<Record<string, boolean>>({
    canEditHero: false, canEditAbout: false, canEditHighlights: false, canEditPackages: false,
    canEditTestimonials: false, canEditFAQ: false, canEditContact: false, canEditFooter: false,
    canManageBlogs: false, canManageGallery: false, canViewInquiries: false,
  })

  const fetchUsers = useCallback(() => {
    fetch('/api/admin/users').then(r => r.json()).then(data => { if (Array.isArray(data)) setUsers(data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  useEffect(() => { fetchUsers() }, [fetchUsers])

  const handleSave = async () => {
    if (!form.username.trim() || (!editUser && !form.password.trim())) { toast.error('Username and password are required'); return }
    const isEdit = !!editUser
    const body = isEdit ? { id: editUser.id, ...form, ...(form.role === 'staff' ? perms : {}), ...(form.password ? {} : { password: undefined }) } : { ...form, ...perms }
    const res = await fetch('/api/admin/users', { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { toast.success(isEdit ? 'User updated!' : 'User created!'); setShowForm(false); setEditUser(null); fetchUsers() } else { toast.error('Failed to save user') }
  }

  const handleDelete = async (id: string) => {
    const adminCount = users.filter(u => u.role === 'admin').length
    const user = users.find(u => u.id === id)
    if (user?.role === 'admin' && adminCount <= 1) { toast.error('Cannot delete the last admin user'); return }
    if (!confirm('Delete this user?')) return
    const res = await fetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    if (res.ok) { toast.success('User deleted'); fetchUsers() } else { toast.error('Failed to delete') }
  }

  const openEdit = (user: AdminUser) => {
    setEditUser(user); setForm({ username: user.username, password: '', name: user.name, role: user.role as 'admin' | 'staff' })
    setPerms({
      canEditHero: user.canEditHero, canEditAbout: user.canEditAbout, canEditHighlights: user.canEditHighlights,
      canEditPackages: user.canEditPackages, canEditTestimonials: user.canEditTestimonials, canEditFAQ: user.canEditFAQ,
      canEditContact: user.canEditContact, canEditFooter: user.canEditFooter, canManageBlogs: user.canManageBlogs,
      canManageGallery: user.canManageGallery, canViewInquiries: user.canViewInquiries,
    })
    setShowForm(true)
  }

  const permLabels: Record<string, string> = {
    canEditHero: 'Hero', canEditAbout: 'About', canEditHighlights: 'Highlights', canEditPackages: 'Packages',
    canEditTestimonials: 'Testimonials', canEditFAQ: 'FAQ', canEditContact: 'Contact', canEditFooter: 'Footer',
    canManageBlogs: 'Blogs', canManageGallery: 'Gallery', canViewInquiries: 'Inquiries',
  }

  if (loading) return <LoadingSkeleton />

  return (
    <div>
      <TabHeader tab="users" showSave={false} />
      <div className="flex justify-end mb-4">
        <Button onClick={() => { setShowForm(true); setEditUser(null); setForm({ username: '', password: '', name: '', role: 'staff' }); setPerms({ canEditHero: false, canEditAbout: false, canEditHighlights: false, canEditPackages: false, canEditTestimonials: false, canEditFAQ: false, canEditContact: false, canEditFooter: false, canManageBlogs: false, canManageGallery: false, canViewInquiries: false }) }} className="bg-braj-saffron text-braj-dark-green gap-2"><Plus className="w-4 h-4" /> Add User</Button>
      </div>
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 shadow-sm mb-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Username</Label><Input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="mt-1" /></div>
            <div><Label>{editUser ? 'New Password (leave empty to keep)' : 'Password'}</Label><Input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="mt-1" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
            <div>
              <Label>Role</Label>
              <div className="flex gap-3 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="role" value="admin" checked={form.role === 'admin'} onChange={() => setForm({ ...form, role: 'admin' })} className="accent-braj-saffron" />
                  <span className="text-sm">Admin (Full Access)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="role" value="staff" checked={form.role === 'staff'} onChange={() => setForm({ ...form, role: 'staff' })} className="accent-braj-teal" />
                  <span className="text-sm">Staff (Custom Permissions)</span>
                </label>
              </div>
            </div>
          </div>
          {form.role === 'staff' && (
            <div>
              <Label className="mb-2 block">Permissions</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-braj-cream/30 rounded-lg p-4">
                {Object.entries(permLabels).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <Switch checked={perms[key] || false} onCheckedChange={v => setPerms({ ...perms, [key]: v })} />
                    <span className="text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-braj-dark-green text-white">{editUser ? 'Update User' : 'Create User'}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditUser(null) }}>Cancel</Button>
          </div>
        </motion.div>
      )}
      <div className="space-y-2">
        {users.map(user => (
          <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm text-braj-dark-green">{user.name || user.username}</p>
                <Badge className={user.role === 'admin' ? 'bg-braj-saffron text-braj-dark-green text-[10px]' : 'bg-braj-teal text-white text-[10px]'}>{user.role}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
              {user.role === 'staff' && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {Object.entries(permLabels).map(([key, label]) => user[key as keyof AdminUser] && <span key={key} className="text-[10px] bg-braj-cream text-braj-dark-green px-1.5 py-0.5 rounded">{label}</span>)}
                </div>
              )}
            </div>
            <div className="flex gap-1 shrink-0">
              <Button size="sm" variant="ghost" onClick={() => openEdit(user)}><Edit className="w-3.5 h-3.5" /></Button>
              <Button size="sm" variant="ghost" className="text-red-500" onClick={() => handleDelete(user.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          </motion.div>
        ))}
      </div>
      {users.length === 0 && !showForm && <div className="text-center py-16 text-muted-foreground"><Users className="w-10 h-10 mx-auto mb-3 opacity-30" /><p>No users found</p></div>}
    </div>
  )
}

// ============== Loading Skeleton ==============
function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-48" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[1,2,3,4].map(i => <div key={i} className="bg-gray-200 rounded-xl h-24" />)}
      </div>
      <div className="bg-gray-200 rounded-xl h-64" />
    </div>
  )
}
