'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { approveOrganiserRequest, rejectOrganiserRequest } from '../actions'
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

export function RequestActions({ requestId, userId }: { requestId: number, userId: string }) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleApprove = async () => {
    setIsApproving(true)
    setError(null)
    const res = await approveOrganiserRequest(requestId, userId)
    if (res?.error) setError(res.error)
    setIsApproving(false)
  }

  const handleReject = async () => {
    setIsRejecting(true)
    setError(null)
    const res = await rejectOrganiserRequest(requestId)
    if (res?.error) setError(res.error)
    setIsRejecting(false)
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {error && <span className="text-xs text-destructive mr-2">{error}</span>}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleApprove} 
        disabled={isApproving || isRejecting}
        className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-500/10 dark:text-green-400"
      >
        <Check className="h-4 w-4 mr-1" />
        {isApproving ? 'Approving...' : 'Approve'}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger render={
          <Button 
            variant="ghost" 
            size="sm" 
            disabled={isApproving || isRejecting}
            className="text-destructive hover:bg-destructive/10"
          />
        }>
          <X className="h-4 w-4 mr-1" />
          Reject
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reject the student&apos;s request to manage the club. The request will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {isRejecting ? 'Rejecting...' : 'Yes, reject request'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
