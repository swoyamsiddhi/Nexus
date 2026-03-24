'use client'

import { useState } from 'react'
import { requestOrganiser } from '@/app/clubs/actions'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Info } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface OrganiserRequestModalProps {
  clubs: { id: number; name: string }[]
}

export function OrganiserRequestModal({ clubs }: OrganiserRequestModalProps) {
  const [open, setOpen] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setError(null)
    setSuccess(false)
    
    const formData = new FormData(e.currentTarget)
    const res = await requestOrganiser(formData)
    
    setIsPending(false)

    if (res?.error) {
      setError(res.error)
    } else if (res?.success) {
      setSuccess(true)
      setTimeout(() => setOpen(false), 2500)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val)
      if (!val) {
        setSuccess(false)
        setError(null)
      }
    }}>
      <DialogTrigger render={<Button variant="outline" className="w-full sm:w-auto" />}>
        Are you a club organiser? Apply here
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Organiser Application</DialogTitle>
            <DialogDescription>
              Select the club you manage. An admin will review your request within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {success ? (
              <div className="p-4 bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 rounded-md flex items-start gap-3">
                <Info className="h-5 w-5 mt-0.5" />
                <p className="text-sm font-medium">Request sent! Admin will review within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="clubId">Select Club</Label>
                  <Select name="clubId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a club" />
                    </SelectTrigger>
                    <SelectContent>
                      {clubs.map((club) => (
                        <SelectItem key={club.id} value={club.id.toString()}>
                          {club.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="reason">Your Role / Explanation</Label>
                  <Input 
                    id="reason" 
                    name="reason" 
                    placeholder="e.g. I am the technical lead for this club..." 
                    required 
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
              </>
            )}
          </div>
          <DialogFooter>
            {!success && (
              <>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Sending Request...' : 'Submit Request'}
                </Button>
              </>
            )}
            {success && (
              <Button type="button" onClick={() => setOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
