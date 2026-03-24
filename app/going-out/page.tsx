import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getGoingOutPosts } from './actions'
import { GoingOutPostCard } from '@/components/going-out/post-card'
import { buttonVariants } from '@/components/ui/button'
import { Plus, Info } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GoingOutPost } from '@/components/going-out/types'

export default async function GoingOutPage({ searchParams }: { searchParams: { filter?: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const filter = searchParams.filter || 'all'
  const postsResponse = await getGoingOutPosts(filter)
  const posts = postsResponse as unknown as GoingOutPost[]

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
           <h1 className="text-4xl font-black italic uppercase tracking-tighter">Going Out</h1>
           <p className="text-muted-foreground max-w-md font-medium">
             Going somewhere? Find SRM students attending the same event, concert, or hackathon.
           </p>
        </div>
        <Link 
          href="/going-out/create"
          className={buttonVariants({ className: 'rounded-full h-12 px-6' })}
        >
          <Plus className="mr-2 h-5 w-5" />
          Post Your Plans
        </Link>
      </div>

      <Tabs defaultValue={filter} className="mb-8">
        <TabsList className="bg-muted/50 p-1">
          <Link href="/going-out?filter=all"><TabsTrigger value="all">All Posts</TabsTrigger></Link>
          <Link href="/going-out?filter=buddies"><TabsTrigger value="buddies">Buddies</TabsTrigger></Link>
          <Link href="/going-out?filter=teammates"><TabsTrigger value="teammates">Teammates</TabsTrigger></Link>
          <Link href="/going-out?filter=both"><TabsTrigger value="both">Both</TabsTrigger></Link>
        </TabsList>
      </Tabs>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <GoingOutPostCard key={post.id} post={post} currentUserId={user.id} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
           <Info className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
           <h3 className="text-xl font-bold">No posts found</h3>
           <p className="text-muted-foreground mt-2">Be the first to post your plans!</p>
        </div>
      )}
    </div>
  )
}
