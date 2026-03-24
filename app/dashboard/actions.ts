'use server'

import { createClient } from '@/lib/supabase/server'
import { FeedItem, Event, Announcement, Club } from '@/components/dashboard/types'

export async function getDashboardFeed(page: number = 1, limit: number = 10) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const offset = (page - 1) * limit

  // 1. Get followed club IDs
  const { data: follows } = await supabase
    .from('follows')
    .select('club_id')
    .eq('student_id', user.id)
  
  const followedClubIds = (follows?.map(f => f.club_id) || []) as number[]
  const hasFollows = followedClubIds.length > 0

  // 2. Fetch Priorities
  const now = new Date().toISOString()

  // Priority 1: Upcoming events from followed clubs
  const { data: followedEvents } = hasFollows ? await supabase
    .from('events')
    .select('*, club:clubs(id, name, logo_url), registrations:registrations(count)')
    .in('club_id', followedClubIds)
    .gte('event_date', now)
    .order('event_date', { ascending: true })
    .limit(limit) : { data: [] }

  // Priority 2: Popular events
  const { data: popularEvents } = await supabase
    .from('events')
    .select('*, club:clubs(id, name, logo_url), registrations:registrations(count)')
    .gte('event_date', now)
    .not('max_capacity', 'is', null)
    .limit(20)

  // Priority 3: Announcements
  const { data: followedAnnouncements } = hasFollows ? await supabase
    .from('announcements')
    .select('*, club:clubs(id, name, logo_url)')
    .in('club_id', followedClubIds)
    .order('created_at', { ascending: false })
    .limit(limit) : { data: [] }

  // Priority 4: Suggested clubs
  const { data: userData } = await supabase.from('users').select('campus').eq('id', user.id).single()
  const campusFilter = userData?.campus || 'Main'
  
  const { data: suggestedClubs } = await supabase
    .from('clubs')
    .select('*, follows:follows(count)')
    .eq('campus', campusFilter)
    .limit(10)

  // Merge and Rank
  const items: FeedItem[] = []

  // Add followed events
  if (followedEvents) {
    (followedEvents as unknown as Event[]).forEach(e => {
      items.push({ type: 'event', data: e, priority: 1 })
    })
  }

  // Add popular events
  if (popularEvents) {
    (popularEvents as unknown as Event[]).forEach(e => {
      const isAlreadyIn = items.some(i => i.type === 'event' && (i.data as Event).id === e.id)
      if (!isAlreadyIn) {
        const regCount = e.registrations?.[0]?.count || 0
        const capacity = e.max_capacity || 1
        const popularity = regCount / capacity
        if (popularity > 0.3) { 
           items.push({ type: 'event', data: e, priority: 2 })
        }
      }
    })
  }

  // Add announcements
  if (followedAnnouncements) {
    (followedAnnouncements as unknown as Announcement[]).forEach(a => {
      items.push({ type: 'announcement', data: a, priority: 3 })
    })
  }

  // Add suggestions
  if (page === 1 && suggestedClubs) {
    const filteredClubs = (suggestedClubs as unknown as Club[]).filter(c => !followedClubIds.includes(c.id))
    filteredClubs.slice(0, 5).forEach(c => {
      items.push({ type: 'suggestion', data: c, priority: 4 })
    })
  }

  // Final Sort
  items.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority
    // Type-safe sorting by checking both possible date fields
    const itemA = a.data as { event_date?: string, created_at?: string }
    const itemB = b.data as { event_date?: string, created_at?: string }
    const dateA = new Date(itemA.event_date || itemA.created_at || 0).getTime()
    const dateB = new Date(itemB.event_date || itemB.created_at || 0).getTime()
    return dateA - dateB
  })

  const paginatedItems = items.slice(offset, offset + limit)

  return { items: paginatedItems, hasFollows, total: items.length }
}
