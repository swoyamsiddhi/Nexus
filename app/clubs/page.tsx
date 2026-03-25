import { createClient } from '@/lib/supabase/server'
import { ClubCard } from '@/components/clubs/club-card'
import { OrganiserRequestModal } from '@/components/clubs/organiser-request-modal'
import { Input } from '@/components/ui/input'
import { buttonVariants } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const CATEGORIES = ['Technical', 'Cultural', 'Sports', 'Social', 'Arts']

export default async function ClubsDirectoryPage({
  searchParams,
}: {
  searchParams: { search?: string, category?: string }
}) {
  const supabase = createClient()
  const search = searchParams.search || ''
  const category = searchParams.category || ''

  // 1. Fetch Clubs for Grid
  let query = supabase
    .from('clubs')
    .select(`
      *,
      follows:follows(count),
      events:events(count)
    `)
    .order('name', { ascending: true })

  if (category) {
    query = query.eq('category', category)
  }
  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data: clubs } = await query

  // 2. Fetch all raw clubs (Just ID and Name) for the Modal Dropdown
  const { data: allLightClubs } = await supabase.from('clubs').select('id, name').order('name', { ascending: true })

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Club Directory</h1>
          <p className="text-muted-foreground mt-1 text-lg">Discover and follow student-run organizations at SRM.</p>
        </div>
        <OrganiserRequestModal clubs={allLightClubs || []} />
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-y py-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <Link 
            href={`/clubs${search ? `?search=${search}` : ''}`}
            className={buttonVariants({ 
              variant: category === '' ? 'default' : 'outline', 
              size: 'sm',
              className: category === '' ? '' : 'text-muted-foreground'
            })}
          >
            All
          </Link>
          {CATEGORIES.map(cat => (
            <Link 
              key={cat} 
              href={`/clubs?category=${cat}${search ? `&search=${search}` : ''}`}
              className={buttonVariants({ 
                variant: category === cat ? 'default' : 'outline', 
                size: 'sm',
                className: category === cat ? '' : 'text-muted-foreground'
              })}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <form className="w-full lg:w-auto flex items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input 
            name="search" 
            placeholder="Search clubs..." 
            defaultValue={search}
            className="w-full lg:w-72 pl-9" 
          />
          {category && <input type="hidden" name="category" value={category} />}
        </form>
      </div>

      {/* Grid */}
      {(!clubs || clubs.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-xl font-medium">No clubs found.</p>
          <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {clubs.map((club: any) => (
            <ClubCard 
              key={club.id}
              id={club.id}
              name={club.name}
              category={club.category}
              description={club.description}
              followerCount={club.follows?.[0]?.count || 0}
              eventCount={club.events?.[0]?.count || 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}
