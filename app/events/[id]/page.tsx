import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CalendarDays, MapPin, Users, Clock, ArrowLeft } from 'lucide-react'
import { RegistrationButton } from './registration-button'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const eventId = parseInt(params.id)
  if (isNaN(eventId)) return notFound()

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch Event details with Club and Registration counts
  const { data: event } = await supabase
    .from('events')
    .select(`
      *,
      club:clubs(id, name, logo_url),
      registrations:registrations(count)
    `)
    .eq('id', eventId)
    .single()

  if (!event) return notFound()

  // Determine user registration status
  let isRegistered = false
  if (user) {
    const { data: reg } = await supabase
      .from('registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('student_id', user.id)
      .eq('status', 'confirmed')
      .single()
    if (reg) isRegistered = true
  }

  const currentRegistrations = event.registrations?.[0]?.count || 0
  const maxCapacity = event.max_capacity

  const isClosed = event.registration_deadline ? new Date(event.registration_deadline) < new Date() : false
  const isFull = maxCapacity ? currentRegistrations >= maxCapacity : false

  const fillPercentage = maxCapacity ? Math.min(100, Math.round((currentRegistrations / maxCapacity) * 100)) : null

  // Format Dates
  const eventDateObj = new Date(event.event_date)
  const deadlineObj = event.registration_deadline ? new Date(event.registration_deadline) : null

  return (
    <div className="container mx-auto max-w-4xl py-6 px-4 space-y-6">
      
      <Link href="/events" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Link>

      {/* Banner */}
      <div className="w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-muted border relative shadow-sm">
        {event.banner_url ? (
          <img src={event.banner_url} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-background flex items-center justify-center">
            <CalendarDays className="h-24 w-24 text-primary/20" />
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          {event.event_type === 'formal' ? (
             <Badge className="bg-background/90 text-foreground hover:bg-background border-transparent shadow-sm">Formal Event</Badge>
          ) : (
             <Badge variant="secondary" className="bg-background/90 shadow-sm border-transparent hover:bg-background">Casual / Announcement</Badge>
          )}
        </div>
      </div>

      {/* Header Info */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start pt-4">
        <div className="space-y-4 flex-1">
          <Link href={`/clubs/${event.club.id}`} className="group flex items-center gap-2 w-fit">
            <div className="h-8 w-8 rounded-full border bg-muted overflow-hidden">
               {event.club.logo_url ? (
                 <img src={event.club.logo_url} alt={event.club.name} className="h-full w-full object-cover" />
               ) : (
                 <div className="h-full w-full flex items-center justify-center font-bold text-xs text-muted-foreground">
                   {event.club.name.charAt(0)}
                 </div>
               )}
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              Hosted by {event.club.name}
            </span>
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {event.title}
          </h1>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mt-4 pt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarDays className="h-5 w-5 text-primary/70 shrink-0" />
              <span className="font-medium text-foreground">
                {eventDateObj.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-5 w-5 text-primary/70 shrink-0" />
              <span className="font-medium text-foreground">
                {eventDateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary/70 shrink-0" />
              <span className="font-medium text-foreground">
                {event.venue || 'TBA'}
              </span>
            </div>
          </div>
        </div>

        {/* Action / Registration Card */}
        <div className="w-full lg:w-80 bg-muted/30 border rounded-xl p-6 shadow-sm flex flex-col shrink-0">
          <RegistrationButton 
            eventId={event.id}
            isRegistered={isRegistered}
            isFull={isFull}
            isClosed={isClosed}
          />

          <div className="mt-6 space-y-4">
            {maxCapacity ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">Registration</span>
                  <span>{currentRegistrations} / {maxCapacity}</span>
                </div>
                {/* Custom Progress Bar */}
                <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-in-out ${fillPercentage === 100 ? 'bg-destructive' : 'bg-primary'}`} 
                    style={{ width: `${fillPercentage}%` }} 
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {maxCapacity - currentRegistrations} spots remaining
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                 <Users className="h-4 w-4 shrink-0" />
                 {currentRegistrations} currently registered
              </div>
            )}

            {deadlineObj && (
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Registration Deadline</p>
                <p className={`text-sm font-medium ${isClosed ? 'text-destructive' : 'text-foreground'}`}>
                  {deadlineObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  {isClosed && ' (Passed)'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="my-8" />

      {/* Description Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none pb-16">
        <h2 className="text-2xl font-bold mb-4">About this Event</h2>
        <div className="whitespace-pre-wrap text-muted-foreground text-base leading-relaxed">
          {event.description || 'No description provided by the organisers.'}
        </div>
      </div>

    </div>
  )
}
