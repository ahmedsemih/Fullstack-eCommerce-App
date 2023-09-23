'use client'

import moment from "moment";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'

import getSizeInfo from "@/utils/getSizeInfo";
import getProgressInfo from "@/utils/getProgressInfo";

const AdminOrderCard = ({ order }: { order: Order }) => {
  const router = useRouter();

  const handleContinue = async () => {
    if(order.progress >= 2 || !order.status) return;

    const res = await fetch(`/api/orders/${order._id}`,{
      method: 'PUT',
      body: JSON.stringify({ 
        progress: order.progress + 1, 
        deliveryDate: order.progress === 1 ? Date.now() : null 
      })
    });
    
    if(res.ok)
    return router.refresh();

    toast.error(res.statusText, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <div className="border-2 border-mainGreen text-mainGreen rounded-lg p-4 my-4" >
      <div className="text-xl flex md:flex-row flex-col flex-wrap justify-between px-2">
        <div className="flex flex-col">
          <p>Order No: <i className="font-semibold">{order._id}</i></p>
          <p className="mt-2">Buyer: <i className="font-semibold">{order.buyer.fullName}</i></p>
        </div>
        <div className="flex flex-col">
          <p>Address: <i className="font-semibold">{order.buyer.address}</i></p>
          <p className="mt-2">Phone: <i className="font-semibold">{order.buyer.phone}</i></p>
        </div>
        <div className="flex flex-col">
          <p>Status: <i className="font-semibold">{getProgressInfo(order.progress, order.status)}</i></p>
          {
            order.deliveryDate
              ?
              <p className="mt-2">Delivery Date: <i className="font-semibold">{moment(order.deliveryDate).format('DD.MM.YYYY - hh:mm')}</i></p>
              :
              <button 
                onClick={handleContinue} 
                className="bg-mainGreen rounded-lg px-4 py-2 hover:opacity-70 transition-all duration-200 text-white mt-2"
              >
                Continue
              </button>
          }
        </div>
      </div>
      <div className="pt-4 mt-4 border-t border-mainGreen sm:flex-row flex-col flex-wrap flex gap-4">
        {
          order.selections.map((selection: SelectionType) => (
            <div className="flex sm:flex-row flex-col items-center gap-2">
              <Image src={selection.product.image} alt={selection.product.name} width={100} height={100} />
              <div>
                <p className="font-semibold">{selection.product.name} { selection.size && `(${getSizeInfo(selection?.size!).short})`}</p>
                {
                  selection.ingredients!.length > 0 && (
                    <p>
                      <span className="font-semibold">Ingredients:</span>
                      {
                        selection.ingredients?.map((ingredient: string) => (
                          <span> {ingredient}</span>
                        ))
                      }
                    </p>
                  )
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AdminOrderCard;