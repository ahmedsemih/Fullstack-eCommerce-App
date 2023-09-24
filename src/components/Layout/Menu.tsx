'use client'

import Link from 'next/link';
import { useState } from 'react';
import { motion } from "framer-motion";
import { signOut, useSession } from 'next-auth/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import { RiAccountCircleLine } from 'react-icons/ri';
import { BsFillTelephoneFill } from 'react-icons/bs';

import { useModalContext } from '@/contexts/ModalContext';
import { navLinks, phoneNumbers } from '@/utils/constants';

const Menu = () => {
    const { data: session } = useSession();
    const { setIsAuthOpen } = useModalContext();

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='relative z-50'>
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
                        {
                            session ?
                            <>
                                <motion.span
                                    className='hover:bg-lightGreen p-2' 
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: {
                                            y: 0,
                                            opacity: 1
                                        }
                                    }}
                                >
                                    <Link href='/account' className='flex items-center'>
                                        <RiAccountCircleLine className='text-3xl mr-3' />
                                        Account
                                    </Link>
                                </motion.span>
                                <motion.span
                                    className='hover:bg-lightGreen p-2' 
                                    variants={{
                                        hidden: { y: 20, opacity: 0 },
                                        visible: {
                                            y: 0,
                                            opacity: 1
                                        }
                                    }}
                                >
                                    <button onClick={() => { signOut(); setIsOpen(false)}} className='flex items-center'>
                                        <BiLogOut className='text-3xl mr-3' />
                                        Logout
                                    </button>
                                </motion.span>
                            </>
                        :
                            <motion.span
                                className='hover:bg-lightGreen p-2' 
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        opacity: 1
                                    }
                                }}
                            >
                                <button onClick={() => setIsAuthOpen(true)} className='flex items-center'>
                                    <BiLogIn className='text-3xl mr-3' />
                                    Login
                                </button>
                            </motion.span>
                        }
                    </motion.nav>
                )
            }
        </div>
    )
}

export default Menu;