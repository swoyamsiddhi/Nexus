'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Bell, CalendarCheck, Megaphone, UserPlus, CheckCircle2, XCircle, MapPin, Code2, ShieldCheck, ShieldAlert, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { getNotifications, markNotificationAsRead, markAllAsRead } from '@/app/notifications/actions'
import { useRouter } from 'next/navigation'

interface Notification {
  id: number
  type: string
  message: string
  read: boolean
  reference_id: number | null
  created_at: string
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  event_registration: CalendarCheck,
  club_new_event: Megaphone,
  team_application_received: UserPlus,
  team_application_accepted: CheckCircle2,
  team_application_rejected: XCircle,
  going_out_interest: MapPin,
  project_collaboration_interest: Code2,
  organiser_approved: ShieldCheck,
  organiser_rejected: ShieldAlert,
}

const COLOR_MAP: Record<string, string> = {
  event_registration: 'text-blue-500',
  club_new_event: 'text-purple-500',
  team_application_received: 'text-orange-500',
  team_application_accepted: 'text-green-500',
  team_application_rejected: 'text-red-500',
  going_out_interest: 'text-cyan-500',
  project_collaboration_interest: 'text-indigo-500',
  organiser_approved: 'text-emerald-500',
  organiser_rejected: 'text-rose-500',
}

export function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [toast, setToast] = useState<Notification | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const fetchNotifications = useCallback(async () => {
    const data = await getNotifications(20) as Notification[]
    setNotifications(data)
    setUnreadCount(data.filter(n => !n.read).length)
  }, [])

  useEffect(() => {
    fetchNotifications()

    const channel = supabase
      .channel(`user-notifications-${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        (payload) => {
          const newNotif = payload.new as Notification
          setNotifications(prev => [newNotif, ...prev.slice(0, 19)])
          setUnreadCount(prev => prev + 1)
          
          // Show toast
          setToast(newNotif)
          setTimeout(() => setToast(null), 5000)
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        () => fetchNotifications()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId, supabase, fetchNotifications])

  const handleNotificationClick = async (notif: Notification) => {
    if (!notif.read) {
      await markNotificationAsRead(notif.id)
      setUnreadCount(prev => Math.max(0, prev - 1))
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n))
    }

    // Navigation logic
    switch (notif.type) {
      case 'team_application_received':
      case 'team_application_accepted':
      case 'team_application_rejected':
        router.push('/teams?tab=mine')
        break
      case 'project_collaboration_interest':
        router.push(notif.reference_id ? `/projects/${notif.reference_id}` : '/projects/mine')
        break
      case 'event_registration':
      case 'club_new_event':
        if (notif.reference_id) router.push(`/events/${notif.reference_id}`)
        break
      case 'going_out_interest':
        router.push('/going-out')
        break
      case 'organiser_approved':
      case 'organiser_rejected':
        router.push('/clubs')
        break
    }
  }

  const handleMarkAllAsRead = async () => {
    await markAllAsRead()
    setUnreadCount(0)
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger className="relative group rounded-full hover:bg-muted/50 p-2 transition-all outline-none">
          <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center p-0 bg-red-500 border-2 border-background animate-in zoom-in duration-300">
              <span className="text-[10px] font-bold leading-none">{unreadCount > 9 ? '9+' : unreadCount}</span>
            </Badge>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[380px] rounded-[2rem] p-4 border-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 bg-background">
          <div className="flex items-center justify-between px-2 mb-4">
             <h3 className="text-lg font-black italic uppercase tracking-tighter">Notifications</h3>
             <Button 
               variant="ghost" 
               size="sm" 
               className="text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/10 rounded-full h-8"
               onClick={handleMarkAllAsRead}
             >
               <Check className="h-3 w-3 mr-1.5" /> Mark all read
             </Button>
          </div>
          
          <DropdownMenuSeparator className="mb-4" />
          
          <div className="max-h-[420px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
             {notifications.length > 0 ? (
               notifications.map((notif) => {
                 const Icon = ICON_MAP[notif.type] || Bell
                 return (
                   <DropdownMenuItem 
                     key={notif.id}
                     className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all border-2 border-transparent hover:border-primary/20 ${!notif.read ? 'bg-primary/5 border-primary/10' : ''}`}
                     onClick={() => handleNotificationClick(notif)}
                   >
                     <div className={`mt-1 p-2 rounded-xl bg-background border shadow-sm ${COLOR_MAP[notif.type] || 'text-primary'}`}>
                        <Icon className="h-4 w-4" />
                     </div>
                     <div className="flex-1 space-y-1">
                        <p className={`text-xs leading-relaxed ${!notif.read ? 'font-bold' : 'font-medium text-muted-foreground'}`}>{notif.message}</p>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">
                           {formatDistanceToNow(new Date(notif.created_at))} ago
                        </p>
                     </div>
                     {!notif.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0 animate-pulse" />
                     )}
                   </DropdownMenuItem>
                 )
               })
             ) : (
               <div className="text-center py-12 space-y-3 opacity-40">
                  <Bell className="h-10 w-10 mx-auto" strokeWidth={1} />
                  <p className="text-xs font-black uppercase italic tracking-widest">No new alerts</p>
               </div>
             )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Subtle Toast popup */}
      {toast && (
        <div 
          className="fixed bottom-8 right-8 z-[100] animate-in slide-in-from-right-12 fade-in duration-500"
          onClick={() => {
            handleNotificationClick(toast)
            setToast(null)
          }}
        >
          <div className="bg-background border-2 border-primary border-t-4 rounded-2xl p-4 shadow-2xl flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform max-w-sm">
             <div className={`p-2 rounded-xl bg-primary/10 ${COLOR_MAP[toast.type]}`}>
                {(() => {
                  const Icon = ICON_MAP[toast.type] || Bell
                  return <Icon className="h-5 w-5" />
                })()}
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-0.5">New Notification</p>
                <p className="text-xs font-bold leading-tight line-clamp-2">{toast.message}</p>
             </div>
             <Button variant="ghost" size="icon" className="group-hover:bg-muted" onClick={(e) => { e.stopPropagation(); setToast(null); }}>
                <XCircle className="h-4 w-4 text-muted-foreground" />
             </Button>
          </div>
        </div>
      )}
    </div>
  )
}
