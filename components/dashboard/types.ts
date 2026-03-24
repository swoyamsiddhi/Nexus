export interface Club {
  id: number
  name: string
  logo_url?: string
  category?: string
  campus?: string
  follows?: { count: number }[]
}

export interface Event {
  id: number
  title: string
  banner_url?: string
  event_date: string
  venue: string
  max_capacity?: number
  club: Club
  registrations?: { count: number }[]
}

export interface Announcement {
  id: number
  content: string
  created_at: string
  pinned_until?: string
  club: Club
}

export type FeedItem = 
  | { type: 'event'; data: Event; priority: number }
  | { type: 'announcement'; data: Announcement; priority: number }
  | { type: 'suggestion'; data: Club; priority: number }
