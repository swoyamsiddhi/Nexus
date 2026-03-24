import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CreatePostForm } from '@/components/going-out/create-post-form'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function CreatePostPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Link 
        href="/going-out" 
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
        Back to Feed
      </Link>

      <div className="space-y-8">
        <div>
           <h1 className="text-4xl font-black italic uppercase tracking-tighter">Your Plans</h1>
           <p className="text-muted-foreground font-medium">Coordinate with fellow SRMites.</p>
        </div>

        <CreatePostForm />
      </div>
    </div>
  )
}
