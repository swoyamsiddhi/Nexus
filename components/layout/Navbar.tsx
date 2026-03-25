'use client'

import * as React from 'react'
import Link from 'next/link'
import { NotificationBell } from './NotificationBell'
import { Sparkles, Layout, Calendar, Users, Target, User, Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: Layout },
  { label: 'Events', href: '/events', icon: Calendar },
  { label: 'Teams', href: '/teams', icon: Target },
  { label: 'Projects', href: '/projects', icon: Sparkles },
  { label: 'Clubs', href: '/clubs', icon: Users },
]

export function Navbar({ userId }: { userId?: string }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const mounted = React.useState(false)

  React.useEffect(() => {
    mounted[1](true)
  }, [])
  
  if (pathname.includes('/auth')) return null

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
           <Link href="/dashboard" className="group flex items-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-95">
              <div className="bg-primary p-2 rounded-xl transition-all duration-500 group-hover:rotate-12 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:scale-110">
                 <Sparkles className="h-6 w-6 text-primary-foreground transition-transform duration-500 group-hover:rotate-[15deg]" />
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:inline-block">SRM Connect</span>
           </Link>

           <nav className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : 'text-muted-foreground hover:text-primary hover:bg-black/5 hover:shadow-sm'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                    {item.label}
                  </Link>
                )
              })}
           </nav>
        </div>

        <div className="flex items-center gap-3">
           {mounted[0] && (
             <Button 
               variant="outline" 
               size="icon" 
               className="rounded-full border-2 h-10 w-10 transition-all hover:scale-105 active:scale-95"
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
             >
               <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
               <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               <span className="sr-only">Toggle theme</span>
             </Button>
           )}

           {userId ? (
             <>
               <NotificationBell userId={userId} />

               <Link href="/dashboard">
                 <Button variant="outline" className="rounded-full border-2 px-4 gap-2 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 hover:bg-primary/5 active:scale-95">
                    <User className="h-4 w-4" />
                    <span className="font-semibold text-sm">Profile</span>
                 </Button>
               </Link>
             </>
           ) : (
               <Link 
                 href="/auth/login"
                 className="text-sm font-medium py-2 px-8 bg-black text-white rounded-full transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
               >
                 Login
               </Link>
           )}
        </div>
      </div>
    </header>
  )
}
