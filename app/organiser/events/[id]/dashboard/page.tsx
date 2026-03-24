import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Users, 
  ArrowLeft,
  Calendar,
  MapPin
} from 'lucide-react'
import { AnalyticsCharts } from '@/components/organiser/analytics-charts'
import { ExportCSVButton } from '@/components/organiser/export-button'

export const dynamic = 'force-dynamic'

export default async function EventDashboard({ params }: { params: { id: string } }) {
  const eventId = parseInt(params.id)
  if (isNaN(eventId)) return notFound()

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Fetch event and verify ownership
  const { data: event } = await supabase
    .from('events')
    .select(`
      *,
      club:clubs(name)
    `)
    .eq('id', eventId)
    .single()

  if (!event) return notFound()

  // Verify user is an organiser for this club
  const { data: organiser } = await supabase
    .from('club_organisers')
    .select('id')
    .eq('club_id', event.club_id)
    .eq('user_id', user.id)
    .eq('approved', true)
    .single()

  if (!organiser) redirect('/organiser')

  // Fetch detailed registrations
  const { data: registrations } = await supabase
    .from('registrations')
    .select(`
      id,
      registered_at,
      student:users(full_name, reg_number, branch, year, email)
    `)
    .eq('event_id', eventId)
    .order('registered_at', { ascending: false })

  const students = (registrations || []).map(r => r.student as any)
  const regCount = students.length
  const fillPercentage = event.max_capacity ? Math.round((regCount / event.max_capacity) * 100) : null

  // Process data for charts
  // 1. Reg over time
  const regDates = (registrations || []).map(r => new Date(r.registered_at).toLocaleDateString())
  const regCounts: Record<string, number> = {}
  regDates.forEach(d => regCounts[d] = (regCounts[d] || 0) + 1)
  const regChartData = Object.entries(regCounts).map(([date, count]) => ({ date, count })).reverse()

  // 2. Branch breakdown
  const branchCounts: Record<string, number> = {}
  students.forEach(s => {
    const branch = s.branch || 'Unknown'
    branchCounts[branch] = (branchCounts[branch] || 0) + 1
  })
  const branchChartData = Object.entries(branchCounts).map(([name, students]) => ({ name, students }))

  // 3. Year breakdown
  const yearCounts: Record<number, number> = {}
  students.forEach(s => {
    const year = s.year || 0
    yearCounts[year] = (yearCounts[year] || 0) + 1
  })
  const yearChartData = Object.entries(yearCounts).map(([year, value]) => ({ name: `Year ${year}`, value }))

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/organiser/events" className="text-sm text-muted-foreground flex items-center hover:text-foreground mb-2">
            <ArrowLeft className="mr-1 h-3 w-3" /> Back to Events
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">{event.title} Dashboard</h1>
          <p className="text-muted-foreground">Analytics and attendee management</p>
        </div>
        <ExportCSVButton 
          data={students} 
          filename={`${event.title.replace(/\s+/g, '_')}_attendees`} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Total Registered
            </CardDescription>
            <CardTitle className="text-4xl font-black">{regCount}</CardTitle>
          </CardHeader>
          <CardContent>
            {event.max_capacity && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-xs">
                  <span>Capacity</span>
                  <span>{fillPercentage}%</span>
                </div>
                <Progress value={fillPercentage} className="h-1" />
                <p className="text-[10px] text-muted-foreground">{event.max_capacity - regCount} spots left</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <AnalyticsCharts 
            regData={regChartData} 
            branchData={branchChartData} 
            yearData={yearChartData} 
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendee List</CardTitle>
          <CardDescription>Full roster of students registered for this event.</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Reg Number</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No students registered yet.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{student.full_name}</TableCell>
                  <TableCell>{student.reg_number}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{student.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
