import { ClerkProvider, SignedIn } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'
import { dark } from '@clerk/themes'
const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Welcome to Aurum Bank',
  description: 'Created by Maciej Kalata',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
      elements: {
        formButtonPrimary: 'bg-yellow-600 hover:bg-amber-600 text-sm normal-case text-amber-300',
        footerActionLink: 'text-yellow-600',
        formFieldInput: 'text-white',
        otpCodeFieldInputs: 'text-zinc-900'
      },
      
    }}>
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
