import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getDashboardFeed } from './actions'
import { DashboardFeed } from '@/components/dashboard/dashboard-feed'
import { RealtimeFeedNotifier } from '@/components/dashboard/realtime-notifier'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { items, hasFollows } = await getDashboardFeed(1)

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <RealtimeFeedNotifier />
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tighter italic uppercase">Your Feed</h1>
        <p className="text-sm text-muted-foreground font-medium">SRM Connect • Latest on Campus</p>
      </div>
      
      <DashboardFeed 
        initialItems={items || []} 
        hasFollowsInitial={!!hasFollows} 
      />
    </div>
  )
}
