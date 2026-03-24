'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function RealtimeFeedNotifier() {
  const [show, setShow] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel('dashboard-feed-notif')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'events' },
        () => {
          // In a real app, we'd check if club_id is in followed_clubs
          // For now, simpler notification
          setShow(true)
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'announcements' },
        () => {
          setShow(true)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  if (!show) return null

  return (
    <div className="sticky top-4 z-50 flex justify-center animate-in slide-in-from-top-4">
      <Button 
        onClick={() => window.location.reload()}
        className="rounded-full shadow-lg bg-primary gap-2 h-9 text-xs"
      >
        <RefreshCw className="h-3 w-3" />
        New updates available — Tap to refresh
      </Button>
    </div>
  )
}
