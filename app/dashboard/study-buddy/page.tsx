import { UserPlus, BookOpen, Clock, Zap, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const MATCHES = [
  { name: 'Sarah J.', major: 'Computer Science', match: '98%', courses: ['CS201 - Data Structures', 'MA102 - Calculus II'], style: 'Quiet Library', time: 'Evenings', initials: 'SJ' },
  { name: 'Rahul M.', major: 'Data Science', match: '85%', courses: ['CS201 - Data Structures'], style: 'Collaborative Groups', time: 'Weekends', initials: 'RM' },
  { name: 'Priya K.', major: 'Software Eng', match: '79%', courses: ['SE301 - Architecture'], style: 'Cafe / Ambience', time: 'Mornings', initials: 'PK' },
]

export default function StudyBuddyPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6">
      <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-foreground">Study Buddy Finder</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
          Stop studying alone. We automatically match you with peers in your courses who share your study habits and availability.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <div className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-sm cursor-pointer shadow-md">Best Matches</div>
        <div className="px-5 py-2.5 rounded-full bg-card border font-bold text-sm cursor-pointer hover:bg-muted transition-colors">By Course</div>
        <div className="px-5 py-2.5 rounded-full bg-card border font-bold text-sm cursor-pointer hover:bg-muted transition-colors">By Availability</div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MATCHES.map((match, i) => (
          <div key={i} className="bg-card border rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
            {/* Top Pattern */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/10 to-secondary/10 z-0"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-black shadow-md">
                  {match.initials}
                </div>
                <div className="bg-secondary text-secondary-foreground font-black text-xs px-3 py-1 rounded-full shadow-sm">
                  {match.match} Match
                </div>
              </div>

              <h3 className="text-xl font-bold mb-1">{match.name}</h3>
              <p className="text-sm text-muted-foreground font-medium mb-4">{match.major}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="text-foreground/80 leading-snug">
                    {match.courses.join(', ')}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{match.style}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{match.time} Focus</span>
                </div>
              </div>

              <Button className="w-full font-bold h-12 rounded-xl group-hover:scale-[1.02] transition-transform">
                <UserPlus className="mr-2 h-4 w-4" /> Connect
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
