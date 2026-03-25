'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CalendarIcon, ImagePlus, Loader2, Eye, Send } from 'lucide-react'
import { createEvent } from '@/app/organiser/actions'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function CreateEventForm({ clubs }: { clubs: { id: number, name: string }[] }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  
  // Form State
  const [clubId, setClubId] = useState(clubs[0]?.id.toString() || '')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [venue, setVenue] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [deadline, setDeadline] = useState('')
  const [capacity, setCapacity] = useState('')
  const [type, setType] = useState('formal')
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerFile(file)
      const reader = new FileReader()
      reader.onloadend = () => setBannerPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)

    try {
      const supabase = createClient()
      let bannerUrl = ''

      if (bannerFile) {
        const fileExt = bannerFile.name.split('.').pop()
        const fileName = `${clubId}-${Date.now()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('event-banners')
          .upload(fileName, bannerFile)

        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('event-banners')
          .getPublicUrl(fileName)
        
        bannerUrl = publicUrl
      }

      const formData = new FormData()
      formData.append('clubId', clubId)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('bannerUrl', bannerUrl)
      formData.append('venue', venue)
      formData.append('eventDate', eventDate)
      formData.append('registrationDeadline', deadline)
      formData.append('maxCapacity', capacity)
      formData.append('eventType', type)

      const result = await createEvent(formData)
      if (result.error) {
        alert(result.error)
      } else {
        router.push(`/organiser/events`)
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsPending(false)
    }
  }

  if (isPreview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Event Preview</h2>
          <Button variant="outline" onClick={() => setIsPreview(false)}>Back to Edit</Button>
        </div>
        
        <Card className="max-w-3xl mx-auto overflow-hidden">
          <div className="h-64 bg-muted relative">
            {bannerPreview ? (
              <img src={bannerPreview} alt="Banner Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <CalendarIcon className="h-12 w-12 text-primary/30" />
              </div>
            )}
            <Badge className="absolute top-4 right-4">{type === 'formal' ? 'Formal Event' : 'Announcement'}</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{title || 'Your Event Title'}</CardTitle>
            <CardDescription className="flex flex-wrap gap-4 mt-2">
              <span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4" /> {eventDate ? new Date(eventDate).toLocaleString() : 'Date TBA'}</span>
              <span className="flex items-center gap-1">📍 {venue || 'Venue TBA'}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="whitespace-pre-wrap text-muted-foreground">{description || 'Your description will appear here...'}</p>
            {capacity && <Badge variant="secondary">Capacity: {capacity}</Badge>}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Tell the students what’s happening.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="club">Managing Club</Label>
              <Select value={clubId} onValueChange={(v) => v && setClubId(v)}>
                <SelectTrigger id="club">
                  <SelectValue placeholder="Select club" />
                </SelectTrigger>
                <SelectContent>
                  {clubs.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <Select value={type} onValueChange={(v) => v && setType(v)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal Event</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input id="title" required placeholder="Ex: AI Workshop 2024" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea id="description" required placeholder="What should students expect?" className="min-h-[150px]" value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input id="date" type="datetime-local" required value={eventDate} onChange={e => setEventDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input id="venue" required placeholder="Ex: TP Ganesan Auditorium" value={venue} onChange={e => setVenue(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deadline">Registration Deadline (Optional)</Label>
              <Input id="deadline" type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Max Capacity (Optional)</Label>
              <Input id="capacity" type="number" placeholder="Leave empty for unlimited" value={capacity} onChange={e => setCapacity(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Banner Image</Label>
            <div className="flex items-center gap-4">
              <Button type="button" variant="outline" className="w-full h-32 border-dashed relative" onClick={() => document.getElementById('banner-upload')?.click()}>
                 {bannerPreview ? (
                   <img src={bannerPreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                 ) : null}
                 <div className="z-10 flex flex-col items-center">
                   <ImagePlus className="h-8 w-8 mb-2 text-muted-foreground" />
                   <span className="text-xs text-muted-foreground">Click to upload banner image</span>
                 </div>
              </Button>
              <input 
                id="banner-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="secondary" 
          className="flex-1" 
          onClick={() => setIsPreview(true)}
        >
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button 
          type="submit" 
          className="flex-1" 
          disabled={isPending}
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Create Event
        </Button>
      </div>
    </form>
  )
}
