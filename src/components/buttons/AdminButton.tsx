'use client'

import React, { ReactNode, useState } from 'react';

import AddAdminModal from '../modals/AdminModal';

type Props = {
    children: ReactNode;
    userId: string | null;
}

const AdminButton = ({ children, userId }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button 
                className={`
                    text-3xl hover:opacity-70 transition-all duration-200 
                    ${userId ? 'text-mainGreen' : 'text-white'}
                `} 
                onClick={() => setIsModalOpen(true)}
            >
                {children}
            </button>
            {
                isModalOpen && (
                    <AddAdminModal 
                        setIsOpen={setIsModalOpen} 
                        userId={userId}
                    />
                )
            }
        </>
  )
}

export default AdminButton;