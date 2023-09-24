import React from 'react';
import moment from 'moment';
import Image from 'next/image';

import getSizeInfo from '@/utils/getSizeInfo';
import getProgressInfo from '@/utils/getProgressInfo';

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div 
        className={`
            text-black p-4 my-4 border-2 rounded-lg w-full 
            ${(getProgressInfo(order.progress, order.status) !== 'Delivered' && getProgressInfo(order.progress, order.status) !== 'Canceled') ? 'border-mainGreen bg-lightGreen' : 'border-mainRed bg-lightRed'}
        `}
    >
        <div className='text-xl md:flex-row flex-col flex items-center justify-between pb-4 px-2'>
            <p>Order Date: <i className='font-semibold'>{moment(order.orderDate).format('DD.MM.YYYY - hh:mm')}</i></p>
            {
                order.deliveryDate && <p>Deliver Date: <i className='font-semibold'>{moment(order.deliveryDate).format('DD.MM.YYYY - hh:mm')}</i></p>
            }
            <p>Status: <i className='font-semibold'>{getProgressInfo(order.progress, order.status)}</i></p>
            <p>Price: <i className='font-semibold'>${order.price}</i></p>
        </div>
        <div>
        </div>
        <div 
            className={`
                border-t-2 sm:flex-row flex-col flex flex-wrap justify-start
                ${(getProgressInfo(order.progress, order.status) !== 'Delivered' && getProgressInfo(order.progress, order.status) !== 'Canceled') ? 'border-mainGreen' : 'border-mainRed'}
            `}
        >
            {
                order.selections.map((selection: SelectionType) => (
                    <div key={selection._id} className='flex flex-col items-center p-2 h-[160px] justify-end mr-8'>
                        <Image src={selection.product.image} alt={selection.product.name} width={100} height={100} />
                        <p className='mt-2 font-semibold'>
                            {selection.product.name}
                            {selection?.size && ` (${getSizeInfo(selection.size).short})`}
                        </p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default OrderCard