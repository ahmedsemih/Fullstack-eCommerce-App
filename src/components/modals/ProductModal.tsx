'use client'

import Image from "next/image";
import { toast } from 'react-toastify';
import { AiFillExclamationCircle } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { Loader } from "..";
import { sizes } from "@/utils/constants";
import getSizeInfo from "@/utils/getSizeInfo";
import { useCartContext } from "@/contexts/CartContext";
import { useModalContext } from "@/contexts/ModalContext";

const ProductModal = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
    const { addToCart } = useCartContext();
    const { productId } = useModalContext();
    const modalRef = useRef<HTMLDivElement>(null);

    const [product, setProduct] = useState<Product | null>(null);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<string>('small');

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch(`/api/products/${productId}`)
            const data = await res.json();

            setProduct(data?.product);
            setIngredients(data?.product?.ingredients || []);
        };

        fetchProducts();
    }, [productId]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        function handleClickOutside(event: any) {
            if (modalRef.current && !modalRef.current.contains(event.target))
                setIsOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);
    
    const handleAddToCard = () => {
        let selection: SelectionType = {
            _id: (Math.random() * 100).toString(),
            product: product!,
            user: '',
            ingredients,
            size: selectedSize
        }

        toast.success(`Added to cart successfully.`,{
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });

        addToCart(selection);
    };

    const handleChangeIngredients = (event: any) => {
        let isExists = ingredients.includes(event.target.value);

        if(isExists)
        setIngredients(ingredients.filter((ingredient) => ingredient !== event.target.value));
        else
        setIngredients((prev) => [...prev, event.target.value])
    }

    return (
        <div className="fixed z-50 text-black top-0 left-0 bg-[rgba(0,0,0,.5)] w-screen h-screen flex items-center justify-center">
            {product ? (
                <div ref={modalRef} className="p-4 h-screen w-screen flex justify-center flex-col md:flex-row max-w-[1200px] sm:h-auto lg:p-8 bg-white rounded-lg shadow-xl">
                <div className="flex flex-col items-center w-full pr-4 lg:pr-8">
                    <Image src={product?.image!} alt={product?.name!} width={400} height={400} />
                    <h3 className="text-4xl text-black font-semibold mt-6 mb-3" >{product?.name}</h3>
                    <p className="text-lg text-center text-black">{product?.description}</p>
                </div>
                <div className="w-full border-l border-[rgba(0,0,0,.2)] pl-4 lg:pl-8">
                    <div className="flex flex-col justify-between h-full">
                        <div className="mb-6">
                            <h4 className="text-4xl font-semibold mb-4">Ingredients</h4>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                {
                                    product?.ingredients?.map((ingredient: string) => (
                                        <label className="text-xl items-center flex capitalize">
                                            <input 
                                                value={ingredient} 
                                                onChange={handleChangeIngredients} 
                                                checked={ingredients.includes(ingredient)} 
                                                className="accent-mainRed mr-3 w-6 h-6" 
                                                type="checkbox" 
                                                name={ingredient}
                                            />
                                            {ingredient}
                                        </label>
                                    ))
                                }
                            </div>
                            <ul className="ml-4 text-lg">
                                {
                                    product?.ingredients?.map((ingredient) => (
                                        <li className={`list-disc ${ingredients.includes(ingredient) && 'hidden'}`}>
                                            I don't want {ingredient.toLowerCase()}.
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="pb-4">
                            <h4 className="text-4xl font-semibold mb-4">Sizes</h4>
                            <div className="flex gap-3 w-full justify-between mb-4">
                                {
                                    sizes.map((size) => (
                                        <button
                                            onClick={() => setSelectedSize(size.text)}
                                            className={`
                                                border-2 capitalize hover:bg-mainRed hover:text-white p-2 border-mainRed 
                                                rounded-lg font-medium text-2xl w-full transition-all duration-200 
                                                ${size.text === selectedSize ? 'bg-mainRed text-white' : 'text-mainRed'}
                                            `}
                                        >{size.text}</button>
                                    ))
                                }
                            </div>
                            {
                                sizes.map((size) => (
                                    <p className={`text-black opacity-70 font-semibold flex items-center ${size.text !== selectedSize && 'hidden'}`}>
                                        <AiFillExclamationCircle className='opacity-70 text-2xl mr-2' />{size.message}
                                    </p>
                                ))
                            }
                        </div>
                        <div className="flex items-center justify-between">
                            {
                                product?.discountRate! > 0 ? (
                                    <div className='flex gap-4 justify-center'>
                                        <span className='text-black opacity-40 font-semibold text-6xl line-through' >
                                            ${product?.price! * getSizeInfo(selectedSize).multiplier}
                                        </span>
                                        <span className='text-black font-semibold text-6xl' >
                                            ${((product?.price! * getSizeInfo(selectedSize).multiplier)  * Number((100 - product?.discountRate!) / 100))}
                                        </span>
                                    </div>
                                ) : (
                                    <p className='text-6xl text-black font-semibold'>${product?.price! * getSizeInfo(selectedSize).multiplier}</p>
                                )
                            }
                            <button
                                onClick={handleAddToCard}
                                className="border-2 capitalize border-mainRed bg-mainRed text-white rounded-lg font-medium text-2xl py-2 px-6 hover:opacity-70 transition-all duration-200"
                            >Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            ): (
                <Loader />
            )}

            
        </div>
    )
}

export default ProductModal;