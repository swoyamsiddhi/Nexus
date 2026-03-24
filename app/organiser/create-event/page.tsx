import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreateEventForm } from '@/components/organiser/create-event-form'

export default async function CreateEventPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: managedClubs } = await supabase
    .from('club_organisers')
    .select('club:clubs(id, name)')
    .eq('user_id', user.id)
    .eq('approved', true)

  if (!managedClubs || managedClubs.length === 0) redirect('/organiser')

  const clubs = managedClubs.map(c => c.club as any)

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Create New Event</h1>
      <CreateEventForm clubs={clubs} />
    </div>
  )
}
