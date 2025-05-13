
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Alumni Portal',
  description: 'Alumni Association Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.hydrogen.co/v1/inline.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
