import { createClient } from '@/lib/supabase/server'

export type NotificationType = 
  | 'event_registration'
  | 'club_new_event'
  | 'team_application_received'
  | 'team_application_accepted'
  | 'team_application_rejected'
  | 'going_out_interest'
  | 'project_collaboration_interest'
  | 'organiser_approved'
  | 'organiser_rejected'

export async function createNotification(
  userId: string,
  type: NotificationType,
  message: string,
  referenceId?: number
) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: userId,
      type,
      message,
      reference_id: referenceId,
      read: false
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating notification:', error)
    return { error }
  }

  return { data }
}
