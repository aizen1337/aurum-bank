import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { dark } from '@clerk/themes'
import {Quicksand} from 'next/font/google'
const roboto = Quicksand({
  weight: '600',
  subsets: ['latin'],
})
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
      <body className={roboto.className}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
