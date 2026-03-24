import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RoleSelect } from './role-select'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const supabase = createClient()
  const search = searchParams.search || ''

  let query = supabase.from('users').select('*').order('created_at', { ascending: false })

  if (search) {
    query = query.or(`full_name.ilike.%${search}%,reg_number.ilike.%${search}%,email.ilike.%${search}%`)
  }

  const { data: students } = await query

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Students Management</h1>
        <p className="text-muted-foreground">View all registered users and manage their roles.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>
            Search by name, register number or email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <form>
              <Input 
                name="search" 
                placeholder="Search students..." 
                defaultValue={search}
                className="max-w-sm"
              />
            </form>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Register Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Branch / Year</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!students || students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>{student.reg_number}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.branch} - Year {student.year}</TableCell>
                    <TableCell>{new Date(student.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <RoleSelect userId={student.id} currentRole={student.role} />
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
