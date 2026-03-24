import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BarChart3, ChevronRight, Calendar, Users } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ManageEventsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  // Get current managed clubs
  const { data: managedClubs } = await supabase
    .from('club_organisers')
    .select('club_id')
    .eq('user_id', user.id)
    .eq('approved', true)

  if (!managedClubs || managedClubs.length === 0) redirect('/organiser')

  const clubIds = managedClubs.map(c => c.club_id)

  // Fetch events with registration counts
  const { data: events } = await supabase
    .from('events')
    .select(`
      *,
      club:clubs(name),
      registrations:registrations(count)
    `)
    .in('club_id', clubIds)
    .order('event_date', { ascending: false })

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Your Events</h1>
          <p className="text-muted-foreground">Manage and track your club activities.</p>
        </div>
        <Link 
          href="/organiser/create-event"
          className={buttonVariants({ variant: 'default' })}
        >
          Create New
        </Link>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Club</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Registrations</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(!events || events.length === 0) ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No events found. Create your first one!
                </TableCell>
              </TableRow>
            ) : (
              events.map((event: any) => {
                const isPast = new Date(event.event_date) < new Date()
                const regCount = event.registrations?.[0]?.count || 0
                const capacity = event.max_capacity

                return (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.club?.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(event.event_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{regCount}</span>
                        {capacity && (
                          <span className="text-xs text-muted-foreground">/ {capacity}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {isPast ? (
                        <Badge variant="secondary">Completed</Badge>
                      ) : (
                        <Badge variant="default" className="bg-green-500 hover:bg-green-600">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link 
                        href={`/organiser/events/${event.id}/dashboard`}
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                      >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
