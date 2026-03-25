import { Calendar, Users } from 'lucide-react'

const EVENTS = [
  { id: 1, title: 'HackSRM 2026 Orientation', date: 'Tomorrow', time: '10:00 AM', location: 'TP Auditorium', attendees: 240 },
  { id: 2, title: 'Milan Cultural Dance Trial', date: 'Thursday', time: '4:00 PM', location: 'Main Campus Stage', attendees: 56 },
]

export function UpcomingEventsWidget() {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow mt-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Upcoming Registered Events</h3>
        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">2 Events</span>
      </div>
      
      <div className="space-y-4">
        {EVENTS.map((event) => (
          <div key={event.id} className="flex gap-4 items-center group cursor-pointer p-3 hover:bg-muted/50 rounded-xl transition-colors">
            <div className="bg-primary/10 text-primary rounded-xl p-3 text-center min-w-[65px] group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider">{event.date === 'Tomorrow' ? 'Nov' : 'Nov'}</div>
              <div className="text-lg font-black leading-none mt-1">24</div>
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">{event.title}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5 font-medium">
                <Calendar className="h-3 w-3" /> {event.time} • {event.location}
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end text-xs text-muted-foreground font-medium">
               <Users className="h-3.5 w-3.5 mb-1" />
               {event.attendees}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
