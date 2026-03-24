import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, CalendarDays, ExternalLink } from 'lucide-react'

interface ClubCardProps {
  id: number
  name: string
  category: string | null
  description: string | null
  followerCount: number
  eventCount: number
}

export function ClubCard({ id, name, category, description, followerCount, eventCount }: ClubCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-xl line-clamp-2">{name}</CardTitle>
          {category && <Badge variant="secondary" className="whitespace-nowrap">{category}</Badge>}
        </div>
        <CardDescription className="line-clamp-3 min-h-[4rem]">
          {description || 'No description provided.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="mt-auto">
        <div className="flex gap-4 text-sm text-muted-foreground mr-4">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{followerCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{eventCount} Events</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 border-t">
        <Link 
          href={`/clubs/${id}`} 
          className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          View Club Profile
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
