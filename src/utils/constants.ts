import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { MdOutlineCampaign } from 'react-icons/md';

import Image1 from '@/../public/images/chicken-pizza.jpg';
import Image2 from '@/../public/images/hot-pizza.jpg';
import Image3 from '@/../public/images/share-and-earn.jpg';

export const phoneNumbers = {
    order: '555 33 44',
    questionAndAdvice: '588 77 99' 
}

export const navLinks = [
    {
        name: 'Home',
        link: '/',
        Icon: AiOutlineHome
    },
    {
        name: 'Menu',
        link: '/menu',
        Icon: HiOutlineBookOpen
    },
    {
        name: 'Campaigns',
        link: '/campaigns',
        Icon: MdOutlineCampaign
    },
    {
        name: 'Cart',
        link: '/cart',
        Icon: AiOutlineShoppingCart
    }
]

export const footerLinks = {
    help: ['About', 'Terms of Services', 'Privacy Policy', 'Cookie Terms'],
    products: [
        {
            name: 'Campaigns',
            link: '/campaigns'
        },
        {
            name: 'Top Sales',
            link: '/menu/top-sales'
        },
        {
            name: 'Pizzas',
            link: '/menu/pizzas'
        },
        {
            name: 'Pastas',
            link: '/menu/pastas'
        }
    ]
}

export const adminLinks = [
    {
        name: 'Orders',
        link: '/admin/orders'
    },
    {
        name: 'Products',
        link: '/admin/products',
    },
    {
        name: 'Campaigns',
        link: '/admin/campaigns',
    },
    {
        name: 'Admins',
        link: '/admin/admins'
    }
]

export const userLinks = [
    {
        name: 'Account',
        link: '/account'
    },
    {
        name: 'Orders',
        link: '/account/orders'
    }
]

export const sizes = [
    {
        text: 'small',
        message: 'Small size for 1 person.'
    },
    {
        text: 'medium',
        message: 'Medium size for 2 people.'
    },
    {
        text: 'large',
        message: 'Large size for 3-4 people.'
    }
]

export const heroBanners = [
    {
        slogan: 'The Key to Flavor is in Our Oven',
        info: 'Dozens delicious pizzas and pastas are waiting for you.',
        image: Image1
    },
    {
        slogan: 'The Art of Pizza Comes to Life in Our Kitchen',
        info: 'We produce all kinds of pizzas for you using the freshest ingredients.',
        image: Image2
    },
    {
        slogan: 'Share & Earn Discount',
        info: 'Take and share a picture of the pizza you ate and get a one-time 25% discount!',
        image: Image3
    },
]