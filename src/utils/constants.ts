import { BiLogIn } from 'react-icons/bi';
import { AiOutlineHome, AiOutlineShoppingCart } from 'react-icons/ai';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { MdOutlineCampaign } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';

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
    },
    {
        name: 'Login',
        link: '/login',
        Icon: BiLogIn
    },
    {
        name: 'Account',
        link: '/account',
        Icon: RiAccountCircleLine
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