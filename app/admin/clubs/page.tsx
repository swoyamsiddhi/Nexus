import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ClubActions } from './club-actions'
import { CreateClubDialog } from './create-club-dialog'

export const dynamic = 'force-dynamic'

export default async function AdminClubsPage() {
  const supabase = createClient()

  const { data: clubs } = await supabase
    .from('clubs')
    .select(`
      *,
      organisers:club_organisers(count),
      events:events(count)
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Clubs Management</h1>
          <p className="text-muted-foreground">View and manage all active clubs in SRM Connect.</p>
        </div>
        <CreateClubDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clubs</CardTitle>
          <CardDescription>
            A total of {clubs?.length || 0} registered clubs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Club Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead className="text-center">Organisers</TableHead>
                <TableHead className="text-center">Events</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!clubs || clubs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    No clubs found. Add one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                clubs.map((club: any) => (
                  <TableRow key={club.id}>
                    <TableCell className="font-medium">{club.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{club.category || 'N/A'}</Badge>
                    </TableCell>
                    <TableCell>{club.campus || 'Main Campus'}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{club.organisers?.[0]?.count || 0}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{club.events?.[0]?.count || 0}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <ClubActions clubId={club.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
