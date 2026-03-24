'use client'

import Link from 'next/link'
import { NotificationBell } from './NotificationBell'
import { Sparkles, Layout, Calendar, Users, Target, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: Layout },
  { label: 'Events', href: '/events', icon: Calendar },
  { label: 'Teams', href: '/teams', icon: Target },
  { label: 'Projects', href: '/projects', icon: Sparkles },
  { label: 'Clubs', href: '/clubs', icon: Users },
]

export function Navbar({ userId }: { userId?: string }) {
  const pathname = usePathname()
  
  if (pathname.includes('/auth')) return null

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
           <Link href="/dashboard" className="group flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl group-hover:rotate-6 transition-transform">
                 <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-black italic uppercase tracking-tighter hidden sm:inline-block">SRM Connect</span>
           </Link>

           <nav className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase italic tracking-tighter transition-all ${
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                )
              })}
           </nav>
        </div>

        <div className="flex items-center gap-3">
           {userId ? (
             <>
               <NotificationBell userId={userId} />
               <Button variant="outline" size="icon" className="rounded-full border-2 h-10 w-10">
                  <User className="h-5 w-5" />
               </Button>
             </>
           ) : (
             <Link 
               href="/auth/login"
               className="text-xs font-black uppercase italic tracking-tighter py-2 px-6 bg-primary text-primary-foreground rounded-full"
             >
               Login
             </Link>
           )}
        </div>
      </div>
    </header>
  )
}
