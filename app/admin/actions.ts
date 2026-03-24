'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Approve an organiser request.
 * Sets `approved` to true in `club_organisers` and changes user role to 'organiser'.
 */
export async function approveOrganiserRequest(requestId: number, userId: string) {
  const supabase = createClient()
  
  // Update club_organisers approved status
  const { error: requestError } = await supabase
    .from('club_organisers')
    .update({ approved: true, approved_at: new Date().toISOString() })
    .eq('id', requestId)
    
  if (requestError) return { error: requestError.message }

  // Update user role to organiser
  const { error: userError } = await supabase
    .from('users')
    .update({ role: 'organiser' })
    .eq('id', userId)

  if (userError) return { error: userError.message }

  revalidatePath('/admin/requests')
  revalidatePath('/admin/students')
  return { success: true }
}

/**
 * Reject an organiser request.
 * Deletes the request from `club_organisers`.
 */
export async function rejectOrganiserRequest(requestId: number) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('club_organisers')
    .delete()
    .eq('id', requestId)
    
  if (error) return { error: error.message }

  revalidatePath('/admin/requests')
  return { success: true }
}

/**
 * Create a new club based on form data
 */
export async function createClub(formData: FormData) {
  const supabase = createClient()
  
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const campus = formData.get('campus') as string
  const description = formData.get('description') as string

  // Simple validation
  if (!name || !category) return { error: 'Name and Category are required' }

  const { error } = await supabase
    .from('clubs')
    .insert({
      name,
      category,
      campus,
      description
    })

  if (error) return { error: error.message }

  revalidatePath('/admin/clubs')
  return { success: true }
}

/**
 * Delete a club
 */
export async function deleteClub(clubId: number) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('clubs')
    .delete()
    .eq('id', clubId)
    
  if (error) return { error: error.message }

  revalidatePath('/admin/clubs')
  revalidatePath('/admin')
  return { success: true }
}

/**
 * Admin overrides a student's role
 */
export async function updateUserRole(userId: string, newRole: string) {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('users')
    .update({ role: newRole })
    .eq('id', userId)
    
  if (error) return { error: error.message }

  revalidatePath('/admin/students')
  return { success: true }
}
