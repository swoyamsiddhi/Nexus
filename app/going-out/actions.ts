'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getGoingOutPosts(filter: string = 'all') {
  const supabase = createClient()
  const now = new Date().toISOString()
  
  let query = supabase
    .from('going_out_posts')
    .select(`
      *,
      poster:users(id, full_name, branch, year, avatar_url),
      interests:going_out_interests(id, student_id)
    `)
    .gt('expires_at', now)
    .order('created_at', { ascending: false })

  if (filter !== 'all') {
    query = query.eq('looking_for', filter)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function createGoingOutPost(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const eventName = formData.get('event_name') as string
  const eventLocation = formData.get('event_location') as string
  const eventDate = formData.get('event_date') as string
  const sourceUrl = formData.get('source_url') as string
  const lookingFor = formData.get('looking_for') as string
  const spotsNeeded = parseInt(formData.get('spots_needed') as string)
  const details = formData.get('details') as string

  // Duplicate Check
  const { data: existing } = await supabase
    .from('going_out_posts')
    .select('id')
    .ilike('event_name', eventName)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (existing) {
    return { error: 'ALREADY_POSTED', existingId: existing.id }
  }

  // Calculate Expiry
  const expiryDate = new Date(eventDate)
  expiryDate.setDate(expiryDate.getDate() + 1)

  const { data, error } = await supabase
    .from('going_out_posts')
    .insert({
      posted_by: user.id,
      event_name: eventName,
      event_location: eventLocation,
      event_date: eventDate,
      source_url: sourceUrl,
      looking_for: lookingFor,
      spots_needed: spotsNeeded,
      details: details,
      expires_at: expiryDate.toISOString()
    })
    .select()
    .single()

  if (error) return { error: error.message }
  
  revalidatePath('/going-out')
  return { data }
}

export async function handleInterest(postId: number, message: string = '') {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Check if self-interest
  const { data: post } = await supabase.from('going_out_posts').select('posted_by, event_name').eq('id', postId).single()
  if (post?.posted_by === user.id) return { error: 'Cannot express interest in your own post' }

  const { error } = await supabase
    .from('going_out_interests')
    .upsert({
      post_id: postId,
      student_id: user.id,
      message: message
    })

  if (error) return { error: error.message }

  // Send Notification
  await supabase.from('notifications').insert({
    user_id: post?.posted_by,
    type: 'GOING_OUT_INTEREST',
    message: `${user.user_metadata?.full_name || 'Someone'} is interested in your post: ${post?.event_name}`,
    reference_id: postId
  })

  revalidatePath(`/going-out/${postId}`)
  revalidatePath('/going-out')
  return { success: true }
}

export async function getPostDetails(id: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('going_out_posts')
    .select(`
      *,
      poster:users(id, full_name, branch, year, avatar_url),
      interests:going_out_interests(
        id, 
        message, 
        created_at,
        student:users(id, full_name, branch, year, avatar_url)
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function closePost(id: number) {
  const supabase = createClient()
  const { error } = await supabase
    .from('going_out_posts')
    .update({ expires_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath(`/going-out/${id}`)
  revalidatePath('/going-out')
  return { success: true }
}
