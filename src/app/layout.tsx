import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter } from 'next/font/google'
import { dark } from '@clerk/themes'
const inter = Inter({ subsets: ['latin'] })

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
      baseTheme: dark
    }}>
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  )
}
