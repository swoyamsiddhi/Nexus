import { getProjectDetails } from '../actions'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, Clock, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { ProjectInterest } from '@/components/projects/types'
import { InterestButton } from './interest-button'

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const project = await getProjectDetails(parseInt(params.id))
  if (!project) notFound()

  const isOwner = project.posted_by === user.id
  const hasExpressedInterest = project.interests?.some((i: ProjectInterest) => i.student_id === user.id)

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Link 
        href="/projects" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to Board
      </Link>

      <div className="space-y-12">
        <div className="space-y-6">
           <div className="flex flex-wrap items-center gap-4">
              <Badge className="bg-primary text-white border-none rounded-lg px-4 font-black italic uppercase tracking-tighter h-7">
                Looking for: {project.looking_for}
              </Badge>
              <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 opacity-60">
                 <Clock className="h-3.5 w-3.5" /> Posted {formatDistanceToNow(new Date(project.created_at))} ago
              </span>
           </div>
           
           <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none max-w-3xl">{project.title}</h1>
           
           <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech: string) => (
                <Badge key={tech} variant="secondary" className="px-4 py-1 rounded-xl text-xs font-bold bg-muted/50 border border-muted">
                  {tech}
                </Badge>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-[3rem] bg-background border-2 shadow-sm prose prose-sm max-w-none">
                 <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-primary">Overview</h3>
                 <p className="whitespace-pre-wrap leading-relaxed text-base font-medium text-muted-foreground">{project.description}</p>
              </div>

              {isOwner ? (
                <div className="space-y-6">
                   <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2">
                     <MessageSquare className="h-6 w-6 text-primary" /> Interested Students
                   </h3>
                   <div className="space-y-4">
                      {project.interests && project.interests.length > 0 ? (
                        project.interests.map((interest: ProjectInterest) => (
                          <div key={interest.id} className="p-6 rounded-[2rem] bg-muted/10 border-2 border-dashed border-muted hover:bg-muted/20 transition-colors">
                             <div className="flex items-center gap-4 mb-4">
                                <Image 
                                  src={interest.student?.avatar_url || '/placeholder-avatar.png'} 
                                  alt={interest.student?.full_name || 'Student'} 
                                  width={40} 
                                  height={40} 
                                  className="h-10 w-10 rounded-full object-cover border-2 border-background shadow-sm"
                                />
                                <div>
                                   <h4 className="text-sm font-black italic uppercase tracking-tighter">{interest.student?.full_name}</h4>
                                   <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{interest.student?.branch} • Year {interest.student?.year}</p>
                                </div>
                                <span className="ml-auto text-[10px] font-bold text-muted-foreground opacity-50">{formatDistanceToNow(new Date(interest.created_at))} ago</span>
                             </div>
                             <p className="text-sm font-medium leading-relaxed italic text-muted-foreground overflow-hidden">
                                &ldquo;{interest.message}&rdquo;
                             </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm italic text-muted-foreground px-4">No one has expressed interest yet. Try sharing your project with others!</p>
                      )}
                   </div>
                </div>
              ) : (
                <div className="p-8 rounded-[3rem] bg-primary/5 border-2 border-primary/10 flex flex-col items-center text-center space-y-6">
                   <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-primary" />
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-2xl font-black italic uppercase tracking-tighter">Ready to collaborate?</h3>
                      <p className="text-sm font-medium text-muted-foreground max-w-xs">Send a message to the owner and tell them how you can help.</p>
                   </div>
                   <InterestButton project={project} hasExpressed={!!hasExpressedInterest} />
                </div>
              )}
           </div>

           <div className="space-y-6">
              <div className="p-6 rounded-[2.5rem] bg-background border-2 shadow-xl shadow-primary/5 space-y-6">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">About the Poster</h4>
                 <div className="flex items-center gap-4">
                    <Image 
                      src={project.poster?.avatar_url || '/placeholder-avatar.png'} 
                      alt={project.poster?.full_name || 'User'} 
                      width={56} 
                      height={56} 
                      className="h-14 w-14 rounded-full border-2 border-primary/20 object-cover" 
                    />
                    <div>
                       <h5 className="font-black italic uppercase tracking-tighter text-lg">{project.poster?.full_name}</h5>
                       <p className="text-xs text-muted-foreground font-bold uppercase">{project.poster?.branch}</p>
                       <p className="text-[10px] text-muted-foreground font-medium opacity-60">Year {project.poster?.year}</p>
                    </div>
                 </div>
                 <Button className="w-full rounded-2xl h-12 font-black italic uppercase tracking-tighter text-xs" variant="secondary" disabled>
                    View College Profile
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
