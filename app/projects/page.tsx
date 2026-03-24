import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProjectCard } from '@/components/projects/project-card'
import { ProjectsEmptyState } from '@/components/ui/empty-state'
import { buttonVariants } from '@/components/ui/button'
import { Plus, Search, Sparkles, Filter, Layout } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Project } from '@/components/projects/types'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Project Collaboration',
  description: 'Find projects to collaborate on, get expert feedback, or find a mentor to guide your build at SRM University.',
}

export default async function ProjectsPage({ searchParams }: { searchParams: { looking_for?: string, stack?: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { getProjects } = await import('./actions')
  const filter = searchParams.looking_for || 'all'
  const stack = searchParams.stack
  
  const projects = await getProjects(filter, stack) as Project[]

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Collaboration Board</h1>
           </div>
           <p className="text-muted-foreground max-w-md font-medium">
             Find projects to collaborate on, get expert feedback, or find a mentor to guide your build.
           </p>
        </div>
        <div className="flex gap-4">
           <Link 
             href="/projects/mine"
             className={buttonVariants({ variant: 'outline', className: 'rounded-full h-12 px-8 font-black uppercase italic tracking-tighter' })}
           >
             My Projects
           </Link>
           <Link 
             href="/projects/create"
             className={buttonVariants({ className: 'rounded-full h-12 px-8 font-black uppercase italic tracking-tighter' })}
           >
             <Plus className="mr-2 h-5 w-5" />
             Post Project
           </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 space-y-8">
           <div className="space-y-4 p-6 bg-muted/20 rounded-[2rem] border-2 border-dashed border-muted">
              <div className="flex items-center gap-2 font-black uppercase italic tracking-tighter text-sm">
                 <Filter className="h-4 w-4" /> Looking For
              </div>
              <div className="flex flex-col gap-2">
                 {[
                   { id: 'all', label: 'All Projects' },
                   { id: 'co-builder', label: 'Co-builder' },
                   { id: 'mentor', label: 'Mentor / Guide' },
                   { id: 'feedback', label: 'Feedback Only' }
                 ].map(f => (
                   <Link 
                     key={f.id}
                     href={`/projects?looking_for=${f.id}${stack ? `&stack=${stack}` : ''}`}
                     className={`text-xs font-bold py-2 px-4 rounded-xl transition-colors ${filter === f.id ? 'bg-primary text-white' : 'hover:bg-primary/10'}`}
                   >
                     {f.label}
                   </Link>
                 ))}
              </div>
           </div>

           <div className="space-y-4 p-6 bg-primary/5 rounded-[2rem] border-2 border-primary/10">
              <div className="flex items-center gap-2 font-black uppercase italic tracking-tighter text-sm text-primary">
                 <Layout className="h-4 w-4" /> Tech Search
              </div>
              <form className="relative group">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                   name="stack" 
                   defaultValue={stack} 
                   placeholder="React, AWS..." 
                   className="pl-9 h-10 rounded-xl bg-white border-primary/20" 
                />
                <input type="hidden" name="looking_for" value={filter} />
              </form>
           </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1">
           {projects && projects.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {projects.map((project) => (
                 <ProjectCard key={project.id} project={project} currentUserId={user.id} />
               ))}
             </div>
           ) : (
             <ProjectsEmptyState />
           )}
        </div>
      </div>
    </div>
  )
}
