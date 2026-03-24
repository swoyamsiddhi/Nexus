'use client'

import { useTransition, useState } from 'react'
import { registerForEvent, cancelRegistration } from '../actions'
import { Button } from '@/components/ui/button'
import { Loader2, Check } from 'lucide-react'
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

interface RegistrationButtonProps {
  eventId: number
  isRegistered: boolean
  isFull: boolean
  isClosed: boolean
}

export function RegistrationButton({ eventId, isRegistered, isFull, isClosed }: RegistrationButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const handleRegister = () => {
    setError(null)
    startTransition(async () => {
      const res = await registerForEvent(eventId)
      if (res?.error) setError(res.error)
    })
  }

  const handleCancel = () => {
    setError(null)
    startTransition(async () => {
      const res = await cancelRegistration(eventId)
      if (res?.error) setError(res.error)
    })
  }

  return (
    <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto mt-6 sm:mt-0 lg:ml-auto">
      {error && <p className="text-sm text-destructive">{error}</p>}
      
      {isRegistered ? (
        <AlertDialog>
          <AlertDialogTrigger render={
            <Button variant="outline" size="lg" disabled={isPending} className="w-full sm:w-48 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 dark:bg-green-500/10 dark:text-green-500 dark:border-green-500/20" />
          }>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
            Registered ✓
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel Registration?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel your registration for this event? This action will open up your spot to another student.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep my spot</AlertDialogCancel>
              {/* using onClick handler inside Action because it acts as button */}
              <AlertDialogAction onClick={handleCancel} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Yes, cancel it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : isClosed ? (
        <Button size="lg" disabled className="w-full sm:w-48 cursor-not-allowed">
          Registration Closed
        </Button>
      ) : isFull ? (
        <Button variant="secondary" size="lg" disabled className="w-full sm:w-48">
          Event is Full
        </Button>
      ) : (
        <Button size="lg" onClick={handleRegister} disabled={isPending} className="w-full sm:w-48 text-md font-semibold h-12 shadow-lg shadow-primary/20">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Registering...
            </>
          ) : (
             'Register Now'
          )}
        </Button>
      )}
    </div>
  )
}
