import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { Layout, Providers } from '@/components';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pizza Haven',
  description: "Welcome to Pizza Haven: Where Every Slice Tells a Story! At Pizza Haven, we believe that pizza is not just a meal; it's an experience that brings people together. Our passion for crafting the perfect pizza is matched only by our commitment to creating a warm and inviting atmosphere for our guests. Whether you're dining in with friends and family or ordering for delivery, our website is your gateway to a world of mouthwatering flavors and unforgettable moments.",
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
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
