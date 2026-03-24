'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEvent(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const clubId = parseInt(formData.get('clubId') as string)
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const bannerUrl = formData.get('bannerUrl') as string
  const venue = formData.get('venue') as string
  const eventDate = formData.get('eventDate') as string
  const registrationDeadline = formData.get('registrationDeadline') as string
  const maxCapacity = parseInt(formData.get('maxCapacity') as string)
  const eventType = formData.get('eventType') as string

  // Check if user is approved organiser for this club
  const { data: organiser } = await supabase
    .from('club_organisers')
    .select('id')
    .eq('club_id', clubId)
    .eq('user_id', user.id)
    .eq('approved', true)
    .single()

  if (!organiser) return { error: 'You are not an approved organiser for this club.' }

  const { data, error } = await supabase
    .from('events')
    .insert({
      club_id: clubId,
      title,
      description,
      banner_url: bannerUrl,
      venue,
      event_date: eventDate,
      registration_deadline: registrationDeadline || null,
      max_capacity: isNaN(maxCapacity) ? null : maxCapacity,
      event_type: eventType,
      campus: 'Main' // Default for now
    })
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/organiser')
  revalidatePath('/events')
  revalidatePath(`/clubs/${clubId}`)
  
  return { success: true, eventId: data.id }
}

export async function createAnnouncement(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const clubId = parseInt(formData.get('clubId') as string)
  const content = formData.get('content') as string
  const pinnedUntil = formData.get('pinnedUntil') as string

  // Check if user is approved organiser for this club
  const { data: organiser } = await supabase
    .from('club_organisers')
    .select('id')
    .eq('club_id', clubId)
    .eq('user_id', user.id)
    .eq('approved', true)
    .single()

  if (!organiser) return { error: 'You are not an approved organiser for this club.' }

  const { error } = await supabase
    .from('announcements')
    .insert({
      club_id: clubId,
      content,
      pinned_until: pinnedUntil || null
    })

  if (error) return { error: error.message }

  revalidatePath('/organiser')
  revalidatePath(`/clubs/${clubId}`)
  
  return { success: true }
}
