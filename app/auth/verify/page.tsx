import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MailCheck } from 'lucide-react'
import Link from 'next/link'

export default function VerifyPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <MailCheck className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight">Check your email</CardTitle>
        <CardDescription>
          We sent you a verification link to your SRM student email address.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-center">
        <p className="text-sm text-muted-foreground text-balance">
          Please click the link in the email to verify your account. If you don&apos;t see it, check your spam folder.
        </p>
        <div className="mt-4">
          <Link href="/auth/login" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            Return to login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
