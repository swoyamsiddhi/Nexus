import { ShoppingBag, Tag, Search, Car, Book, Laptop, Box } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ITEMS = [
  { title: 'Calculus Early Transcendentals 9th Ed', price: '₹1200', category: 'Textbooks', condition: 'Like New', seller: 'Arjun P.', icon: Book },
  { title: 'Scientific Calculator fx-991EX', price: '₹650', category: 'Tech', condition: 'Good', seller: 'Riya S.', icon: Laptop },
  { title: 'Carpool to Chengalpattu Station (Friday)', price: '₹100', category: 'Ride-share', condition: '3 Seats Left', seller: 'Karthik N.', icon: Car },
  { title: 'Found: Black Umbrella near UB', price: 'Free', category: 'Lost & Found', condition: 'Claim with ID', seller: 'Campus Security', icon: Box },
]

export default function MarketplacePage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2 text-foreground">Campus Marketplace</h1>
          <p className="text-muted-foreground font-medium">Buy, sell, and trade securely with verified SRM students.</p>
        </div>
        <Button className="font-bold h-12 px-8 rounded-full shadow-md bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-all duration-300">
          <Tag className="mr-2 h-4 w-4" /> Post an Item
        </Button>
      </div>

      {/* Search and Categories */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search textbooks, electronics, ride-shares..." 
            className="w-full h-14 pl-12 pr-4 rounded-2xl border bg-card focus:ring-2 focus:ring-primary outline-none transition-shadow text-sm font-medium"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {['All Items', 'Textbooks', 'Tech/Electronics', 'Ride-sharing', 'Lost & Found'].map((cat, i) => (
            <div key={i} className={`whitespace-nowrap px-6 py-4 rounded-2xl font-bold text-sm cursor-pointer transition-colors border ${i === 0 ? 'bg-primary text-primary-foreground shadow-md' : 'bg-card hover:bg-muted'}`}>
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ITEMS.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="bg-card border rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group">
              <div className="h-40 bg-muted/30 rounded-2xl mb-4 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                <Icon className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </div>
              
              <div className="flex justify-between items-start mb-2 gap-3">
                <h3 className="font-bold text-foreground leading-tight">{item.title}</h3>
                <span className="font-black text-primary text-lg">{item.price}</span>
              </div>
              
              <div className="mt-auto pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground bg-muted/40 px-2 py-1 rounded-md">{item.category}</span>
                  <span className="text-muted-foreground">{item.condition}</span>
                </div>
                <div className="text-xs text-muted-foreground font-medium pt-2 border-t">
                  Seller: <span className="text-foreground">{item.seller}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
