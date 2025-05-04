import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Amplify } from 'aws-amplify';
import config from '@/amplify_outputs.json';

Amplify.configure(config, { ssr: true });


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ABU Alumni",
  description: "The Official ABU Alumni Website",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
