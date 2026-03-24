import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getTeamPosts, getMyTeamsData } from './actions'
import { TeamPostCard } from '@/components/teams/team-card'
import { buttonVariants } from '@/components/ui/button'
import { Plus, Search, Users, Layout, Target, Calendar } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { TeamPost, TeamApplication } from '@/components/teams/types'

export default async function TeamsPage({ searchParams }: { searchParams: { skill?: string, hackathon?: string, tab?: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const currentTab = searchParams.tab || 'find'
  const skill = searchParams.skill
  const hackathon = searchParams.hackathon

  const postsResponse = await getTeamPosts(skill, hackathon)
  const posts = postsResponse as unknown as TeamPost[]
  
  const myTeamsResponse = await getMyTeamsData() as { myPosts: TeamPost[], myApplications: (TeamApplication & { team_post: TeamPost })[] }
  const { myPosts, myApplications } = myTeamsResponse

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Team Finder</h1>
           </div>
           <p className="text-muted-foreground max-w-md font-medium">
             Need a developer? Or looking to join a project? Find your perfect team matches here.
           </p>
        </div>
        <Link 
          href="/teams/create"
          className={buttonVariants({ className: 'rounded-full h-12 px-8 font-black uppercase italic tracking-tighter' })}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Team
        </Link>
      </div>

      <Tabs defaultValue={currentTab} className="space-y-8">
        <TabsList className="bg-muted/50 p-1 w-full md:w-auto h-12 rounded-2xl">
          <Link href="/teams?tab=find"><TabsTrigger value="find" className="rounded-xl h-10 px-8 data-[state=active]:bg-background">Find a Team</TabsTrigger></Link>
          <Link href="/teams?tab=mine"><TabsTrigger value="mine" className="rounded-xl h-10 px-8 data-[state=active]:bg-background">My Teams & Apps</TabsTrigger></Link>
        </TabsList>

        <TabsContent value="find" className="space-y-8 animate-in fade-in duration-300">
           <form className="flex flex-col md:flex-row gap-4">
             <div className="relative flex-1 group">
               <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
               <Input 
                 name="skill" 
                 defaultValue={skill} 
                 className="pl-10 h-10 rounded-xl" 
                 placeholder="Search by skill (eg: React, Python)" 
               />
               <input type="hidden" name="tab" value="find" />
             </div>
             <Input 
                name="hackathon" 
                defaultValue={hackathon} 
                className="md:w-64 h-10 rounded-xl" 
                placeholder="Filter by hackathon" 
             />
             <Button type="submit" className="rounded-xl h-10 font-bold px-8">Filter</Button>
           </form>

           {posts && posts.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {posts.map((post) => (
                 <TeamPostCard key={post.id} post={post} currentUserId={user.id} />
               ))}
             </div>
           ) : (
             <div className="text-center py-20 bg-muted/20 rounded-[2rem] border-2 border-dashed border-muted">
                <Users className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold italic uppercase tracking-tighter">No teams found</h3>
                <p className="text-muted-foreground mt-2 font-medium">Try broadening your search or creating a new team!</p>
             </div>
           )}
        </TabsContent>

        <TabsContent value="mine" className="space-y-12 animate-in fade-in duration-300">
           {/* Section: My Team Posts */}
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <Badge variant="outline" className="h-4 w-4 rounded-full p-0 bg-primary border-none" />
                 <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">My Posts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {myPosts?.map((post) => (
                    <TeamPostCard key={post.id} post={post} currentUserId={user.id} />
                 ))}
                 {(!myPosts || myPosts.length === 0) && (
                   <p className="text-sm text-muted-foreground italic col-span-full">You haven&apos;t posted any team requests yet.</p>
                 )}
              </div>
           </div>

           <hr className="border-muted/50" />

           {/* Section: My Applications */}
           <div className="space-y-6">
              <div className="flex items-center gap-3">
                 <Badge variant="outline" className="h-4 w-4 rounded-full p-0 bg-blue-500 border-none" />
                 <h2 className="text-2xl font-black italic uppercase tracking-tighter leading-none">My Applications</h2>
              </div>
              <div className="space-y-4">
                 {myApplications?.map((app) => (
                    <div key={app.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl border bg-muted/10 hover:bg-muted/20 transition-colors gap-4">
                       <div className="space-y-2">
                          <div className="flex items-center gap-3">
                             <h4 className="text-lg font-black italic uppercase tracking-tighter text-primary">{app.team_post.hackathon_name}</h4>
                             <Badge 
                               variant={app.status === 'accepted' ? 'default' : app.status === 'rejected' ? 'destructive' : 'secondary'}
                               className="rounded-lg font-bold italic uppercase text-[10px]"
                             >
                               {app.status}
                             </Badge>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-medium text-muted-foreground">
                             <span className="flex items-center gap-1.5"><Layout className="h-3.5 w-3.5" /> Poster: {app.team_post.poster?.full_name}</span>
                             <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {new Date(app.team_post.event_date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2 line-clamp-1 italic">
                             &ldquo;{app.message}&rdquo;
                          </p>
                       </div>
                       <Link 
                         href={`/teams/manage/${app.team_post.id}`}
                         className={buttonVariants({ variant: 'outline', size: 'sm', className: 'rounded-xl font-bold uppercase italic text-xs h-10 px-6' })}
                       >
                         View Original Post
                       </Link>
                    </div>
                 ))}
                 {(!myApplications || myApplications.length === 0) && (
                   <p className="text-sm text-muted-foreground italic">You haven&apos;t applied to any teams yet.</p>
                 )}
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Button({ children, className, type, disabled }: { children: React.ReactNode, className?: string, type?: "submit" | "button" | "reset", disabled?: boolean }) {
  return <button type={type} disabled={disabled} className={`px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold ${className}`}>{children}</button>
}
