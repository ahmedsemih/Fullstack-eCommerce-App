'use client'
import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { CartItem } from "@/components";
import getSizeInfo from "@/utils/getSizeInfo";
import { useCartContext } from "@/contexts/CartContext";
import { useModalContext } from "@/contexts/ModalContext";

const Cart = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setIsAuthOpen } = useModalContext();
  const { cart, totalCost } = useCartContext();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${session?.user._id}`);
      const data = await res.json();
      setUser(data.user);
    }

    session && fetchUser(); 
  }, [session]);

  const handleCheckout = async () => {
    if(!session?.user || !user)
    return setIsAuthOpen(true);

    if(user?.address === '' || user?.address === null){
      toast.error('You must have address information.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      return router.push('/account')
    }

    var selectionIds:string[] = [];

    for(let i = 0; i < cart.length; i++){
      await fetch(`/api/selections`, {
        method: 'POST',
        body: JSON.stringify({
          product: cart[i].product,
          user: session.user._id,
          size: cart[i].size,
          ingredients: cart[i].ingredients
        })
      })
      .then((res) => res.json())
      .then((res) => selectionIds.push(res.selection._id));
    }

    const response = await fetch(`/api/orders`, {
      method: 'POST',
      body: JSON.stringify({
        selections: selectionIds,
        buyer: session.user._id,
        status: false,
        price: totalCost
      })
    });

    const data = await response.json();
    return router.push(`/payment/${data?.order?._id}`);
  };

  if(cart?.length > 0)
  return (
    <div className="flex flex-col lg:flex-row p-8 gap-8 min-h-[84vh] text-black">
      <div className="flex flex-col w-full gap-4">
        {
          cart.map((selection: SelectionType) => (
            <CartItem selection={selection} />
          ))
        }
      </div>
      <div className="bg-lightRed border-2 rounded-lg border-mainRed w-full flex justify-center items-center p-4">
        <div className="w-full h-fit xl:w-[70%] xl:min-w-[500px] mx-auto py-4">
          {
            cart.map((selection: SelectionType) => {
              return (
                <div className="w-full mb-3 flex justify-between text-sm sm:text-lg md:text-2xl px-2">
                  <span>{selection?.product?.name}{selection?.size && ` (${getSizeInfo(selection?.size).short})`}</span>
                  {
                    selection?.size
                      ?
                      <b>${selection?.product?.price * getSizeInfo(selection?.size).multiplier * Number((100 - selection?.product?.discountRate!) / 100)}</b>
                      :
                      <b>${selection?.product?.price * Number((100 - selection?.product?.discountRate!) / 100)}</b>
                  }
                </div>
              )
            })
          }
          <div className="w-full mb-3 flex justify-between text-sm sm:text-lg md:text-2xl px-2">
            <span>Delivery Cost: </span>
            {totalCost > 50 ? <b className="text-mainGreen">FREE</b> : <b >$9.90</b>}
          </div>
          <div className="border-t-2 w-full py-2 flex justify-between border-black px-2 md:text-4xl sm:text-xl text-lg font-bold uppercase">
            <span>total (incl.vat)</span>
            <span>${totalCost < 50 ? totalCost + 9.90 : totalCost}</span>
          </div>
          <div className="flex justify-end mt-4 md:mt-8">
           <button 
            onClick={handleCheckout} 
            className="bg-mainRed text-white hover:opacity-70 transition-all duration-200 rounded-lg py-2 px-4 text-2xl ml-auto">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="text-black text-center py-10 px-4 bg-lightRed">
      <AiOutlineShoppingCart className='text-[200px] md:text-[300px] mx-auto mb-10' />
      <h1 className="text-3xl md:text-5xl font-semibold">Your cart is empty. </h1>
      <p className="text-xl md:text-3xl font-medium">Discover our products and fill your cart.</p>
      <Link href='/menu/top'>
        <button className="bg-mainRed text-white hover:opacity-70 text-3xl rounded-lg px-8 py-2 mt-10" >Discover</button>
      </Link>
    </div>
  )
}

export default Cart;