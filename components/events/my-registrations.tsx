import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, MapPin } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export async function MyRegistrations() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // Fetch all registrations for this user including event details
  const { data: registrations } = await supabase
    .from('registrations')
    .select(`
      id,
      status,
      registered_at,
      event:events(
        id,
        title,
        event_date,
        venue,
        club:clubs(name)
      )
    `)
    .eq('student_id', user.id)
    .order('registered_at', { ascending: false })

  if (!registrations || registrations.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 border rounded-xl">
        <CalendarDays className="h-10 w-10 mx-auto text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No registrations yet</h3>
        <p className="text-muted-foreground max-w-sm mx-auto mt-2">
          You haven&apos;t registered for any upcoming events. Browse the campus events to find something interesting!
        </p>
      </div>
    )
  }

  const now = new Date()
  const upcoming = registrations.filter(r => {
    const e = Array.isArray(r.event) ? r.event[0] : r.event
    return e && new Date(e.event_date) >= now
  })
  const past = registrations.filter(r => {
    const e = Array.isArray(r.event) ? r.event[0] : r.event
    return e && new Date(e.event_date) < now
  })

  return (
    <div className="space-y-8">
      {upcoming.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {upcoming.map((reg: any) => (
              <RegistrationCard key={reg.id} registration={reg} />
            ))}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-muted-foreground">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-70 hover:opacity-100 transition-opacity">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {past.map((reg: any) => (
              <RegistrationCard key={reg.id} registration={reg} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function RegistrationCard({ registration }: { registration: any }) {
  const event = Array.isArray(registration.event) ? registration.event[0] : registration.event
  if (!event) return null

  const clubName = Array.isArray(event.club) ? event.club[0]?.name : event.club?.name


  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <Badge variant="outline" className={registration.status === 'confirmed' ? 'text-green-600 border-green-200 bg-green-50 dark:bg-green-500/10' : ''}>
            {registration.status === 'confirmed' ? 'Confirmed ✓' : registration.status}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium truncate max-w-[120px]">
            {clubName}
          </span>
        </div>
        <CardTitle className="text-md line-clamp-1">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarDays className="h-3 w-3 shrink-0" />
          <span className="truncate">
            {new Date(event.event_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground pb-2">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{event.venue || 'TBA'}</span>
        </div>
        <Link 
          href={`/events/${event.id}`}
          className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-full text-xs' })}
        >
          View Ticket / Details
        </Link>
      </CardContent>
    </Card>
  )
}
