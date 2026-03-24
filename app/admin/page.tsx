import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Component, Calendar, UserCheck, Activity } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = createClient()

  // Fetch counts
  const [
    { count: studentsCount },
    { count: clubsCount },
    { count: pendingOrganisersCount },
    { count: eventsCount },
  ] = await Promise.all([
    supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    supabase.from('clubs').select('*', { count: 'exact', head: true }),
    supabase.from('club_organisers').select('*', { count: 'exact', head: true }).eq('approved', false),
    supabase.from('events').select('*', { count: 'exact', head: true }),
  ])

  // Fetch recent activity
  const [
    { data: recentUsers },
    { data: recentEvents },
  ] = await Promise.all([
    supabase.from('users').select('id, full_name, role, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('events').select('id, title, created_at').order('created_at', { ascending: false }).limit(5),
  ])

  // Merge and sort activities
  const activities = [
    ...(recentUsers?.map(u => ({ type: 'user', date: new Date(u.created_at), title: `New ${u.role}: ${u.full_name}` })) || []),
    ...(recentEvents?.map(e => ({ type: 'event', date: new Date(e.created_at), title: `New event: ${e.title}` })) || [])
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 8)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsCount || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clubs</CardTitle>
            <Component className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clubsCount || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Organisers</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrganisersCount || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventsCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.length === 0 && <p className="text-muted-foreground text-sm">No recent activity.</p>}
              {activities.map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
