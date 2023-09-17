'use client'

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import { CartProvider } from '@/contexts/CartContext';
import { ModalProvider } from '@/contexts/ModalContext';

const Providers = ({children}: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <CartProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </CartProvider>
    </SessionProvider>
  )
}

export default Providers;