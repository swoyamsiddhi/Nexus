import { getPostApplications, processApplication } from '../../actions'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Target, ArrowLeft, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { TeamApplication } from '@/components/teams/types'

export default async function ManageTeamPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const post = await getPostApplications(parseInt(params.id))
  if (!post) notFound()

  const isOwner = post.posted_by === user.id
  if (!isOwner) redirect('/teams')

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Link 
        href="/teams?tab=mine" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to My Posts
      </Link>

      <div className="space-y-12">
        <div className="bg-primary shadow-2xl shadow-primary/20 rounded-[3rem] p-8 md:p-12 text-primary-foreground relative overflow-hidden">
           <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                 <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur rounded-full px-4 font-bold italic uppercase h-6">
                    {post.status === 'open' ? 'Recruiting' : 'Team Full'}
                 </Badge>
                 <span className="text-xs font-bold uppercase tracking-widest opacity-80 flex items-center gap-1.5">
                   <Calendar className="h-3.5 w-3.5" /> Hackathon on {new Date(post.event_date).toLocaleDateString()}
                 </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none max-w-2xl">{post.hackathon_name}</h1>
              
              <div className="flex flex-wrap gap-8">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</p>
                    <div className="flex items-center gap-2">
                       <Users className="h-5 w-5" />
                       <span className="text-xl font-black italic uppercase tracking-tighter">{post.spots_available} spots left</span>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Applicants</p>
                    <div className="flex items-center gap-2">
                       <Clock className="h-5 w-5" />
                       <span className="text-xl font-black italic uppercase tracking-tighter">{post.applications?.length || 0} total</span>
                    </div>
                 </div>
              </div>
           </div>

           <Target className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 rotate-12" />
        </div>

        <div className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">Applications</h2>
              {post.spots_available === 0 && (
                <div className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-green-200">
                  <CheckCircle2 className="h-4 w-4" /> Team is Complete
                </div>
              )}
           </div>

           <div className="grid grid-cols-1 gap-6">
              {post.applications && post.applications.length > 0 ? (
                post.applications.map((app: TeamApplication) => (
                  <div key={app.id} className="bg-background border-2 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                     {app.status !== 'pending' && (
                        <div className="absolute top-0 right-0 p-6 z-20">
                           <Badge 
                             variant={app.status === 'accepted' ? 'default' : 'destructive'}
                             className="rounded-lg px-4 py-1 font-black italic uppercase text-xs"
                           >
                              {app.status}
                           </Badge>
                        </div>
                     )}
                     
                     <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex items-center md:items-start gap-4">
                           <Image 
                             src={app.student?.avatar_url || '/placeholder-avatar.png'} 
                             alt={app.student?.full_name || 'Applicant'} 
                             width={60} 
                             height={60} 
                             className="h-14 w-14 rounded-full border-2 border-primary/10 object-cover" 
                           />
                           <div>
                              <h4 className="text-xl font-black italic uppercase tracking-tighter leading-tight">{app.student?.full_name}</h4>
                              <p className="text-xs text-muted-foreground font-bold uppercase tracking-tight">{app.student?.branch} • Year {app.student?.year}</p>
                              <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Applied {formatDistanceToNow(new Date(app.created_at))} ago
                              </p>
                           </div>
                        </div>

                        <div className="flex-1 bg-muted/20 p-6 rounded-2xl relative border border-dashed border-muted">
                           <h5 className="text-[10px] font-black uppercase text-primary tracking-widest mb-3">Cover Message</h5>
                           <p className="text-sm font-medium leading-relaxed italic text-muted-foreground">
                              &ldquo;{app.message}&rdquo;
                           </p>
                        </div>

                        {app.status === 'pending' && (
                           <div className="flex flex-row md:flex-col gap-2 justify-center">
                              <form action={async () => {
                                'use server'
                                await processApplication(app.id, 'accepted')
                              }}>
                                 <Button 
                                   className="w-full md:w-32 bg-green-600 hover:bg-green-700 rounded-xl h-12 font-bold uppercase italic tracking-tighter"
                                   disabled={post.spots_available === 0}
                                 >
                                    Accept
                                 </Button>
                              </form>
                              <form action={async () => {
                                'use server'
                                await processApplication(app.id, 'rejected')
                              }}>
                                 <Button 
                                   variant="outline"
                                   className="w-full md:w-32 border-destructive/20 text-destructive hover:bg-destructive/10 rounded-xl h-12 font-bold uppercase italic tracking-tighter"
                                 >
                                    Reject
                                 </Button>
                              </form>
                           </div>
                        )}
                     </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-muted/10 rounded-[2rem] border-2 border-dashed border-muted">
                   <InfoIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                   <h3 className="text-xl font-bold italic uppercase tracking-tighter">No Applications Yet</h3>
                   <p className="text-muted-foreground mt-2 font-medium">Sit tight! Interested students will apply soon.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}

function InfoIcon({ className }: { className?: string }) {
   return (
      <svg 
         xmlns="http://www.w3.org/2000/svg" 
         width="24" height="24" 
         viewBox="0 0 24 24" 
         fill="none" 
         stroke="currentColor" 
         strokeWidth="2" 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         className={className}
      >
         <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
      </svg>
   )
}
