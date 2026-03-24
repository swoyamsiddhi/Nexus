'use client'

import { useState } from 'react'
import { createTeamPost } from '../actions'
import { SkillInput } from '@/components/teams/skill-input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Target } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CreateTeamPage() {
  const router = useRouter()
  const [skills, setSkills] = useState<string[]>([])

  async function clientAction(formData: FormData) {
    const res = await createTeamPost(formData)
    if (res.data) {
      router.push('/teams?tab=mine')
      router.refresh()
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Link 
        href="/teams" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to Finder
      </Link>

      <div className="space-y-8">
        <div className="space-y-2">
           <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              <h1 className="text-4xl font-black italic uppercase tracking-tighter">New Team</h1>
           </div>
           <p className="text-muted-foreground font-medium">Define your requirements and find your co-builders.</p>
        </div>

        <form action={clientAction} className="space-y-6">
           <Card className="rounded-[2.5rem] border-2 shadow-xl shadow-primary/5 overflow-hidden">
             <CardContent className="pt-8 space-y-6">
                <div className="space-y-2">
                   <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Hackathon Name</Label>
                   <Input 
                      name="hackathon_name" 
                      required 
                      className="h-12 rounded-2xl bg-muted/30" 
                      placeholder="Ex: Smart India Hackathon 2024" 
                   />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Event Date</Label>
                    <Input 
                       name="event_date" 
                       type="date" 
                       required 
                       className="h-12 rounded-2xl bg-muted/30" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Spots Available (1-5)</Label>
                    <Input 
                       name="spots_available" 
                       type="number" 
                       min="1" 
                       max="5" 
                       required 
                       className="h-12 rounded-2xl bg-muted/30" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                   <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Skills Needed</Label>
                   <p className="text-[10px] text-muted-foreground mb-2">What roles or techs are you looking for? (Go, Rust, Designer, etc)</p>
                   <input type="hidden" name="skills_needed" value={skills.join(',')} />
                   <SkillInput value={skills} onChange={(val) => setSkills(val.split(',').filter(s => s.length > 0))} />
                </div>

                <div className="space-y-2">
                   <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description & Team Goal</Label>
                   <Textarea 
                      name="description" 
                      required 
                      className="min-h-[140px] rounded-2xl bg-muted/30" 
                      placeholder="Ex: We are building a blockchain-based voting system. Already have 2 frontend devs, need a solid solidity dev." 
                   />
                </div>
             </CardContent>
           </Card>

           <div className="flex gap-4">
              <Link 
                href="/teams" 
                className={buttonVariants({ variant: 'outline', className: 'flex-1 h-14 rounded-3xl font-bold uppercase italic tracking-tighter' })}
              >
                 Cancel
              </Link>
              <Button type="submit" className="flex-1 h-14 rounded-3xl font-black italic uppercase tracking-widest shadow-lg shadow-primary/20">
                 Find Teammates
              </Button>
           </div>
        </form>
      </div>
    </div>
  )
}
