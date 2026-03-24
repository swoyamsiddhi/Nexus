import { getPostDetails, closePost } from '../actions'
import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Globe, Users, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { InterestsSection } from './interests-section'
import Image from 'next/image'

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const post = await getPostDetails(parseInt(params.id))
  if (!post) notFound()

  const isOwner = post.posted_by === user.id
  const isExpired = new Date(post.expires_at) < new Date()

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Link 
        href="/going-out" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to Feed
      </Link>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
             <Badge variant={isExpired ? "secondary" : "outline"} className="capitalize">
                {isExpired ? 'Expired' : post.looking_for === 'both' ? 'Buddies & Teammates' : `Looking for ${post.looking_for}`}
             </Badge>
             {isOwner && !isExpired && (
                <form action={async () => {
                  'use server'
                  await closePost(post.id)
                }}>
                  <Button variant="destructive" size="sm" className="h-8 rounded-full">Close Post</Button>
                </form>
             )}
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">{post.event_name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
             <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {post.event_location}</span>
             <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> {new Date(post.event_date).toLocaleString()}</span>
             <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> Active until {new Date(post.expires_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-muted">
           <Image 
             src={post.poster?.avatar_url || '/placeholder-avatar.png'} 
             alt={post.poster?.full_name || 'User'} 
             width={48}
             height={48}
             className="h-12 w-12 rounded-full border-2 border-background object-cover" 
           />
           <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Posted By</p>
              <h4 className="font-bold">{post.poster?.full_name}</h4>
              <p className="text-xs text-muted-foreground font-medium">{post.poster?.branch} • Year {post.poster?.year}</p>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-lg font-bold flex items-center gap-2">
             <Info className="h-5 w-5 text-primary" /> 
             Details & Plans
           </h3>
           <div className="p-6 rounded-2xl bg-background border shadow-sm prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap">{post.details}</p>
           </div>
           
           <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                 <Users className="h-4 w-4" /> {post.spots_needed} spots requested
              </div>
              <a 
                href={post.source_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:bg-muted px-4 py-2 rounded-full text-sm font-medium border transition-colors"
              >
                 <Globe className="h-4 w-4" /> Official Link
              </a>
           </div>
        </div>

        <hr className="border-muted" />

        <InterestsSection 
          postId={post.id} 
          interests={post.interests} 
          isOwner={isOwner}
          currentUserId={user.id}
          isExpired={isExpired}
        />
      </div>
    </div>
  )
}

function Info({ className }: { className?: string }) {
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
