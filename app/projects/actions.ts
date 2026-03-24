'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { createNotification } from '@/lib/notifications'

export async function getProjects(lookingFor?: string, stackSearch?: string) {
  const supabase = createClient()
  
  let query = supabase
    .from('projects')
    .select(`
      *,
      poster:users(id, full_name, branch, year, avatar_url),
      interests:project_interests(id)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (lookingFor && lookingFor !== 'all') {
    query = query.eq('looking_for', lookingFor)
  }

  if (stackSearch) {
    // case-insensitive check in array
    query = query.filter('tech_stack', 'cs', `{${stackSearch}}`)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function createProject(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const tech_stack = (formData.get('tech_stack') as string)
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  const { data, error } = await supabase
    .from('projects')
    .insert({
      posted_by: user.id,
      title: formData.get('title'),
      description: formData.get('description'),
      tech_stack,
      looking_for: formData.get('looking_for'),
      status: 'active'
    })
    .select()
    .single()

  if (error) return { error: error.message }
  
  revalidatePath('/projects')
  return { data }
}

export async function expressInterest(projectId: number, message: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Check if owner
  const { data: project } = await supabase.from('projects').select('posted_by, title').eq('id', projectId).single() as unknown as { data: { posted_by: string, title: string } | null }
  if (project?.posted_by === user.id) return { error: 'Cannot express interest in your own project' }

  const { data, error } = await supabase
    .from('project_interests')
    .insert({
      project_id: projectId,
      student_id: user.id,
      message
    })
    .select()
    .single()

  if (error) return { error: error.message }

  // Notify Owner via central helper
  await createNotification(
    project!.posted_by,
    'project_collaboration_interest',
    `${(user.user_metadata as { full_name?: string }).full_name || 'Someone'} is interested in collaborating on ${project?.title}`,
    projectId
  )

  revalidatePath(`/projects/${projectId}`)
  revalidatePath('/projects')
  return { data }
}

export async function getProjectDetails(id: number) {
  const supabase = createClient()
  
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      poster:users(id, full_name, branch, year, avatar_url),
      interests:project_interests(
        id,
        message,
        created_at,
        student:users(id, full_name, branch, year, avatar_url)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return project
}

export async function getMyProjectData() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // 1. Projects I posted
  const { data: myProjects } = await supabase
    .from('projects')
    .select(`
      *,
      interests:project_interests(id)
    `)
    .eq('posted_by', user.id)
    .order('created_at', { ascending: false })

  // 2. Projects I'm interested in
  const { data: myInterests } = await supabase
    .from('project_interests')
    .select(`
      *,
      project:projects(
        id, 
        title, 
        looking_for, 
        poster:users(full_name)
      )
    `)
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })

  return { myProjects, myInterests }
}
