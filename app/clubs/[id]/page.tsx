import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, MapPin, Edit, Megaphone, Pin } from 'lucide-react'
import { FollowButton } from './follow-button'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ClubProfilePage({ params }: { params: { id: string } }) {
  const clubId = parseInt(params.id)
  if (isNaN(clubId)) return notFound()

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch Club details along with follower count
  const { data: club } = await supabase
    .from('clubs')
    .select(`*, follows:follows(count)`)
    .eq('id', clubId)
    .single()

  if (!club) return notFound()

  // Fetch Events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('club_id', clubId)
    .gte('event_date', new Date().toISOString())
    .order('event_date', { ascending: true })

  // Fetch Announcements
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('club_id', clubId)
    .order('pinned_until', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })

  // Check if User is following
  let isFollowing = false
  let isOrganiser = false

  if (user) {
    const { data: follow } = await supabase
      .from('follows')
      .select('id')
      .eq('student_id', user.id)
      .eq('club_id', clubId)
      .single()
    if (follow) isFollowing = true

    const { data: organiser } = await supabase
      .from('club_organisers')
      .select('id')
      .eq('user_id', user.id)
      .eq('club_id', clubId)
      .eq('approved', true)
      .single()
    if (organiser) isOrganiser = true
  }

  const followerCount = club.follows?.[0]?.count || 0

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 space-y-8">
      
      {/* Club Banner / Header Section */}
      <div className="relative rounded-xl overflow-hidden bg-muted/30 border border-border">
        {/* Banner */}
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary/20 to-primary/5">
          {club.banner_url && (
            <img src={club.banner_url} alt="Club Banner" className="w-full h-full object-cover opacity-80" />
          )}
        </div>
        
        <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 -mt-16 sm:-mt-20 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 w-full">
            {/* Logo */}
            <div className="h-32 w-32 rounded-full border-4 border-background bg-muted shadow-lg shrink-0 overflow-hidden flex items-center justify-center">
              {club.logo_url ? (
                <img src={club.logo_url} alt={`${club.name} Logo`} className="h-full w-full object-cover" />
              ) : (
                <span className="text-4xl text-muted-foreground font-bold">{club.name.charAt(0)}</span>
              )}
            </div>
            
            {/* Info */}
            <div className="flex-1 text-center sm:text-left mb-2">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight [text-shadow:_0_1px_4px_rgb(0_0_0_/_20%)] dark:[text-shadow:none]">{club.name}</h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                {club.category && <Badge variant="secondary">{club.category}</Badge>}
                <span className="text-sm text-muted-foreground">{club.campus || 'Main Campus'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center sm:items-end gap-3 mt-4 sm:mt-0 shrink-0">
            {isOrganiser && (
              <Link 
                href={`/organiser/${club.id}`}
                className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-full sm:w-auto' })}
              >
                <Edit className="h-4 w-4 mr-2" />
                Manage Club
              </Link>
            )}
            <FollowButton 
              clubId={club.id} 
              initialIsFollowing={isFollowing} 
              initialFollowerCount={followerCount} 
            />
          </div>
        </div>

        {club.description && (
          <div className="px-6 md:px-8 pb-8 max-w-4xl text-muted-foreground text-center sm:text-left text-lg">
            {club.description}
          </div>
        )}
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto sm:mx-0">
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>
        
        {/* Events Tab */}
        <TabsContent value="events" className="mt-6">
          {(!events || events.length === 0) ? (
            <div className="text-center py-16 border rounded-xl bg-muted/10">
              <CalendarDays className="h-10 w-10 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No upcoming events</h3>
              <p className="text-muted-foreground">Check back later for new events from {club.name}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="flex flex-col">
                  {event.banner_url && (
                    <div className="h-32 w-full bg-muted rounded-t-xl overflow-hidden">
                      <img src={event.banner_url} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader className={event.banner_url ? 'pt-4' : ''}>
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline">{event.event_type === 'formal' ? 'Formal' : 'Casual'}</Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1 text-primary/80 font-medium">
                      <CalendarDays className="h-3 w-3" />
                      {new Date(event.event_date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                      {event.description || 'No description provided.'}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-4">
                      <MapPin className="h-3 w-3" />
                      {event.venue || 'TBA'}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="mt-6">
          {(!announcements || announcements.length === 0) ? (
            <div className="text-center py-16 border rounded-xl bg-muted/10">
              <Megaphone className="h-10 w-10 mx-auto text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No announcements yet</h3>
              <p className="text-muted-foreground">The club organisers haven&apos;t posted any updates.</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl">
              {announcements.map((ann) => {
                const isPinned = ann.pinned_until && new Date(ann.pinned_until) > new Date()
                return (
                  <Card key={ann.id} className={isPinned ? 'border-primary/50 bg-primary/5' : ''}>
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-start gap-4">
                        <p className="whitespace-pre-wrap flex-1 text-sm md:text-base leading-relaxed">
                          {ann.content}
                        </p>
                        {isPinned && <Pin className="h-5 w-5 text-primary shrink-0" />}
                      </div>
                      <CardDescription className="pt-2 text-xs">
                        Posted on {new Date(ann.created_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
