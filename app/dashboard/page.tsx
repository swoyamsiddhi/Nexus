import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getDashboardFeed } from './actions'
import { DashboardFeed } from '@/components/dashboard/dashboard-feed'
import { RealtimeFeedNotifier } from '@/components/dashboard/realtime-notifier'

// SRM Connect V2 Personalization Widgets
import { ConflictDetector } from '@/components/dashboard/widgets/ConflictDetector'
import { NextClassWidget } from '@/components/dashboard/widgets/NextClassWidget'
import { UpcomingEventsWidget } from '@/components/dashboard/widgets/UpcomingEventsWidget'
import { AiRecommendations } from '@/components/dashboard/widgets/AiRecommendations'
import Link from 'next/link'
import { Users, ShoppingBag, Trophy, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { items, hasFollows } = await getDashboardFeed(1)

  return (
    <div className="container mx-auto max-w-7xl py-10 px-4 sm:px-6">
      <RealtimeFeedNotifier />
      
      {/* Dashboard Header greeting user */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 text-foreground">
          Good Morning, {user.email?.split('@')[0] || 'Student'} 👋
        </h1>
        <p className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
          SRM Connect • Week 4 • Fall Semester
        </p>
      </div>
      
      {/* 3-Column Grid Layout (V2 Architecture) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* LEFT COLUMN: Personal Schedule Context */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <NextClassWidget />
          <UpcomingEventsWidget />
        </div>

        {/* CENTER COLUMN: Main Campus Feed & Active Alerts */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Smart Notifications injected above the feed */}
          <ConflictDetector />
          
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Campus Feed</h2>
          </div>
          
          <DashboardFeed 
            initialItems={items || []} 
            hasFollowsInitial={!!hasFollows} 
          />
        </div>

        {/* RIGHT COLUMN: AI Discovery & Matchmaking */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <AiRecommendations />
          
          {/* Phase 3: Community Modules Linking */}
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
             <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-5">Campus Community</h3>
             <div className="flex flex-col gap-3">
               <Link href="/dashboard/study-buddy" className="flex items-center justify-between p-3 rounded-xl bg-background border hover:border-primary hover:shadow-md transition-all group">
                 <div className="flex items-center gap-3">
                   <div className="bg-primary/10 p-2 rounded-lg text-primary"><Users className="h-4 w-4" /></div>
                   <span className="font-bold text-sm text-foreground">Study Buddy</span>
                 </div>
                 <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
               </Link>
               
               <Link href="/dashboard/marketplace" className="flex items-center justify-between p-3 rounded-xl bg-background border hover:border-secondary hover:shadow-md transition-all group">
                 <div className="flex items-center gap-3">
                   <div className="bg-secondary/20 p-2 rounded-lg text-secondary"><ShoppingBag className="h-4 w-4" /></div>
                   <span className="font-bold text-sm text-foreground">Marketplace</span>
                 </div>
                 <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all" />
               </Link>
               
               <Link href="/dashboard/leaderboards" className="flex items-center justify-between p-3 rounded-xl bg-background border hover:border-primary hover:shadow-md transition-all group">
                 <div className="flex items-center gap-3">
                   <div className="bg-primary/10 p-2 rounded-lg text-primary"><Trophy className="h-4 w-4" /></div>
                   <span className="font-bold text-sm text-foreground">Leaderboards</span>
                 </div>
                 <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
               </Link>
             </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
