import Link from 'next/link'
import { LayoutDashboard, UserCheck, Users, Component } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40 p-4 hidden md:block">
        <div className="flex h-12 items-center px-4 font-bold text-lg mb-4">
          SRM Connect Admin
        </div>
        <nav className="space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/requests"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <UserCheck className="h-4 w-4" />
            Organiser Requests
          </Link>
          <Link
            href="/admin/clubs"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Component className="h-4 w-4" />
            Clubs
          </Link>
          <Link
            href="/admin/students"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Users className="h-4 w-4" />
            Students
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header (optional) */}
        <div className="md:hidden flex h-14 items-center border-b px-4 font-bold">
          SRM Connect Admin
        </div>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
