import { AlertTriangle } from 'lucide-react'

export function ConflictDetector() {
  return (
    <div className="mb-6 bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-xl flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
      <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
      <div>
        <h4 className="font-bold text-sm text-destructive">Smart Conflict Detected</h4>
        <p className="text-xs text-destructive/80 mt-1 leading-relaxed">
          Your registered event <strong>"HackSRM 2026 Orientation"</strong> overlaps with your upcoming class <strong>"Data Structures & Algorithms (CS201)"</strong> tomorrow at 10:00 AM.
        </p>
      </div>
    </div>
  )
}
