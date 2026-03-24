import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  PlusCircle, 
  Megaphone, 
  Users, 
  Calendar, 
  TrendingUp,
  LayoutDashboard,
  ArrowRight
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function OrganiserDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  // Get the clubs this user manages
  const { data: managedClubs } = await supabase
    .from('club_organisers')
    .select('club:clubs(*)')
    .eq('user_id', user.id)
    .eq('approved', true)

  if (!managedClubs || managedClubs.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">No Managed Clubs</h1>
        <p className="text-muted-foreground mb-8">You are not an approved organiser for any club yet.</p>
        <Link 
          href="/clubs"
          className={buttonVariants({ variant: 'default' })}
        >
          Browse Clubs to Apply
        </Link>
      </div>
    )
  }

  // For simplicity, we'll focus on the first managed club in the dashboard
  const club = managedClubs[0].club as any
  
  // Fetch Stats
  const [
    { count: followerCount },
    { data: upcomingEvents },
    { data: thisMonthRegs }
  ] = await Promise.all([
    supabase.from('follows').select('id', { count: 'exact', head: true }).eq('club_id', club.id),
    supabase.from('events').select('id, title, event_date').eq('club_id', club.id).gte('event_date', new Date().toISOString()),
    supabase.from('registrations')
      .select('id', { count: 'exact' })
      .filter('event_id', 'in', `(${managedClubs.map(c => (c.club as any).id).join(',')})`)
      .gte('registered_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
  ])

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full border bg-muted overflow-hidden">
            {club.logo_url ? (
               <img src={club.logo_url} alt={club.name} className="h-full w-full object-cover" />
            ) : (
               <div className="h-full w-full flex items-center justify-center font-bold text-xl text-muted-foreground">
                 {club.name.charAt(0)}
               </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">{club.name}</h1>
            <p className="text-muted-foreground">Organiser Dashboard</p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Link 
            href="/organiser/create-event"
            className={buttonVariants({ variant: 'outline', className: 'flex-1 sm:flex-none' })}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Event
          </Link>
          <Link 
            href={`/organiser/events`}
            className={buttonVariants({ className: 'flex-1 sm:flex-none' })}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            All Events
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-primary font-medium flex items-center gap-2">
              <Users className="h-4 w-4" /> Total Followers
            </CardDescription>
            <CardTitle className="text-4xl font-black">{followerCount || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Students following your club</p>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/10 border-secondary/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-secondary-foreground font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Upcoming Events
            </CardDescription>
            <CardTitle className="text-4xl font-black">{upcomingEvents?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Scheduled for the future</p>
          </CardContent>
        </Card>

        <Card className="bg-green-500/5 border-green-500/20">
          <CardHeader className="pb-2">
            <CardDescription className="text-green-600 font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Registrations (MTD)
            </CardDescription>
            <CardTitle className="text-4xl font-black">{thisMonthRegs?.length || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">New signups this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Post</CardTitle>
            <CardDescription>Post an announcement directly to your club members.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <textarea 
                placeholder="What's happening in your club?" 
                className="w-full min-h-[120px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button className="w-full">
              <Megaphone className="mr-2 h-4 w-4" />
              Post Announcement
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Upcoming Activity</CardTitle>
            <CardDescription>Your next scheduled events.</CardDescription>
          </CardHeader>
          <CardContent>
            {(!upcomingEvents || upcomingEvents.length === 0) ? (
              <p className="text-sm text-muted-foreground py-4 text-center">No upcoming events scheduled.</p>
            ) : (
              <div className="space-y-4">
                {upcomingEvents.slice(0, 3).map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
                    <div>
                      <h4 className="font-semibold text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <Link 
                      href={`/organiser/events/${event.id}/dashboard`}
                      className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                      Stats <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                ))}
                {upcomingEvents.length > 3 && (
                  <Link 
                    href="/organiser/events"
                    className={buttonVariants({ variant: 'link', className: 'w-full text-xs' })}
                  >
                    View All Events
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
