'use client'

import { useState } from 'react'
import { handleInterest } from '../actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { Loader2, MessageCircle, ShieldCheck } from 'lucide-react'

interface InterestStudent {
  id: string
  full_name: string
  branch?: string
  year?: number
  avatar_url?: string
}

interface Interest {
  id: number
  message?: string
  created_at: string
  student: InterestStudent
}

interface InterestsSectionProps {
  postId: number
  interests: Interest[]
  isOwner: boolean
  currentUserId: string
  isExpired: boolean
}

export function InterestsSection({ postId, interests, isOwner, currentUserId, isExpired }: InterestsSectionProps) {
  const [message, setMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  
  const studentInterest = interests.find((i) => (i as Interest & { student_id?: string }).student_id === currentUserId)
  const [hasExpressedInterest, setHasExpressedInterest] = useState(!!studentInterest)

  const onSubmitInterest = async () => {
    setIsPending(true)
    const res = await handleInterest(postId, message)
    if (res.success) {
      setHasExpressedInterest(true)
      window.location.reload()
    }
    setIsPending(false)
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-bold flex items-center gap-2 italic uppercase tracking-tighter">
           <MessageCircle className="h-5 w-5 text-primary not-italic" /> 
           Interested Students ({interests.length})
         </h3>
      </div>

      {!hasExpressedInterest && !isOwner && !isExpired && (
        <div className="bg-primary/5 border border-primary/10 rounded-3xl p-6 space-y-4">
           <div className="space-y-2">
             <h4 className="font-bold">I&apos;m interested!</h4>
             <p className="text-sm text-muted-foreground">Add a message about your travel plans or why you want to join.</p>
           </div>
           <Textarea 
             placeholder="Ex: I can drive! / I'm looking for a team too."
             value={message}
             onChange={(e) => setMessage(e.target.value)}
             className="bg-background"
           />
           <Button 
             className="w-full rounded-2xl py-6 font-bold"
             disabled={isPending}
             onClick={onSubmitInterest}
           >
             {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Express Interest"}
           </Button>
        </div>
      )}

      {hasExpressedInterest && !isOwner && (
        <div className="bg-green-50 border border-green-100 rounded-3xl p-4 flex items-center gap-3 text-green-700">
           <ShieldCheck className="h-5 w-5" />
           <span className="text-sm font-bold">You&apos;ve expressed interest! The poster will be notified.</span>
        </div>
      )}

      <div className="space-y-4">
        {interests.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No one has expressed interest yet.</p>
        ) : (
          interests.map((interest) => (
            <div key={interest.id} className="flex gap-4 p-4 rounded-3xl border bg-muted/20">
               <Avatar>
                 <AvatarImage src={interest.student?.avatar_url} />
                 <AvatarFallback>{interest.student?.full_name?.charAt(0)}</AvatarFallback>
               </Avatar>
               <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                     <h4 className="text-sm font-bold">{interest.student?.full_name}</h4>
                     <span className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(interest.created_at))} ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{interest.student?.branch} • Year {interest.student?.year}</p>
                  {interest.message && (
                    <div className="mt-2 p-3 rounded-2xl bg-background border text-sm italic text-muted-foreground">
                       &ldquo;{interest.message}&rdquo;
                    </div>
                  )}
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
