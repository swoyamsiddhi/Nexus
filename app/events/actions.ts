'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Register to an event using the secure Postgres RPC to avoid race conditions.
 */
export async function registerForEvent(eventId: number) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in to register.' }

  // We check if the student relies on an RPC we established.
  const { data, error } = await supabase.rpc('safe_register_event', {
    p_event_id: eventId,
    p_student_id: user.id,
  })

  // Fallback if RPC doesn't exist (if user hasn't run the SQL yet)
  if (error && error.message.includes('function "safe_register_event" does not exist')) {
    // Basic unsafe registration block for MVP logic fallback
    const { data: currentRegs } = await supabase
      .from('registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('status', 'confirmed')

    const { data: event } = await supabase
      .from('events')
      .select('max_capacity, registration_deadline')
      .eq('id', eventId)
      .single()

    if (!event) return { error: 'Event not found.' }
    
    // Check deadline
    if (new Date(event.registration_deadline) < new Date()) {
      return { error: 'Registration deadline has passed.' }
    }

    // Check capacity
    if (event.max_capacity && (currentRegs?.length || 0) >= event.max_capacity) {
      return { error: 'Event is full.' }
    }

    // Attempt insert
    const { error: insertError } = await supabase
      .from('registrations')
      .insert({ event_id: eventId, student_id: user.id, status: 'confirmed' })

    if (insertError) {
      if (insertError.code === '23505') return { error: 'You are already registered.' }
      return { error: insertError.message }
    }
  } else if (error) {
    return { error: error.message }
  } else if (data && !data.success) {
    return { error: data.error }
  }

  revalidatePath('/events')
  revalidatePath(`/events/${eventId}`)
  return { success: true }
}

/**
 * Cancel a registration.
 */
export async function cancelRegistration(eventId: number) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in to cancel.' }

  const { error } = await supabase
    .from('registrations')
    .delete()
    .eq('event_id', eventId)
    .eq('student_id', user.id)

  if (error) return { error: error.message }

  // Optional: Add notification
  const { data: event } = await supabase.from('events').select('title').eq('id', eventId).single()
  if (event) {
    await supabase.from('notifications').insert({
      user_id: user.id,
      type: 'event_cancellation',
      message: `You have successfully cancelled your registration for ${event.title}`,
      reference_id: eventId
    })
  }

  revalidatePath('/events')
  revalidatePath(`/events/${eventId}`)
  return { success: true }
}
