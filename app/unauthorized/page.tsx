import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ShieldX } from 'lucide-react'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8 text-center">
      <div className="space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
            <ShieldX className="h-12 w-12 text-red-400" strokeWidth={1.5} />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-black uppercase tracking-widest text-red-400">Access Denied</p>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Unauthorised</h1>
          <p className="text-muted-foreground font-medium">
            You don&apos;t have permission to view this page. If you think this is a mistake, contact your club organiser or admin.
          </p>
        </div>
        <Link 
          href="/dashboard"
          className={buttonVariants({ className: 'rounded-full h-12 px-8 font-black uppercase italic tracking-tighter' })}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
