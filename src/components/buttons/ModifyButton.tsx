'use client'

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

import ModifyProductModal from "../modals/ModifyProductModal";

type Props = {
    children: ReactNode;
    productId: Product['_id'];
    type: 'add' | 'edit' | 'delete';
}

const ModifyButton = ({ children, productId, type }: Props) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        if(type === 'delete')
        deleteProduct();
        else
        setIsModalOpen(true)
    }
    
    const deleteProduct = async () => {
        const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });

        if(!res.ok)
        return toast.error(res.statusText, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        
        toast.success('Product deleted successfully.',{
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });

        return router.refresh();
    };

    return (
        <>
            <button className="hover:opacity-70 transition-all duration-300" onClick={handleClick} >{children}</button>
            { 
                isModalOpen && (
                    <ModifyProductModal 
                        productId={productId} 
                        type={type === 'add' ? 'add' : 'edit'} 
                        setIsOpen={setIsModalOpen}
                    />
                ) 
            }
        </>
    )
}

export default ModifyButton