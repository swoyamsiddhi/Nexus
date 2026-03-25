import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    default: 'SRM Connect',
    template: '%s | SRM Connect',
  },
  description:
    'The campus platform for SRM University students — events, clubs, teams, and more.',
  keywords: ['SRM', 'SRM University', 'campus', 'events', 'clubs', 'student'],
  authors: [{ name: 'SRM Connect' }],
  openGraph: {
    title: 'SRM Connect',
    description: 'The campus platform for SRM University students.',
    type: 'website',
  },
}

import { Navbar } from '@/components/layout/Navbar'
import { createClient } from '@/lib/supabase/server'
import { ThemeProvider } from '@/components/ThemeProvider'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar userId={user?.id} />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
