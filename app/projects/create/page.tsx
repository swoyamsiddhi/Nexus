'use client'

import { useState } from 'react'
import { createProject } from '../actions'
import { TechStackInput } from '@/components/projects/tech-stack-input'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function CreateProjectPage() {
  const router = useRouter()
  const [techStack, setTechStack] = useState<string[]>([])

  async function clientAction(formData: FormData) {
    const res = await createProject(formData)
    if (res.data) {
      router.push('/projects')
      router.refresh()
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Link 
        href="/projects" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to Collaboration
      </Link>

      <div className="space-y-8">
        <div className="space-y-2">
           <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">Create Project</h1>
           </div>
           <p className="text-muted-foreground font-medium">Looking for co-builders, a mentor, or just some feedback?</p>
        </div>

        <form action={clientAction} className="space-y-6">
           <Card className="rounded-[2.5rem] border-2 shadow-xl shadow-primary/5 overflow-hidden">
             <CardContent className="pt-8 space-y-8">
                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Project Title</Label>
                   <Input 
                      name="title" 
                      required 
                      className="h-12 rounded-2xl bg-muted/30 border-none text-lg font-bold" 
                      placeholder="Ex: MediVault AI - HIPAA Compliant Health Locker" 
                   />
                </div>

                <div className="space-y-4">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">I am looking for...</Label>
                   <RadioGroup name="looking_for" defaultValue="co-builder" className="grid grid-cols-1 gap-3">
                      <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer hover:bg-primary/5 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                         <RadioGroupItem value="co-builder" id="co-builder" />
                         <Label htmlFor="co-builder" className="flex-1 cursor-pointer font-bold uppercase italic tracking-tight">Co-builder / Partner</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer hover:bg-primary/5 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                         <RadioGroupItem value="mentor" id="mentor" />
                         <Label htmlFor="mentor" className="flex-1 cursor-pointer font-bold uppercase italic tracking-tight">Mentor / Guide</Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 rounded-2xl border-2 cursor-pointer hover:bg-primary/5 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                         <RadioGroupItem value="feedback" id="feedback" />
                         <Label htmlFor="feedback" className="flex-1 cursor-pointer font-bold uppercase italic tracking-tight">Feedback Only</Label>
                      </div>
                   </RadioGroup>
                </div>

                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Tech Stack</Label>
                   <input type="hidden" name="tech_stack" value={techStack.join(',')} />
                   <TechStackInput value={techStack} onChange={(val) => setTechStack(val.split(',').filter(s => s.length > 0))} />
                </div>

                <div className="space-y-2">
                   <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Project description & stage</Label>
                   <Textarea 
                      name="description" 
                      required 
                      className="min-h-[160px] rounded-2xl bg-muted/30 border-none leading-relaxed" 
                      placeholder="What are you building? What is the current status? Be as descriptive as possible to attract the right people." 
                   />
                </div>
             </CardContent>
           </Card>

           <div className="flex gap-4">
              <Link 
                href="/projects" 
                className={buttonVariants({ variant: 'outline', className: 'flex-1 h-14 rounded-3xl font-black italic uppercase tracking-tighter' })}
              >
                 Discard
              </Link>
              <Button type="submit" className="flex-1 h-14 rounded-3xl font-black italic uppercase tracking-widest shadow-lg shadow-primary/20">
                 Launch Project
              </Button>
           </div>
        </form>
      </div>
    </div>
  )
}
