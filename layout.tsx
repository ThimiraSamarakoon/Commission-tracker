import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Commission Tracker - Real-time Affiliate Earnings',
  description: 'Track affiliate commissions in real-time. Know exactly what you\'re earning from each product.',
  icons: {
    icon: '💰',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
