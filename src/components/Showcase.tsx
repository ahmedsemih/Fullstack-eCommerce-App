import Image from "next/image";

import { ClientButton } from "@/components";

async function fetchProduct() {
    const res = await fetch(`${process.env.BASE_URL}/api/campaigns`, { cache: 'no-cache' });
    const data = await res.json();
    const products = data.campaign?.products;

    if (products?.length > 0)
        return products[-1];

    const response = await fetch(`${process.env.BASE_URL}/api/products/category/top`, { cache: 'no-cache' });
    const body = await response.json();
    return body.products[0];
}

const Showcase = async () => {
    const product = await fetchProduct();

    return (
        <section className="w-full bg-mainRed lg:h-[50vh] flex justify-between lg:flex-row flex-col-reverse p-4 md:py-8 md:px-7 lg:px-16 xl:px-[128px]" >
            <div className="flex flex-col justify-around w-full">
                <h4 className="text-4xl md:text-5xl font-semibold text-center lg:text-start">{product?.name}</h4>
                <p className="text-2xl  text-center lg:text-start">{product?.description}</p>
                <div className="flex md:flex-row flex-col items-center lg:justify-start justify-center gap-10 ">
                    <div className='my-8 flex gap-4 justify-center'>
                        {
                            product?.discountRate > 0 ? (
                                <>
                                    <span className='opacity-40 text-5xl font-semibold sm:text-7xl lg:text-5xl xl:text-7xl line-through' >${product?.price}</span>
                                    <span className='font-semibold text-5xl sm:text-7xl lg:text-5xl xl:text-7xl' >${(product?.price * Number((100 - product?.discountRate!) / 100))}</span>
                                </>
                            ) : (
                                <span className='font-semibold text-5xl sm:text-7xl lg:text-5xl xl:text-7xl' >${product?.price}</span>
                            )
                        }

                    </div>
                    <ClientButton
                        selection={{
                            _id: product?._id,
                            product,
                            user: ''
                        }}
                        variant="outlined"
                    >
                        Add to Cart
                    </ClientButton>
                </div>
            </div>
            <div className="w-full">
                <Image alt={product?.name} className="h-full mx-auto" src={product?.image} width={500} height={500} />
            </div>
        </section>
    )
}

export default Showcase;