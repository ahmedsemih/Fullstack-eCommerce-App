import { adminLinks } from '@/utils/constants';
import Link from 'next/link';
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='py-6 md:py-12 px-2 md:px-7 lg:px-16 xl:px-[128px] bg-lightGreen'>
            <div className='bg-mainGreen w-full rounded-lg py-6 sm:flex-row flex-col sm:text-start text-center text-2xl sm:text-lg  md:text-2xl flex justify-around'>
                {
                    adminLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={`${link.link}`}
                            className='hover:underline font-medium capitalize my-2 sm:my-0'
                        >
                            {link.name}
                        </Link>
                    ))
                }
            </div>
            {children}
        </div>
    )
}

export default Layout;