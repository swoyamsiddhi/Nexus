import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TeamPostCard } from '@/components/teams/team-card'
import { TeamsEmptyState } from '@/components/ui/empty-state'
import { buttonVariants } from '@/components/ui/button'
import { Target, Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Team Board',
  description: 'Find teammates for your next hackathon at SRM University. Browse open team posts or post your own.',
}

export default async function TeamsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const status = searchParams.status || 'open'

  const { data: teams } = await supabase
    .from('team_posts')
    .select(`
      *,
      poster:users(id, full_name, branch, year, avatar_url),
      applications:team_applications(id)
    `)
    .eq('status', status)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Team Board</h1>
          </div>
          <p className="text-muted-foreground max-w-md font-medium">
            Find teammates for your next hackathon or campus competition.
          </p>
        </div>
        <Link
          href="/teams/create"
          className={buttonVariants({ className: 'rounded-full h-12 px-8 font-black uppercase italic tracking-tighter' })}
        >
          <Plus className="mr-2 h-5 w-5" /> Post a Team
        </Link>
      </div>

      <div className="flex gap-3 mb-8">
        {(['open', 'closed'] as const).map(s => (
          <Link
            key={s}
            href={`/teams?status=${s}`}
            className={`text-xs font-black py-2 px-5 rounded-full border-2 uppercase tracking-widest transition-colors ${status === s ? 'bg-primary text-white border-primary' : 'border-muted hover:bg-muted/40'}`}
          >
            {s}
          </Link>
        ))}
      </div>

      {teams && teams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {teams.map((team: any) => (
            <TeamPostCard key={team.id} post={team} currentUserId={user.id} />
          ))}
        </div>
      ) : (
        <TeamsEmptyState />
      )}
    </div>
  )
}
