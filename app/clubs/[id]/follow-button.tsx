'use client'

import { useOptimistic, useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import { toggleFollow } from '../actions'

interface FollowButtonProps {
  clubId: number
  initialIsFollowing: boolean
  initialFollowerCount: number
}

export function FollowButton({ clubId, initialIsFollowing, initialFollowerCount }: FollowButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // useOptimistic state holds the current visual state
  const [optimisticState, addOptimisticState] = useOptimistic(
    { isFollowing: initialIsFollowing, followerCount: initialFollowerCount },
    (state, action: { type: 'TOGGLE' }) => {
      return {
        isFollowing: !state.isFollowing,
        followerCount: state.isFollowing ? state.followerCount - 1 : state.followerCount + 1
      }
    }
  )

  const handleToggle = async () => {
    setError(null)
    startTransition(async () => {
      // Optimistically update the UI
      addOptimisticState({ type: 'TOGGLE' })
      
      // Perform server action
      const res = await toggleFollow(clubId)
      if (res?.error) {
        setError(res.error)
      }
      // If success, server action will revalidatePath, pushing true state down
    })
  }

  return (
    <div className="flex flex-col items-center sm:items-end gap-1">
      <Button 
        variant={optimisticState.isFollowing ? "outline" : "default"}
        onClick={handleToggle}
        disabled={isPending}
        className="w-32"
      >
        {optimisticState.isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
      {error && <span className="text-xs text-destructive">{error}</span>}
      <span className="text-sm text-muted-foreground mr-1">
        {optimisticState.followerCount} {optimisticState.followerCount === 1 ? 'follower' : 'followers'}
      </span>
    </div>
  )
}
