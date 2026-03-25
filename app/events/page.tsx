import { createClient } from '@/lib/supabase/server'
import { EventCard } from '@/components/events/event-card'
import { MyRegistrations } from '@/components/events/my-registrations'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { buttonVariants } from '@/components/ui/button'
import { EventsEmptyState } from '@/components/ui/empty-state'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Discover and register for events at SRM University — technical, cultural, sports and more.',
}

export const dynamic = 'force-dynamic'

const CATEGORIES = ['Technical', 'Cultural', 'Sports', 'Social', 'Arts']
const TIME_FILTERS = [
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'All Upcoming', value: 'upcoming' }
]

export default async function EventsDirectoryPage({
  searchParams,
}: {
  searchParams: { category?: string, time?: string }
}) {
  const supabase = createClient()
  const category = searchParams.category || ''
  const time = searchParams.time || 'upcoming'

  let query = supabase
    .from('events')
    .select(`
      *,
      club:clubs(name, logo_url, category),
      registrations:registrations(count)
    `)
    .order('event_date', { ascending: true })

  const now = new Date()
  
  if (time === 'week') {
    const nextWeek = new Date()
    nextWeek.setDate(now.getDate() + 7)
    query = query.gte('event_date', now.toISOString()).lte('event_date', nextWeek.toISOString())
  } else if (time === 'month') {
    const nextMonth = new Date()
    nextMonth.setMonth(now.getMonth() + 1)
    query = query.gte('event_date', now.toISOString()).lte('event_date', nextMonth.toISOString())
  } else {
    query = query.gte('event_date', now.toISOString())
  }

  const { data: rawEvents } = await query

  let events = rawEvents || []
  if (category) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events = events.filter((e: any) => e.club && e.club.category === category)
  }

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 space-y-8">
      
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Events</h1>
        <p className="text-muted-foreground mt-1 text-lg">Discover and register for campus activities.</p>
      </div>

      <Tabs defaultValue="campus" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-8">
          <TabsTrigger value="campus">Campus Events</TabsTrigger>
          <TabsTrigger value="registrations">My Registrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campus" className="space-y-6">
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b pb-4">
            
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 flex-col sm:flex-row">
              <span className="text-sm font-medium text-muted-foreground flex items-center mb-1 sm:mb-0 mr-2">Category:</span>
              <div className="flex flex-wrap gap-2">
                <Link 
                  href={`/events?time=${time}`}
                  className={buttonVariants({ 
                    variant: category === '' ? 'default' : 'secondary', 
                    size: 'sm',
                    className: category === '' ? '' : 'text-muted-foreground'
                  })}
                >
                  All
                </Link>
                {CATEGORIES.map(cat => (
                  <Link 
                    key={cat} 
                    href={`/events?category=${cat}&time=${time}`}
                    className={buttonVariants({ 
                      variant: category === cat ? 'default' : 'secondary', 
                      size: 'sm',
                      className: category === cat ? '' : 'text-muted-foreground'
                    })}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Time Pills */}
            <div className="flex flex-wrap gap-2 flex-col sm:flex-row">
              <span className="text-sm font-medium text-muted-foreground flex items-center mb-1 sm:mb-0 mr-2">Date:</span>
              <div className="flex flex-wrap gap-2">
                {TIME_FILTERS.map(t => (
                   <Link 
                   key={t.value} 
                   href={`/events?time=${t.value}${category ? `&category=${category}`: ''}`}
                   className={buttonVariants({ 
                     variant: time === t.value ? 'default' : 'outline', 
                     size: 'sm',
                     className: time === t.value ? '' : 'text-muted-foreground bg-transparent'
                   })}
                 >
                   {t.label}
                 </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Events Grid */}
          {(!events || events.length === 0) ? (
            <EventsEmptyState />
          ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {events.map((event: any) => (
                <EventCard 
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  clubId={event.club_id}
                  clubName={event.club?.name || 'Unknown Club'}
                  clubLogo={event.club?.logo_url}
                  bannerUrl={event.banner_url}
                  venue={event.venue}
                  eventDate={event.event_date}
                  registrationDeadline={event.registration_deadline}
                  maxCapacity={event.max_capacity}
                  currentRegistrations={event.registrations?.[0]?.count || 0}
                />
              ))}
             </div>
          )}

        </TabsContent>

        <TabsContent value="registrations">
          <MyRegistrations />
        </TabsContent>
      </Tabs>
      
    </div>
  )
}
