
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Providers } from './providers'
import { AmplifyProvider } from './components/AmplifyProvider'

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
      <body className={inter.className}>
        <Providers>
          <AmplifyProvider>
            {children}
          </AmplifyProvider>
        </Providers>
      </body>
    </html>
  )
}
