import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

type ContextType = {
    isProductOpen: boolean;
    setIsProductOpen: Dispatch<SetStateAction<boolean>>;
    isAuthOpen: boolean;
    setIsAuthOpen: Dispatch<SetStateAction<boolean>>;
    productId: string;
    setProductId: Dispatch<SetStateAction<string>>;
};

export const ModalContext = createContext<ContextType>({
    isProductOpen: false,
    isAuthOpen: false,
    productId: '',
    setIsProductOpen: useState<boolean>,
    setIsAuthOpen: useState<boolean>,
    setProductId: useState<string>
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [productId, setProductId] = useState<string>('');
    const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
    const [isProductOpen, setIsProductOpen] = useState<boolean>(false);

    let values = {
        isProductOpen,
        setIsProductOpen,
        isAuthOpen,
        setIsAuthOpen,
        productId,
        setProductId
    }

    return <ModalContext.Provider value={values} >{children}</ModalContext.Provider>
}

export const useModalContext = () => useContext(ModalContext);