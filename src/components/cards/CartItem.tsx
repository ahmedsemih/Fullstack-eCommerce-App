'use client'

import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

import { sizes } from '@/utils/constants';
import getSizeInfo from '@/utils/getSizeInfo';
import { useCartContext } from '@/contexts/CartContext';

const CartItem = ({ selection }: { selection: SelectionType }) => {
    const { removeFromCart, updateSelection } = useCartContext();

    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
    const [ingredients, setIngredients] = useState(selection?.ingredients || []);
    const [selectedSize, setSelectedSize] = useState(selection?.size || null);

    const handleChangeIngredients = (event: any) => {
        let isExists = ingredients.includes(event.target.value);

        if(isExists){
            setIngredients(ingredients.filter((ingredient) => ingredient !== event.target.value));
            updateSelection({ id: selection._id, size: selectedSize, ingredients: ingredients.filter((ingredient) => ingredient !== event.target.value)})
        } else {
            let newIngredients = ingredients;
            newIngredients.push(event.target.value);
            setIngredients((prev) => [...prev, event.target.value]);
            updateSelection({ id: selection._id, size: selectedSize, ingredients: newIngredients});
        }
    };

    const handleChangeSize = (size: any) => {
        setSelectedSize(size.text);
        updateSelection({ id: selection._id, size: size.text, ingredients })
    }

    return (
        <div className='flex flex-col w-full border-2 border-mainGreen bg-lightGreen rounded-lg min-h-[150px] justify-center relative'>
            <div className='flex items-center p-4'>
                <AiOutlineClose onClick={() => removeFromCart(selection._id)} className='absolute top-2 right-2 text-2xl text-mainGreen cursor-pointer' />
                <Image src={selection.product.image} alt={selection.product.name} width={100} height={100} />
                <div className='ml-3'>
                    <h5 className='text-2xl md:text-4xl font-semibold'>{selection.product.name}</h5>
                    {
                        selection.ingredients && (
                            <div className='font-semibold'>
                               
                                { selection.ingredients?.length === selection?.product?.ingredients?.length ? '' : 'without' }
                                {
                                    selection?.product?.ingredients?.map((ingredient: string) => (
                                        <span className={`${selection?.ingredients?.includes(ingredient) && 'hidden'} m-1`} >{ingredient}</span>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
                <b className='text-2xl md:text-4xl ml-auto'>
                    ${
                        selection.size
                            ?
                            Number((selection.product.price * getSizeInfo(selection.size).multiplier) * Number((100 - selection.product.discountRate!) / 100)).toFixed(2)
                            :
                            (selection.product.price * Number((100 - selection.product.discountRate!) / 100)).toFixed(2)
                    }
                </b>
                {
                    selection.size
                    &&
                    (
                        isDetailsOpen
                            ?
                            <button onClick={() => setIsDetailsOpen(false)} className='text-mainGreen absolute bottom-2 right-2 flex items-center gap-1'>
                                <BiSolidUpArrow /> Hide Details
                            </button>
                            :
                            <button onClick={() => setIsDetailsOpen(true)} className='text-mainGreen absolute bottom-2 right-2 flex items-center gap-1'>
                                <BiSolidDownArrow /> Show Details
                            </button>
                    )
                }
            </div>
            {
                isDetailsOpen && (
                    <div className='p-2 border-t border-mainGreen mx-2'>
                        <h4 className="text-2xl font-semibold mb-4">Ingredients</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            {
                                selection.product?.ingredients?.map((ingredient: string) => (
                                    <label className="text-lg items-center flex capitalize">
                                        <input
                                            value={ingredient}
                                            onChange={handleChangeIngredients}
                                            checked={ingredients.includes(ingredient)}
                                            className="accent-mainGreen mr-2 w-4 h-4"
                                            type="checkbox"
                                            name={ingredient}
                                        />
                                        {ingredient}
                                    </label>
                                ))
                            }
                        </div>
                        <h4 className="text-2xl font-semibold mb-4">Sizes</h4>
                        <div className="flex gap-3 w-full mb-4">
                                {
                                    sizes.map((size) => (
                                        <button
                                            onClick={() => handleChangeSize(size)}
                                            className={`
                                                border-2 capitalize hover:bg-mainGreen hover:text-white px-4 py-1 border-mainGreen 
                                                rounded-lg font-medium text-xl transition-all duration-200 
                                                ${size.text === selectedSize ? 'bg-mainGreen text-white' : 'text-mainGreen'}
                                            `}
                                        >{size.text}</button>
                                    ))
                                }
                            </div>
                    </div>
                )
            }

        </div>
    )
}

export default CartItem;