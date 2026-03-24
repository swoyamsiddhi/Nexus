'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, X, Sparkles } from 'lucide-react'
import { expressInterest } from '@/app/projects/actions'
import { Project } from './types'

export function InterestModal({ project, onClose }: { project: Project, onClose: () => void }) {
  const [message, setMessage] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const res = await expressInterest(project.id, message)
    if (res.error) {
      setError(res.error)
      setIsPending(false)
    } else {
      setIsPending(false)
      onClose()
      window.location.reload()
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border-2 border-primary/20 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Collaborate on {project.title}</h3>
              <Button size="icon" variant="ghost" className="rounded-full" onClick={onClose}><X className="h-4 w-4" /></Button>
           </div>
           
           <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Looking For: {project.looking_for}</p>
              <p className="text-xs text-muted-foreground leading-snug">Let the poster know how you can help or why you&apos;re interest.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                 <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Your Message</Label>
                 <Textarea 
                   required
                   placeholder="Ex: I have experience with Three.js and can help you with the 3D part..."
                   className="min-h-[120px] rounded-2xl bg-muted/30 focus-visible:ring-primary/20"
                   value={message}
                   onChange={e => setMessage(e.target.value)}
                 />
              </div>

              {error && <p className="text-xs text-destructive font-bold">{error}</p>}

              <Button className="w-full rounded-2xl py-6 font-black italic uppercase tracking-tighter" disabled={isPending}>
                 {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <><Sparkles className="h-4 w-4 mr-2" /> Send Interest</>}
              </Button>
           </form>
        </div>
      </div>
    </div>
  )
}
