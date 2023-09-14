'use client'

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { heroBanners } from '@/utils/constants';

const HeroSection = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev === 2 ? prev = 0 : prev += 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='w-full grid md:grid-cols-2 grid-cols-1 h-[calc(100vh-146px)] bg-mainGreen'>
      <div className='w-full hidden md:flex flex-col justify-center px-4 md:px-8 py-4'>
        <h3 className='text-4xl md:text-6xl xl:text-8xl mb-8 font-bold'>
          {heroBanners[index].slogan}
        </h3>
        <p className='text-2xl md:text-3xl xl:text-5xl font-light'>
          {heroBanners[index].info}
        </p>
      </div>
      <div className='w-full h-full relative overflow-hidden greenFilter -z-0'>
        <Image 
          className='w-full h-full z-0' 
          src={heroBanners[index].image} 
          alt='pizza-image' 
          width={1000} 
          height={1000} 
        />
        <div className='w-full absolute bottom-10 flex md:hidden flex-col justify-center px-4 md:px-8 py-4'>
          <h3 className='text-4xl mb-8 font-bold'>
            {heroBanners[index].slogan}
          </h3>
          <p className='text-2xl font-light'>
            {heroBanners[index].info}
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;