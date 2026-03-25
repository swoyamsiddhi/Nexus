import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, MapPin, Users, ChevronRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

interface EventCardProps {
  id: number
  title: string
  clubId: number
  clubName: string
  clubLogo?: string | null
  bannerUrl?: string | null
  venue?: string | null
  eventDate: string
  registrationDeadline?: string | null
  maxCapacity?: number | null
  currentRegistrations: number
}

export function EventCard({
  id,
  title,
  clubId,
  clubName,
  clubLogo,
  bannerUrl,
  venue,
  eventDate,
  registrationDeadline,
  maxCapacity,
  currentRegistrations
}: EventCardProps) {
  
  const isPastDeadline = registrationDeadline ? new Date(registrationDeadline) < new Date() : false
  const isFull = maxCapacity ? currentRegistrations >= maxCapacity : false
  const spotsRemaining = maxCapacity ? Math.max(0, maxCapacity - currentRegistrations) : null

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow overflow-hidden">
      {/* Banner */}
      <div className="h-32 w-full bg-muted shrink-0 relative">
        {bannerUrl ? (
          <img src={bannerUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-primary/20 to-primary/5" />
        )}
        <div className="absolute top-2 right-2 flex gap-1 items-center">
          {isPastDeadline ? (
            <Badge variant="secondary" className="bg-background/90 text-muted-foreground border-transparent">Closed</Badge>
          ) : isFull ? (
            <Badge variant="destructive" className="bg-destructive hover:bg-destructive">Full</Badge>
          ) : (
            <Badge variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">Open</Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-3 pt-4">
        {/* Club Meta */}
        <Link href={`/clubs/${clubId}`} className="flex items-center gap-2 mb-2 group w-fit">
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
            {clubLogo ? (
              <img src={clubLogo} alt={clubName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[10px] font-bold text-muted-foreground">{clubName.charAt(0)}</span>
            )}
          </div>
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {clubName}
          </span>
        </Link>
        <CardTitle className="text-lg line-clamp-2 leading-tight mb-1">{title}</CardTitle>
      </CardHeader>
      
      <CardContent className="mt-auto space-y-2 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {new Date(eventDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">{venue || 'TBA'}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 shrink-0" />
          {maxCapacity ? (
            <span className={isFull ? 'text-destructive font-medium' : ''}>
              {spotsRemaining} spot{spotsRemaining !== 1 ? 's' : ''} left
            </span>
          ) : (
            <span>{currentRegistrations} registered</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <Link 
          href={`/events/${id}`}
          className={buttonVariants({ variant: isPastDeadline ? 'secondary' : 'default', className: 'w-full' })}
        >
          {isPastDeadline ? 'View Details' : 'Register Now'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </CardFooter>
    </Card>
  )
}
