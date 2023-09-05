'use client'

import Link from 'next/link';
import { useState } from 'react';
import { motion } from "framer-motion";
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsFillTelephoneFill } from 'react-icons/bs';

import { navLinks, phoneNumbers } from '@/utils/constants';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative'>
            <button 
                className='text-5xl' 
                onClick={() => setIsOpen(prev => !prev)} 
            >
                    <RxHamburgerMenu />
            </button>
            {
                isOpen && (
                    <motion.nav 
                        variants={{
                            hidden: { opacity: 1, scale: 0 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                    delayChildren: 0.3,
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        animate="visible"
                        className='absolute right-0 flex flex-col w-52 rounded-md bg-white border-2 border-black  font-semibold text-xl p-2' 
                    >
                        <div className="bg-mainGreen p-2 rounded-md flex gap-2 items-center px-4 text-xl text-white">
                            <BsFillTelephoneFill />  {phoneNumbers.order}
                        </div>
                        {navLinks.map((nav, index) => (
                            <motion.span
                                className='hover:bg-lightGreen p-2' 
                                key={index} 
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        opacity: 1
                                    }
                                }}
                            >
                                <Link href={nav.link} className='flex items-center'>
                                    <nav.Icon className='text-3xl mr-3' />
                                    {nav.name}
                                </Link>
                            </motion.span>
                        ))}
                    </motion.nav>
                )
            }
        </div>
    )
}

export default Menu;