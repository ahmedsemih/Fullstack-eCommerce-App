import Image from "next/image";
import { BsFillPatchQuestionFill } from "react-icons/bs";

import { ClientButton, Countdown } from "@/components";

async function fetchCampaign() {
  const res = await fetch(`${process.env.BASE_URL}/api/campaigns`, { cache: "no-cache" } );

  if (res.ok) {
    const data = await res.json();
    return data.campaign;
  }

  return null;
}

const Campaigns = async () => {
  const campaign = await fetchCampaign();

  return (
    <section className="h-[calc(100vh-146px)] grid lg:grid-cols-3 grid-cols-1 relative w-full">
      <div className="relative lg:absolute flex flex-col top-0 lg:top-8 mx-auto right-0 left-0 w-full lg:w-96 text-center bg-mainRed lg:bg-mainGreen py-2 px-10 lg:rounded-lg lg:shadow-xl">
        <h1 className="font-semibold text-3xl mb-2">{campaign ? campaign.name : 'Next Campaign'}</h1>
        <Countdown endDate={campaign?.endDate} />
      </div>
      {
        campaign ? (
          <>
            <CampaignCard bgColor="mainGreen" textColor="white" product={campaign.products[0]} />
            <CampaignCard bgColor="white" textColor="mainRed" product={campaign.products[1]} />
            <CampaignCard bgColor="mainRed" textColor="white" product={campaign.products[2]} />
          </>
        ) : (
          <>
            <UnknownCard bgColor={'mainGreen'} />
            <UnknownCard bgColor={'white'} />
            <UnknownCard bgColor={'mainRed'} />
          </>
        )
      }
    </section>
  )
}

type Props = {
  product: Product;
  bgColor: 'mainRed' | 'mainGreen' | 'white';
  textColor: 'mainRed' | 'mainGreen' | 'white';
}

const CampaignCard = ({ product, bgColor, textColor }: Props) => {
  return (
    <div className={`bg-${bgColor} h-full p-4 flex-col flex justify-end items-center`}>
      <Image src={product.image} alt={product.name} width={400} height={400} />
      <h3 className={`text-${textColor} text-center text-3xl md:text-5xl font-semibold mt-4`}>
        {product.name}
      </h3>
      <div className='my-8 flex gap-4 text-5xl xl:text-7xl justify-center'>
        <span className={`opacity-40 font-semibold line-through text-${textColor}`} >
          ${product.price}
        </span>
        <span className={`font-semibold text-${textColor}`} >
          ${(product.price * Number((100 - product.discountRate!) / 100))}
        </span>
      </div>
      <ClientButton
        variant={bgColor !== 'white' ? 'outlined' : 'contained'}
        color={bgColor !== 'white' ? bgColor : 'mainRed'}
        productId={product.category.name === 'pizzas' ? product._id : null}
        selection={{
          _id: (Math.random() * 100).toString(),
          product,
          user: '',
        }}
      >
        Add To Cart
      </ClientButton>
    </div>
  )
}

const UnknownCard = ({ bgColor }: { bgColor: 'mainRed' | 'mainGreen' | 'white' }) => {
  return (
    <div className={`bg-${bgColor} h-full flex justify-center items-center p-6`}>
      <BsFillPatchQuestionFill className={`text-8xl sm:text-[128px] md:text-[200px] text-${bgColor === 'white' ? 'mainGreen' : 'white'}`} />
    </div>
  )
};

export default Campaigns;