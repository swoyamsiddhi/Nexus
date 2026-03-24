'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { TeamPost } from './types'
import { useState } from 'react'
import { ApplicationModal } from './application-modal'

export function TeamPostCard({ post, currentUserId }: { post: TeamPost, currentUserId?: string }) {
  const [showApply, setShowApply] = useState(false)
  const isOwner = post.posted_by === currentUserId
  const hasApplied = post.applications?.some(a => a.student_id === currentUserId)

  return (
    <Card className="hover:shadow-md transition-shadow relative overflow-hidden group">
      {post.status === 'closed' && (
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
           <Badge variant="secondary" className="scale-125 font-black uppercase italic">Team Full</Badge>
        </div>
      )}
      <CardHeader className="p-4 pb-2">
         <div className="flex justify-between items-start">
            <div className="flex gap-2">
               <Image 
                 src={post.poster?.avatar_url || '/placeholder-avatar.png'} 
                 alt={post.poster?.full_name || 'User'} 
                 width={40}
                 height={40}
                 className="h-10 w-10 rounded-full bg-muted object-cover" 
               />
               <div>
                  <h3 className="text-sm font-bold">{post.poster?.full_name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tight">{post.poster?.branch} • Year {post.poster?.year}</p>
               </div>
            </div>
            <div className="flex flex-col items-end gap-1">
               <Badge variant="outline" className="text-[10px] bg-primary/5 border-primary/20 text-primary">
                  {post.spots_available} {post.spots_available === 1 ? 'Spot' : 'Spots'} Left
               </Badge>
            </div>
         </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-4">
         <div>
            <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-1 tracking-widest">Hackathon</h4>
            <CardTitle className="text-xl italic font-black uppercase tracking-tighter leading-none">{post.hackathon_name}</CardTitle>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground mt-2">
              <Calendar className="h-3 w-3" /> {new Date(post.event_date).toLocaleDateString()}
            </span>
         </div>

         <div className="space-y-2">
            <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Looking For</h4>
            <div className="flex flex-wrap gap-1.5">
               {post.skills_needed.map(skill => (
                 <Badge key={skill} variant="secondary" className="text-[10px] font-bold h-5">
                   {skill}
                 </Badge>
               ))}
            </div>
         </div>

         <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {post.description}
         </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
         {isOwner ? (
           <Link 
             href={`/teams/manage/${post.id}`}
             className={buttonVariants({ variant: 'outline', className: 'w-full rounded-2xl h-10 font-bold italic uppercase tracking-tighter text-xs' })}
           >
             Manage Team
           </Link>
         ) : hasApplied ? (
           <Button variant="secondary" disabled className="w-full rounded-2xl h-10 font-bold italic uppercase tracking-tighter text-xs">
             Applied
           </Button>
         ) : (
           <Button 
             className="w-full rounded-2xl h-10 font-bold italic uppercase tracking-tighter text-xs"
             onClick={() => setShowApply(true)}
           >
             Apply to Join
           </Button>
         )}
      </CardFooter>

      {showApply && (
        <ApplicationModal 
          post={post} 
          onClose={() => setShowApply(false)} 
        />
      )}
    </Card>
  )
}
