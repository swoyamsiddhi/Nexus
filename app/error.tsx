'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-background p-8 text-center font-sans antialiased">
        <div className="space-y-6 max-w-md">
          <div className="text-6xl">⚡</div>
          <div className="space-y-2">
            <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Something went wrong</p>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">Unexpected Error</h1>
            <p className="text-muted-foreground font-medium">
              An unexpected error occurred. Our team has been notified. Please try again.
            </p>
            {error?.digest && (
              <p className="text-xs text-muted-foreground/50 font-mono">Error ID: {error.digest}</p>
            )}
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full h-12 px-8 bg-primary text-primary-foreground font-black uppercase italic tracking-tighter text-sm hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
