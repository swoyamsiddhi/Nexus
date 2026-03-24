export interface GoingOutPost {
  id: number
  posted_by: string
  event_name: string
  event_location: string
  event_date: string
  source_url: string
  looking_for: 'buddies' | 'teammates' | 'both'
  spots_needed: number
  details: string
  expires_at: string
  created_at: string
  poster?: {
    id: string
    full_name: string
    branch?: string
    year?: number
    avatar_url?: string
  }
  interests?: {
    id: number
    student_id: string
    message?: string
    created_at: string
    student?: {
      id: string
      full_name: string
      branch?: string
      year?: number
      avatar_url?: string
    }
  }[]
}
