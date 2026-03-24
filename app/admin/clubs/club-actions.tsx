'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteClub } from '../actions'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function ClubActions({ clubId }: { clubId: number }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)
    const res = await deleteClub(clubId)
    if (res?.error) setError(res.error)
    setIsDeleting(false)
  }

  return (
    <div className="flex items-center justify-end">
      {error && <span className="text-xs text-destructive mr-2">{error}</span>}
      <AlertDialog>
        <AlertDialogTrigger render={
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={isDeleting}
            className="text-destructive hover:bg-destructive/10"
          />
        }>
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this club?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the club and all its associated events, posts, and announcements.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isDeleting ? 'Deleting...' : 'Yes, delete club'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
