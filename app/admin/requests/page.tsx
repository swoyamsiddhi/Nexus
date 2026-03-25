import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RequestActions } from './request-actions'

export const dynamic = 'force-dynamic'

export default async function AdminRequestsPage() {
  const supabase = createClient()

  // Fetch pending requests with user and club data
  const { data: requests } = await supabase
    .from('club_organisers')
    .select(`
      id,
      created_at,
      user:users(id, full_name, reg_number),
      club:clubs(name)
    `)
    .eq('approved', false)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Organiser Requests</h1>
        <p className="text-muted-foreground">Approve or reject students requesting to manage clubs.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Approvals</CardTitle>
          <CardDescription>
            You have {requests?.length || 0} pending request(s).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Reg Number</TableHead>
                <TableHead>Target Club</TableHead>
                <TableHead>Requested On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!requests || requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    No pending requests found.
                  </TableCell>
                </TableRow>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                requests.map((req: any) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.user?.full_name}</TableCell>
                    <TableCell>{req.user?.reg_number}</TableCell>
                    <TableCell>{req.club?.name}</TableCell>
                    <TableCell>{new Date(req.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <RequestActions requestId={req.id} userId={req.user?.id} />
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
