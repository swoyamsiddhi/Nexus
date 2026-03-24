'use client'

import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Pin } from 'lucide-react'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import { Event, Announcement, Club } from './types'

export function EventFeedCard({ event }: { event: Event }) {
  const regCount = event.registrations?.[0]?.count || 0
  const capacity = event.max_capacity
  const spotsLeft = capacity ? capacity - regCount : null
  const isFull = capacity ? regCount >= capacity : false

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden bg-muted">
         {event.banner_url ? (
           <Image 
             src={event.banner_url} 
             alt={event.title} 
             width={600}
             height={400}
             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
           />
         ) : (
           <div className="w-full h-full flex items-center justify-center text-primary/20">
             <Calendar className="h-12 w-12" />
           </div>
         )}
         <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur shadow-sm">
               {new Date(event.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </Badge>
         </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center gap-2 mb-2">
           <Image 
             src={event.club?.logo_url || '/placeholder-club.png'} 
             alt={event.club?.name || 'Club'} 
             width={20}
             height={20}
             className="h-5 w-5 rounded-full object-cover" 
           />
           <span className="text-xs font-semibold text-muted-foreground">{event.club?.name}</span>
        </div>
        <CardTitle className="text-xl line-clamp-1">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>
        
        {capacity && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className={isFull ? "text-destructive font-semibold" : "text-muted-foreground"}>
                {isFull ? "Full" : `${spotsLeft} spots left`}
              </span>
              <span>{Math.round((regCount/capacity) * 100)}%</span>
            </div>
            <Progress value={(regCount/capacity) * 100} className="h-1" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link 
          href={`/events/${event.id}`}
          className={buttonVariants({ variant: isFull ? "secondary" : "default", className: 'w-full' })}
        >
          {isFull ? "View Details" : "Register Now"}
        </Link>
      </CardFooter>
    </Card>
  )
}

export function AnnouncementFeedCard({ announcement }: { announcement: Announcement }) {
  return (
    <Card className="bg-yellow-50/30 border-yellow-200/50">
      <CardHeader className="p-4 pb-2 flex-row justify-between items-start space-y-0">
        <div className="flex items-center gap-2">
           <Image 
             src={announcement.club?.logo_url || '/placeholder-club.png'} 
             alt={announcement.club?.name || 'Club'} 
             width={24}
             height={24}
             className="h-6 w-6 rounded-full object-cover" 
           />
           <div>
             <span className="text-xs font-bold block">{announcement.club?.name}</span>
             <span className="text-[10px] text-muted-foreground">
               {formatDistanceToNow(new Date(announcement.created_at))} ago
             </span>
           </div>
        </div>
        {announcement.pinned_until && (
          <Badge variant="outline" className="text-[10px] bg-yellow-100/50 border-yellow-300 text-yellow-700 h-5">
            <Pin className="h-3 w-3 mr-1" /> Pinned
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {announcement.content}
        </p>
      </CardContent>
    </Card>
  )
}

export function SuggestClubCard({ club }: { club: Club }) {
  return (
    <Card className="flex items-center justify-between p-4 bg-muted/20">
       <div className="flex items-center gap-3">
          <Image 
            src={club.logo_url || '/placeholder-club.png'} 
            alt={club.name} 
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover" 
          />
          <div>
            <h4 className="text-sm font-bold">{club.name}</h4>
            <p className="text-xs text-muted-foreground">{club.category} • {club.follows?.[0]?.count || 0} followers</p>
          </div>
       </div>
       <Button size="sm" variant="outline">Follow</Button>
    </Card>
  )
}
