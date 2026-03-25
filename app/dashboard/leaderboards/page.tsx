import { Trophy, Medal, Star, ArrowUp, ArrowDown } from 'lucide-react'

const LEADERBOARD = [
  { rank: 1, club: 'SRM Hackathon Society', points: 14500, trend: 'up', activeMembers: 120, tier: 'Diamond' },
  { rank: 2, club: 'Cultural Dance Troupe', points: 12200, trend: 'up', activeMembers: 85, tier: 'Platinum' },
  { rank: 3, club: 'Google DSC SRM', points: 11800, trend: 'down', activeMembers: 200, tier: 'Platinum' },
  { rank: 4, club: 'Rotaract Club', points: 9500, trend: 'up', activeMembers: 350, tier: 'Gold' },
  { rank: 5, club: 'RoboVITics', points: 8200, trend: 'same', activeMembers: 40, tier: 'Gold' },
]

export default function LeaderboardsPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 px-4 sm:px-6">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="bg-secondary/20 p-4 rounded-full mb-6">
          <Trophy className="h-10 w-10 text-secondary" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-foreground">Club Leaderboards</h1>
        <p className="text-muted-foreground text-lg max-w-2xl font-medium">
          Gamifying campus involvement. Earn points for your club through event organization, volunteer hours, and attendance.
        </p>
      </div>

      {/* Podium Top 3 */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mb-16 px-4">
        
        {/* Rank 2 */}
        <div className="order-2 md:order-1 flex flex-col justify-end w-full md:w-1/3">
          <div className="text-center mb-4">
            <div className="font-bold text-lg mb-1">{LEADERBOARD[1].club}</div>
            <div className="text-muted-foreground font-black text-sm">{LEADERBOARD[1].points} pts</div>
          </div>
          <div className="bg-gradient-to-t from-muted/50 to-muted/20 h-32 rounded-t-3xl border-t-4 border-[#C0C0C0] relative flex justify-center pt-4">
            <Medal className="h-8 w-8 text-[#C0C0C0]" />
            <div className="absolute -top-4 font-black text-4xl text-[#C0C0C0]/50">2</div>
          </div>
        </div>

        {/* Rank 1 */}
        <div className="order-1 md:order-2 flex flex-col justify-end w-full md:w-1/3 mt-8 md:mt-0">
          <div className="text-center mb-4">
            <div className="font-bold text-xl mb-1 text-primary">{LEADERBOARD[0].club}</div>
            <div className="text-secondary font-black text-lg">{LEADERBOARD[0].points} pts</div>
          </div>
          <div className="bg-gradient-to-t from-secondary/30 to-secondary/10 h-44 rounded-t-3xl border-t-4 border-secondary relative flex justify-center pt-4 shadow-[0_-10px_30px_rgba(252,185,19,0.15)]">
            <Trophy className="h-10 w-10 text-secondary" />
            <div className="absolute -top-6 font-black text-6xl text-secondary/30">1</div>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="order-3 flex flex-col justify-end w-full md:w-1/3">
          <div className="text-center mb-4">
            <div className="font-bold text-lg mb-1">{LEADERBOARD[2].club}</div>
            <div className="text-muted-foreground font-black text-sm">{LEADERBOARD[2].points} pts</div>
          </div>
          <div className="bg-gradient-to-t from-muted/50 to-muted/20 h-24 rounded-t-3xl border-t-4 border-[#CD7F32] relative flex justify-center pt-4">
            <Medal className="h-8 w-8 text-[#CD7F32]" />
            <div className="absolute -top-4 font-black text-4xl text-[#CD7F32]/50">3</div>
          </div>
        </div>

      </div>

      {/* Table Rankings */}
      <div className="bg-card border rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-6 border-b bg-muted/20 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Club Name</div>
          <div className="col-span-2 text-center">Tier</div>
          <div className="col-span-2 text-center">Members</div>
          <div className="col-span-2 text-right">Points</div>
        </div>
        
        <div className="divide-y">
          {LEADERBOARD.map((club, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-muted/10 transition-colors">
              <div className="col-span-1 text-center font-black text-xl text-muted-foreground">
                {club.rank}
              </div>
              <div className="col-span-5 font-bold flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${club.trend === 'up' ? 'bg-green-500' : club.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                {club.club}
              </div>
              <div className="col-span-2 text-center">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{club.tier}</span>
              </div>
              <div className="col-span-2 text-center text-sm font-medium text-muted-foreground">
                {club.activeMembers}
              </div>
              <div className="col-span-2 text-right font-black text-foreground">
                {club.points.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
