'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { getDashboardFeed } from '@/app/dashboard/actions'
import { FeedItem } from './types'
import { EventFeedCard, AnnouncementFeedCard, SuggestClubCard } from './feed-cards'
import { Loader2, Compass } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export function DashboardFeed({ initialItems, hasFollowsInitial }: { initialItems: FeedItem[], hasFollowsInitial: boolean }) {
  const [items, setItems] = useState<FeedItem[]>(initialItems)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [hasFollows] = useState(hasFollowsInitial)

  const observer = useRef<IntersectionObserver | null>(null)
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  useEffect(() => {
    if (page === 1) return
    
    const loadMore = async () => {
      setLoading(true)
      const result = await getDashboardFeed(page)
      if (result.items) {
        if (result.items.length < 10) setHasMore(false)
        setItems(prev => [...prev, ...result.items])
      }
      setLoading(false)
    }
    
    loadMore()
  }, [page])

  if (!hasFollows && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
           <Compass className="h-12 w-12 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-black italic">Your feed is waiting...</h2>
          <p className="text-muted-foreground mt-2 max-w-sm">
            Follow your favorite clubs to see upcoming events, workshops, and announcements.
          </p>
        </div>
        <Link 
          href="/clubs"
          className={buttonVariants({ variant: 'default', size: 'lg', className: 'rounded-full px-8' })}
        >
          Discover Clubs
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={`${item.type}-${item.data.id}-${index}`}>
          {item.type === 'event' && <EventFeedCard event={item.data} />}
          {item.type === 'announcement' && <AnnouncementFeedCard announcement={item.data} />}
          {item.type === 'suggestion' && (
            <div className="py-4 space-y-4">
               <h3 className="text-sm font-bold text-muted-foreground">Clubs you might like</h3>
               <SuggestClubCard club={item.data} />
            </div>
          )}
        </div>
      ))}

      {hasMore && (
        <div ref={lastElementRef} className="flex justify-center py-8">
           {loading && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">
          You&apos;ve caught up with everything! ✨
        </p>
      )}
    </div>
  )
}
