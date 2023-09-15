type ParamsType = {
    params: {
        id: string;
    }
}

type Campaign = {
    _id: string;
    name: string;
    discountRate: number;
    products: Product[];
    createdAt: Date;
    endDate?: Date;
}

type Category = {
    _id: string;
    name: string;
    createdAt: Date;
}

type Order = {
    _id: string;
    selections: SelectionType[];
    buyer: User;
    price: number;
    status: boolean;
    progress: number;
    orderDate: Date;
    deliveryDate?: Date;
}

type Product = {
    _id: string;
    name: string;
    image: string;
    price: number;
    category: Category._id;
    createdAt?: Date;
    numberOfSales: number;
    ingredients?: string[];
    description?: string;
    discountRate: number;
}

type SelectionType = {
    _id: string;
    product: Product;
    user: User._id;
    size?: string;
    ingredients?: string[];
}

type User = {
    _id: string;
    fullName: string;
    email: string;
    password?: string;
    provider: string;
    isAdmin: boolean;
    joinDate: Date;
    phone?: string;
    address?: string;
}