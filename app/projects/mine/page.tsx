import { getMyProjectData } from '../actions'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProjectCard } from '@/components/projects/project-card'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Layout, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Project, ProjectInterest } from '@/components/projects/types'

export default async function MyProjectsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const data = await getMyProjectData()
  if ('error' in data) redirect('/auth/login')
  
  const { myProjects, myInterests } = data as { myProjects: Project[], myInterests: (ProjectInterest & { project: Project & { poster: { full_name: string } } })[] }

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <Link 
        href="/projects" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to Collaboration
      </Link>

      <div className="space-y-12">
        <div className="space-y-4">
           <div className="flex items-center gap-3 text-primary">
              <Layout className="h-8 w-8" />
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">My Dashboard</h1>
           </div>
           <p className="text-muted-foreground font-medium">Manage your collaboration requests and outgoing interests.</p>
        </div>

        {/* Section: My Projects */}
        <div className="space-y-6">
           <div className="flex items-center gap-3">
              <Badge variant="outline" className="h-4 w-4 rounded-full p-0 bg-primary border-none" />
              <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">My Projects</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProjects?.map((project: Project) => (
                 <ProjectCard key={project.id} project={project} currentUserId={user.id} />
              ))}
              {(!myProjects || myProjects.length === 0) && (
                <p className="text-sm text-muted-foreground italic col-span-full">You haven&apos;t posted any projects yet.</p>
              )}
           </div>
        </div>

        <hr className="border-muted/50" />

        {/* Section: My Outgoing Interests */}
        <div className="space-y-6">
           <div className="flex items-center gap-3">
              <Badge variant="outline" className="h-4 w-4 rounded-full p-0 bg-orange-500 border-none" />
              <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Outgoing Requests</h2>
           </div>
           <div className="space-y-4">
              {myInterests?.map((interest) => (
                 <div key={interest.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl border-2 border-dashed bg-muted/5 hover:bg-muted/10 transition-colors gap-6 group">
                    <div className="space-y-2 flex-1">
                       <div className="flex items-center gap-3">
                          <h4 className="text-lg font-black italic uppercase tracking-tighter text-primary group-hover:underline transition-all">
                             <Link href={`/projects/${interest.project.id}`}>
                                {interest.project.title}
                             </Link>
                          </h4>
                          <Badge variant="secondary" className="rounded-lg font-bold italic uppercase text-[10px]">
                            {interest.project.looking_for}
                          </Badge>
                       </div>
                       <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-bold text-muted-foreground opacity-70">
                          <span className="flex items-center gap-1.5 font-bold uppercase tracking-tight">
                            Poster: {interest.project.poster?.full_name}
                          </span>
                       </div>
                       <div className="mt-3 p-4 rounded-2xl bg-white border italic text-xs text-muted-foreground">
                          &ldquo;{interest.message}&rdquo;
                       </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                       <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-40">Sent {new Date(interest.created_at).toLocaleDateString()}</span>
                       <Link 
                         href={`/projects/${interest.project.id}`}
                         className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-xl font-bold uppercase italic text-xs h-9 px-6' })}
                       >
                         View Project
                       </Link>
                    </div>
                 </div>
              ))}
              {(!myInterests || myInterests.length === 0) && (
                <p className="text-sm text-muted-foreground italic">You haven&apos;t expressed interest in any projects yet.</p>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
