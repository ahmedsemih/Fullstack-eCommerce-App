import Link from 'next/link';
import { ReactNode } from 'react';

async function fetchCategories() {
    const res = await fetch(`${process.env.BASE_URL}/api/categories`, { cache: 'force-cache' });
    
    if(!res.ok)
    return { status: res.status, statusText: res.statusText };

    let data = await res.json();
    return data.categories;
}

const Layout = async ({ children }: { children: ReactNode }) => {
    const categories = await fetchCategories();

    return (
        <div className='py-6 md:py-12 px-2 md:px-7 lg:px-16 xl:px-[128px]'>
            <div className='bg-mainRed w-full rounded-lg py-6 sm:flex-row flex-col sm:text-start text-center text-2xl sm:text-lg  md:text-2xl flex justify-around'>
                <Link href='top' className='hover:underline font-medium my-2 sm:my-0' >Top Sales</Link>
                {
                    categories?.length > 0 && (
                        categories.map((category: Category) => {
                            return (
                                <Link 
                                    key={category._id} 
                                    href={`${category.name}`}
                                    className='hover:underline font-medium capitalize my-2 sm:my-0'
                                >
                                    {category.name}
                                </Link>
                            )
                        })
                    )
                }
            </div>
            {children}
        </div>
    )
}

export default Layout