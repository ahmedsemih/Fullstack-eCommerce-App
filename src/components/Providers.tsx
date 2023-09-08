'use client'

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import { ModalProvider } from '@/contexts/ModalContext';

const Providers = ({children}: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </SessionProvider>
  )
}

export default Providers;