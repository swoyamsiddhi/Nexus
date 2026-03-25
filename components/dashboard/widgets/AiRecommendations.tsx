import { Sparkles, ArrowRight, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AiRecommendations() {
  return (
    <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/10 border rounded-2xl p-6 shadow-sm relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 p-4 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
        <Sparkles className="h-40 w-40 text-primary" />
      </div>
      
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="bg-primary p-2 rounded-lg shadow-sm">
           <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">AI Recommendations</h3>
      </div>
      
      <p className="text-xs text-muted-foreground mb-5 relative z-10 font-medium">
        Curated for you based on your <strong>Computer Science</strong> major and interest in <strong>AI/ML</strong>.
      </p>
      
      <div className="space-y-3 relative z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border shadow-sm cursor-pointer hover:border-primary hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex justify-between items-start mb-1">
             <div className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded flex items-center gap-1">
               <TrendingUp className="h-3 w-3" /> 98% Match
             </div>
          </div>
          <div className="font-bold text-sm mt-2">AI/ML Applied Workshop by Google DSC</div>
          <div className="text-xs text-muted-foreground mt-2 font-medium">Tomorrow • UB Seminar Hall</div>
        </div>
        
        <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border shadow-sm cursor-pointer hover:border-secondary hover:shadow-md transition-all hover:-translate-y-0.5">
          <div className="flex justify-between items-start mb-1">
             <div className="text-[10px] font-black uppercase tracking-wider text-secondary-foreground bg-secondary px-2 py-0.5 rounded flex items-center gap-1">
               <TrendingUp className="h-3 w-3" /> 92% Match
             </div>
          </div>
          <div className="font-bold text-sm mt-2">Full-Stack Web Dev Bootcamp</div>
          <div className="text-xs text-muted-foreground mt-2 font-medium">Friday • Tech Park 401</div>
        </div>
      </div>
      
      <Button variant="ghost" className="w-full mt-4 text-xs font-bold group/btn relative z-10">
        View all AI suggestions <ArrowRight className="ml-2 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </div>
  )
}
