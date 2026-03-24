import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  cta?: { label: string; href: string }
}

export function EmptyState({ icon, title, subtitle, cta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-8 text-center rounded-[3rem] border-2 border-dashed border-muted bg-muted/5">
      <div className="text-6xl mb-6 opacity-30 select-none">{icon}</div>
      <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground font-medium max-w-xs leading-relaxed">{subtitle}</p>
      {cta && (
        <Link
          href={cta.href}
          className={buttonVariants({ className: 'mt-6 rounded-full h-11 px-8 font-black uppercase italic tracking-tighter text-sm' })}
        >
          {cta.label}
        </Link>
      )}
    </div>
  )
}

// Pre-built variants for each section
export function EventsEmptyState() {
  return (
    <EmptyState
      icon="📅"
      title="No Events Yet"
      subtitle="No events found. Check back soon or follow more clubs to see their events here."
      cta={{ label: 'Browse Clubs', href: '/clubs' }}
    />
  )
}

export function TeamsEmptyState() {
  return (
    <EmptyState
      icon="🎯"
      title="No Open Teams"
      subtitle="No teams are looking for members right now. Be the first to post a hackathon team."
      cta={{ label: 'Post a Team', href: '/teams/create' }}
    />
  )
}

export function ProjectsEmptyState() {
  return (
    <EmptyState
      icon="🚀"
      title="No Projects Posted"
      subtitle="No projects yet. Share what you're working on and find co-builders or mentors."
      cta={{ label: 'Post a Project', href: '/projects/create' }}
    />
  )
}

export function GoingOutEmptyState() {
  return (
    <EmptyState
      icon="🗺️"
      title="No Plans Yet"
      subtitle="Nobody's heading out right now. Be the first to post and find campus buddies."
      cta={{ label: 'Post a Plan', href: '/going-out/create' }}
    />
  )
}

export function NotificationsEmptyState() {
  return (
    <EmptyState
      icon="🔔"
      title="All Caught Up"
      subtitle="You have no new notifications. Stay active in clubs and events to get updates."
    />
  )
}
