'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { Project } from './types'
import { formatDistanceToNow } from 'date-fns'

export function ProjectCard({ project, currentUserId }: { project: Project, currentUserId?: string }) {
  const isOwner = project.posted_by === currentUserId
  
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'co-builder': return 'bg-blue-500 hover:bg-blue-600'
      case 'mentor': return 'bg-purple-500 hover:bg-purple-600'
      case 'feedback': return 'bg-orange-500 hover:bg-orange-600'
      default: return 'bg-secondary'
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow relative overflow-hidden group border-2">
      <CardHeader className="p-4 pb-2">
         <div className="flex justify-between items-start">
            <Badge className={`${getBadgeColor(project.looking_for)} text-white border-none rounded-lg px-2 text-[10px] font-black uppercase italic tracking-tighter`}>
               Looking for: {project.looking_for}
            </Badge>
            <span className="text-[10px] font-bold text-muted-foreground uppercase">{formatDistanceToNow(new Date(project.created_at))} ago</span>
         </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4">
         <div>
            <CardTitle className="text-xl font-black uppercase italic tracking-tighter leading-none mb-2">{project.title}</CardTitle>
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed font-medium">
               {project.description}
            </p>
         </div>

         <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.map(tech => (
              <Badge key={tech} variant="outline" className="text-[10px] font-bold border-primary/20 bg-primary/5 text-primary">
                {tech}
              </Badge>
            ))}
         </div>

         <div className="flex items-center gap-2 pt-2 border-t border-muted">
            <Image 
              src={project.poster?.avatar_url || '/placeholder-avatar.png'} 
              alt={project.poster?.full_name || 'User'} 
              width={24}
              height={24}
              className="h-6 w-6 rounded-full bg-muted object-cover" 
            />
            <div className="flex-1 min-w-0">
               <p className="text-[10px] font-bold truncate">{project.poster?.full_name}</p>
               <p className="text-[8px] text-muted-foreground uppercase tracking-tight">{project.poster?.branch} • Year {project.poster?.year}</p>
            </div>
         </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
         {isOwner ? (
           <Link 
             href={`/projects/mine`}
             className={buttonVariants({ variant: 'outline', className: 'w-full rounded-2xl h-10 font-black italic uppercase tracking-tighter text-xs' })}
           >
             Manage Interest
           </Link>
         ) : (
           <Link 
             href={`/projects/${project.id}`}
             className={buttonVariants({ className: 'w-full rounded-2xl h-10 font-black italic uppercase tracking-tighter text-xs' })}
           >
             I can help
           </Link>
         )}
      </CardFooter>
    </Card>
  )
}
