import Image from 'next/image';
import ClientButton from '../buttons/ClientButton';

type Props = {
  product: Product;
  border: boolean;
  category: string;
}

const Card = ({ product, border, category }: Props) => {
  return (
    <div 
      className={`
        h-auto rounded-lg hover:bg-lightRed cursor-pointer group flex flex-col justify-between 
        ${border ? 'border-[3px] border-mainRed w-full' : 'border-none w-[100vw] sm:w-[50vw] md:w-[33vw] xl:w-[25vw] min-w-[25vw]'}
      `}
    >
      <div className='px-8 py-4 xl:py-8'>
        <Image
          className={`
            mx-auto w-full 
            ${border ? 'max-h-[350px]' : 'max-h-none'} 
            ${category === 'pizzas' && 'group-hover:rotate-45 transition-all duration-300'} 
          `}
          alt={product.name}
          width={500}
          height={500}
          src={product.image}
        />
      </div>
      <div className='px-4 pb-8 text-center'>
        <h3 className='text-mainRed text-4xl text-center font-semibold' >{product.name}</h3>
        <p className='text-mainRed font-medium mt-4' >{product?.description}</p>
        {
          product.discountRate > 0 ? (
            <div className='my-8 flex gap-4 justify-center'>
              <span className='text-mainRed opacity-40 font-semibold text-4xl line-through' >
                ${product.price}
              </span>
              <span className='text-mainRed font-semibold text-4xl' >
                ${(product.price * Number((100 - product.discountRate!) / 100)).toFixed(2)}
              </span>
            </div>
          ) : (
            <p className='text-6xl text-mainRed font-semibold my-8'>${product.price}</p>
          )
        }
        <ClientButton 
          variant='contained' 
          productId={product.category.name === 'pizzas' ? product._id : null}
          selection={{
            _id: product._id,
            product: product,
            user: '',
          }}
        >
          Add to Cart
        </ClientButton>
      </div>
    </div>
  )
}

export default Card;