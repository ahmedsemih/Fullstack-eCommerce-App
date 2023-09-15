'use client'

import { useEffect, useState } from 'react';

const Countdown = ({ endDate }: { endDate: Date | null | undefined}) => {
  const [days, hours, minutes, seconds] = useCountdown(endDate!);

  if(endDate)
  return (
    <div className='flex items-center justify-center text-xl sm:text-3xl'>
        <div className='flex flex-col items-center px-1'>
            <p className='font-bold'>{days}</p>
            <p className='text-sm sm:text-lg font-semibold'>days</p>
        </div>
        <span className='mx-2'>:</span>
        <div className='flex flex-col items-center px-1'>
            <p className='font-bold'>{hours}</p>
            <p className='text-sm sm:text-lg font-semibold'>hours</p>
        </div>
        <span className='mx-2'>:</span>
        <div className='flex flex-col items-center px-1'>
            <p className='font-bold'>{minutes}</p>
            <p className='text-sm sm:text-lg font-semibold'>minutes</p>
        </div>
        <span className='mx-2'>:</span>
        <div className='flex flex-col items-center px-1'>
            <p className='font-bold'>{seconds}</p>
            <p className='text-sm sm:text-lg font-semibold'>seconds</p>
        </div>
    </div>
  )

  return (
    <div className='text-3xl'>
      Remaining time: <b>UNKNOWN</b>
    </div>
  )
}

// COUNTDOWN HOOK
const useCountdown = (targetDate: Date) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export default Countdown;