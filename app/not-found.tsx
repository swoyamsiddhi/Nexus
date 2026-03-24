import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8 text-center">
      <div className="space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <Frown className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">404 — Page Not Found</p>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Lost on Campus?</h1>
          <p className="text-muted-foreground font-medium">
            This page doesn&apos;t exist in the SRM Connect universe. Let&apos;s get you back on track.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/dashboard"
            className={buttonVariants({ className: 'rounded-full h-12 px-8 font-black uppercase italic tracking-tighter' })}
          >
            Back to Home
          </Link>
          <Link 
            href="/events"
            className={buttonVariants({ variant: 'outline', className: 'rounded-full h-12 px-8 font-black uppercase italic tracking-tighter' })}
          >
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  )
}
