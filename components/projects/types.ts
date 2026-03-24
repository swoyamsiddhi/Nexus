export interface Project {
  id: number
  posted_by: string
  title: string
  description: string
  tech_stack: string[]
  looking_for: 'co-builder' | 'mentor' | 'feedback'
  status: 'active' | 'completed'
  created_at: string
  poster?: {
    id: string
    full_name: string
    branch?: string
    year?: number
    avatar_url?: string
  }
  interests?: ProjectInterest[]
}

export interface ProjectInterest {
  id: number
  project_id: number
  student_id: string
  message: string
  created_at: string
  student?: {
    id: string
    full_name: string
    branch?: string
    year?: number
    avatar_url?: string
  }
}
