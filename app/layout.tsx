
import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

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
        <Script
          src="https://js.hydrogen.co/v1/inline.js"
          strategy="afterInteractive"
          id="hydrogen-script"
        />
        {children}
      </body>
    </html>
  )
}
