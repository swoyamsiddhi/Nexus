'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getTeamPosts(skillFilter?: string, hackathonFilter?: string) {
  const supabase = createClient()
  
  let query = supabase
    .from('team_posts')
    .select(`
      *,
      poster:users(id, full_name, branch, year, avatar_url),
      applications:team_applications(id)
    `)
    .eq('status', 'open')
    .order('created_at', { ascending: false })

  if (skillFilter) {
    // case-insensitive check in the array
    query = query.filter('skills_needed', 'cs', `{${skillFilter}}`)
  }

  if (hackathonFilter && hackathonFilter !== 'all') {
    query = query.ilike('hackathon_name', `%${hackathonFilter}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getMyTeamsData() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // 1. Teams I posted
  const { data: myPosts } = await supabase
    .from('team_posts')
    .select(`
      *,
      applications:team_applications(id, status)
    `)
    .eq('posted_by', user.id)
    .order('created_at', { ascending: false })

  // 2. Teams I applied to
  const { data: myApplications } = await supabase
    .from('team_applications')
    .select(`
      *,
      team_post:team_posts(
        id, 
        hackathon_name, 
        event_date, 
        skills_needed,
        poster:users(full_name)
      )
    `)
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })

  return { myPosts, myApplications }
}

export async function createTeamPost(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const skills_needed = (formData.get('skills_needed') as string)
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0)

  const { data, error } = await supabase
    .from('team_posts')
    .insert({
      posted_by: user.id,
      hackathon_name: formData.get('hackathon_name'),
      event_date: formData.get('event_date'),
      skills_needed,
      spots_available: parseInt(formData.get('spots_available') as string),
      description: formData.get('description'),
      status: 'open'
    })
    .select()
    .single()

  if (error) return { error: error.message }
  
  revalidatePath('/teams')
  return { data }
}

export async function applyToTeam(postId: number, message: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Check if owner
  const { data: post } = await supabase.from('team_posts').select('posted_by, hackathon_name').eq('id', postId).single()
  if (post?.posted_by === user.id) return { error: 'Cannot apply to your own post' }

  const { data, error } = await supabase
    .from('team_applications')
    .insert({
      team_post_id: postId,
      student_id: user.id,
      message,
      status: 'pending'
    })
    .select()
    .single()

  if (error) return { error: error.message }

  // Notify Owner
  await supabase.from('notifications').insert({
    user_id: post?.posted_by,
    type: 'TEAM_APPLICATION',
    message: `${user.user_metadata?.full_name || 'Someone'} applied to your team for ${post?.hackathon_name}`,
    reference_id: postId
  })

  revalidatePath('/teams')
  return { data }
}

export async function processApplication(applicationId: number, status: 'accepted' | 'rejected') {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // 1. Get application and post info
  const { data: app, error: appErr } = await supabase
    .from('team_applications')
    .select('*, team_post:team_posts(*)')
    .eq('id', applicationId)
    .single()

  if (appErr || !app) return { error: 'Application not found' }
  if (app.team_post.posted_by !== user.id) return { error: 'Unauthorized' }

  // 2. Update status
  const { error: updateErr } = await supabase
    .from('team_applications')
    .update({ status })
    .eq('id', applicationId)

  if (updateErr) return { error: updateErr.message }

  // 3. If accepted, handle spots
  if (status === 'accepted') {
    const newSpots = app.team_post.spots_available - 1
    const newStatus = newSpots <= 0 ? 'closed' : 'open'

    await supabase
      .from('team_posts')
      .update({ 
        spots_available: Math.max(0, newSpots),
        status: newStatus
      })
      .eq('id', app.team_post.id)
  }

  // 4. Notify Applicant
  await supabase.from('notifications').insert({
    user_id: app.student_id,
    type: 'APPLICATION_RESPONSE',
    message: `Your application for ${app.team_post.hackathon_name} was ${status}`,
    reference_id: app.team_post.id
  })

  revalidatePath(`/teams/manage/${app.team_post.id}`)
  revalidatePath('/teams')
  return { success: true }
}

export async function getPostApplications(postId: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('team_posts')
    .select(`
      *,
      applications:team_applications(
        id,
        message,
        status,
        created_at,
        student:users(id, full_name, branch, year, avatar_url)
      )
    `)
    .eq('id', postId)
    .single()

  if (error) throw error
  return data
}
