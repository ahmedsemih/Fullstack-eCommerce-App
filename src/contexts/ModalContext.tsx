import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

type ContextType = {
    isProductOpen: boolean;
    setIsProductOpen: Dispatch<SetStateAction<boolean>>;
    isAuthOpen: boolean;
    setIsAuthOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<ContextType>({
    isProductOpen: false,
    isAuthOpen: false, 
    setIsProductOpen: useState<boolean>, 
    setIsAuthOpen: useState<boolean>
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isProductOpen, setIsProductOpen] = useState<boolean>(false);
    const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

    let values = {
        isProductOpen,
        setIsProductOpen,
        isAuthOpen,
        setIsAuthOpen
    }

    return <ModalContext.Provider value={values} >{children}</ModalContext.Provider>
}

export const useModalContext = () => useContext(ModalContext);