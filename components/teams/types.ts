export interface TeamPost {
  id: number
  posted_by: string
  hackathon_name: string
  event_date: string
  skills_needed: string[]
  spots_available: number
  description: string
  status: 'open' | 'closed'
  created_at: string
  poster?: {
    id: string
    full_name: string
    branch?: string
    year?: number
    avatar_url?: string
  }
  applications?: TeamApplication[]
}

export interface TeamApplication {
  id: number
  team_post_id: number
  student_id: string
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  student?: {
    id: string
    full_name: string
    branch?: string
    year?: number
    avatar_url?: string
  }
}
