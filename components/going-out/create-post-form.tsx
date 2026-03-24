'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Globe, AlertCircle } from 'lucide-react'
import { createGoingOutPost } from '@/app/going-out/actions'
import Link from 'next/link'

export function CreatePostForm() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [existingId, setExistingId] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    setExistingId(null)

    const formData = new FormData(e.currentTarget)
    
    // URL Validation
    const url = formData.get('source_url') as string
    try {
      new URL(url)
    } catch {
      setError('Please enter a valid source URL')
      setIsPending(false)
      return
    }

    const res = await createGoingOutPost(formData)
    if (res.error === 'ALREADY_POSTED') {
      setError('Someone already posted this event!')
      setExistingId(res.existingId)
    } else if (res.error) {
      setError(res.error)
    } else {
      router.push('/going-out')
    }
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">{error}</p>
            {existingId && (
              <Link 
                href={`/going-out/${existingId}`}
                className="text-xs text-destructive underline mt-1 block"
              >
                View existing post instead →
              </Link>
            )}
          </div>
        </div>
      )}

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event_name">Event Name</Label>
            <Input id="event_name" name="event_name" required placeholder="Ex: Zomaland 2024" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event_location">Location</Label>
              <Input id="event_location" name="event_location" required placeholder="Ex: YMCA Nandanam" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event_date">Date</Label>
              <Input id="event_date" name="event_date" type="datetime-local" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source_url">Source Link (Official event page / Ticket link)</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="source_url" name="source_url" required className="pl-9" placeholder="https://..." />
            </div>
          </div>

          <div className="space-y-3">
             <Label>Looking For</Label>
             <div className="flex gap-4">
                {['buddies', 'teammates', 'both'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="looking_for" 
                      value={type} 
                      required 
                      className="accent-primary"
                    />
                    <span className="text-sm capitalize group-hover:text-primary transition-colors">{type === 'both' ? 'Both' : type}</span>
                  </label>
                ))}
             </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="spots_needed">Spots Needed (1–10)</Label>
            <Input id="spots_needed" name="spots_needed" type="number" min="1" max="10" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details & Travel Plans</Label>
            <Textarea 
              id="details" 
              name="details" 
              required 
              placeholder="Ex: Planning to take the metro from Potheri at 1PM. Looking for 2 people to share an auto from the station." 
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Publish Post"}
        </Button>
      </div>
    </form>
  )
}
