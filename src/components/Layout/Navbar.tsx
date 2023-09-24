'use client'
import Link from "next/link";
import Image from 'next/image';
import { ToastContainer } from "react-toastify";
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useSession } from "next-auth/react";

import Menu from './Menu';
import { AuthModal } from "@/components";
import Logo from '../../../public/logo.png';
import { phoneNumbers } from "@/utils/constants";
import { useModalContext } from "@/contexts/ModalContext";
import ProductModal from "../modals/ProductModal";
import { useCartContext } from "@/contexts/CartContext";

const Navbar = () => {
    const { cart } = useCartContext();
    const { data: session } = useSession();
    const { isAuthOpen, setIsAuthOpen, isProductOpen, setIsProductOpen } = useModalContext();

    return (
        <nav>
            <div className="bg-mainRed font-semibold text-center py-4 px-4 sm:px-8">
                Free deliver for all orders over 50$. Order your food now!
            </div>

            {/* Tablet, Laptop & Desktop Screen */}
            <div className="hidden md:flex z-50 text-lg md:text-xl lg:text-2xl border-y-[3px] border-black py-5 relative text-black font-semibold">
                <div className="flex w-full gap-4 lg:gap-8 xl:gap-20 md:justify-start lg:justify-between items-center md:px-7 lg:px-16 xl:px-[128px]">
                    <Link href='/'>Home</Link>
                    <Link href='/menu/top'>Menu</Link>
                    <Link href='/campaigns'>Campaigns</Link>
                </div>
                <div className='lg:w-[140px] h-full' />
                <Link href='/'>
                    <Image
                        className='absolute mx-auto right-0 left-0 top-[-24px] cursor-pointer'
                        src={Logo}
                        alt='logo'
                        width={140}
                        height={140}
                    />
                </Link>
                <div className="flex gap-4 lg:gap-8 xl:gap-20 w-full md:justify-end lg:justify-between items-center md:px-7 lg:px-16 xl:px-[128px]">
                    <div className="bg-mainGreen p-2 rounded-md flex gap-2 items-center xl:px-4 text-sm xl:text-xl text-white">
                        <BsFillTelephoneFill />  {phoneNumbers.order}
                    </div>
                    {
                        session?.user
                        ?
                        <Link href={session.user.isAdmin ? '/admin/orders' : '/account'} >{session.user.isAdmin ? 'Admin' : 'Account'}</Link> 
                        :
                        <button onClick={() => setIsAuthOpen(true)} >Login</button>
                    }
                    <Link href='/cart'>Cart ({cart.length ?? 0}) </Link>
                </div>
            </div>

            {/* Phone & Small Tablet Screen */}
            <div className='md:hidden flex justify-between items-center py-2 px-4 sm:px-8 w-full text-black border-y-[3px] border-black'>
                <Link href='/'>
                    <Image
                        className='cursor-pointer'
                        src={Logo}
                        alt='logo'
                        width={80}
                        height={80}
                    />
                </Link>
                <Menu />
            </div>

            <ToastContainer />
            { isAuthOpen && <AuthModal setIsOpen={setIsAuthOpen} /> }            
            { isProductOpen && <ProductModal setIsOpen={setIsProductOpen} /> }            
        </nav>
    )
}

export default Navbar;