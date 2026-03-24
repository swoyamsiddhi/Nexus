'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Toggles a user's follow status for a specific club.
 */
export async function toggleFollow(clubId: number) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in to follow a club.' }

  // Check if already following
  const { data: existingFollow } = await supabase
    .from('follows')
    .select('id')
    .eq('student_id', user.id)
    .eq('club_id', clubId)
    .single()

  if (existingFollow) {
    // Unfollow
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('id', existingFollow.id)
    
    if (error) return { error: error.message }
  } else {
    // Follow
    const { error } = await supabase
      .from('follows')
      .insert({ student_id: user.id, club_id: clubId })
      
    if (error) return { error: error.message }
  }

  revalidatePath('/clubs')
  revalidatePath(`/clubs/${clubId}`)
  return { success: true, following: !existingFollow }
}

/**
 * Sends a request to become an organiser for a club.
 */
export async function requestOrganiser(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in to send a request.' }

  const clubId = formData.get('clubId') as string

  if (!clubId) return { error: 'Club selection is required.' }

  // Check if they are already an organiser or requested
  const { data: existingRequest } = await supabase
    .from('club_organisers')
    .select('id, approved')
    .eq('club_id', parseInt(clubId))
    .eq('user_id', user.id)
    .single()

  if (existingRequest) {
    if (existingRequest.approved) {
      return { error: 'You are already an approved organiser for this club.' }
    }
    return { error: 'You have already sent a request for this club that is pending.' }
  }

  // Insert request. (Note: standard schema doesn't have a reason field, we ignore it or put in metadata if we had one)
  const { error } = await supabase
    .from('club_organisers')
    .insert({
      club_id: parseInt(clubId),
      user_id: user.id,
      approved: false
    })

  if (error) return { error: error.message }

  return { success: true }
}
