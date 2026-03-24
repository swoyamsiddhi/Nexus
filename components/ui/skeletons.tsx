import { Skeleton } from '@/components/ui/skeleton'

export function EventCardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-muted overflow-hidden bg-background">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-7 rounded-lg" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-10 w-full rounded-2xl mt-2" />
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-muted overflow-hidden bg-background p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-28 rounded-lg" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-6 w-16 rounded-lg" />
        <Skeleton className="h-6 w-20 rounded-lg" />
        <Skeleton className="h-6 w-14 rounded-lg" />
      </div>
    </div>
  )
}

export function TeamCardSkeleton() {
  return (
    <div className="rounded-3xl border-2 border-muted overflow-hidden bg-background p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/5" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-10 w-full rounded-2xl" />
    </div>
  )
}

export function NotificationSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl">
      <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-2xl" />)}
      </div>
    </div>
  )
}
