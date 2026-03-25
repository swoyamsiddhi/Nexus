import { MapPin, Clock, BookOpen } from 'lucide-react'

export function NextClassWidget() {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/10 p-2 rounded-lg text-primary">
          <BookOpen className="h-4 w-4" />
        </div>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Next Class</h3>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="text-xl font-black tracking-tight">Data Structures & Algo</div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <Clock className="h-4 w-4" /> 10:00 AM - 11:30 AM (In 45 mins)
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <MapPin className="h-4 w-4" /> Tech Park, Room 402
        </div>
      </div>
    </div>
  )
}
