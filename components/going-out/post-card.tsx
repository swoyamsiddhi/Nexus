'use client'

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { handleInterest } from '@/app/going-out/actions'
import { useState } from 'react'
import { GoingOutPost } from './types'

export function GoingOutPostCard({ post, currentUserId }: { post: GoingOutPost, currentUserId?: string }) {
  const [isInterested, setIsInterested] = useState(
    post.interests?.some((i) => i.student_id === currentUserId)
  )
  const [isLoading, setIsLoading] = useState(false)

  const onInterestClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInterested || isLoading) return
    
    setIsLoading(true)
    const res = await handleInterest(post.id)
    if (res.success) {
      setIsInterested(true)
    }
    setIsLoading(false)
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
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
                  <p className="text-[10px] text-muted-foreground uppercase">{post.poster?.branch} • Year {post.poster?.year}</p>
               </div>
            </div>
            <Badge variant="secondary" className="text-[10px] capitalize">
               {post.looking_for === 'both' ? 'Buddies & Teammates' : `Looking for ${post.looking_for}`}
            </Badge>
         </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
         <div>
            <CardTitle className="text-lg mb-1">{post.event_name}</CardTitle>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
               <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {post.event_location}</span>
               <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {new Date(post.event_date).toLocaleDateString()}</span>
            </div>
         </div>
         
         <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-xs">
               <Users className="h-3.5 w-3.5 text-primary" />
               <span className="font-medium">{post.spots_needed} spots needed</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
               <MessageCircle className="h-3.5 w-3.5 text-primary" />
               <span className="font-medium">{post.interests?.length || 0} interested</span>
            </div>
         </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
         <Button 
           size="sm" 
           className="flex-1 rounded-full text-xs h-8"
           disabled={isInterested || isLoading || currentUserId === post.posted_by}
           onClick={onInterestClick}
           variant={isInterested ? "secondary" : "default"}
         >
           {isInterested ? "Interested ✓" : "I'm Interested"}
         </Button>
         <Link 
           href={`/going-out/${post.id}`}
           className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-full text-xs h-8 flex-1' })}
         >
           View Details
         </Link>
      </CardFooter>
    </Card>
  )
}
