import moment from "moment";
import Image from "next/image";

import { CampaignButton } from "@/components";

async function fetchCampaign() {
  const res = await fetch(`${process.env.BASE_URL}/api/campaigns`, { cache: 'no-cache' });
  const data = await res.json();

  return data.campaign;
};

const Campaigns = async () => {
  const campaign: Campaign = await fetchCampaign();

  return (
    <main>
        <div className="border-2 border-mainGreen rounded-lg p-2 my-4 text-black">
          <div className="flex flex-wrap text-xl justify-between my-2 font-semibold gap-4">
            <div>
              <h2><b className="text-mainGreen">Current:</b> {campaign?.name ?? 'None'}</h2>
              <p><b className="text-mainGreen">Discount Rate:</b> {campaign?.discountRate ?? 0}%</p>
            </div>
            <div>
              <p><b className="text-mainGreen">End Date:</b> {campaign?.endDate ? moment(campaign.endDate).format('DD.MM.YYYY') : 'null'}</p>
              <p><b className="text-mainGreen">Status:</b> { campaign ? ( moment(campaign?.endDate).diff(Date.now()) < 0 ? 'Ended' : 'Continues' ) : 'Ended' }</p>
            </div>
            <div className="flex gap-2">
            <CampaignButton campaignId={null} >New</CampaignButton>
            {
              campaign && <CampaignButton campaignId={campaign?._id} >End Campaign</CampaignButton>
            }
            </div>
          </div>
          {
            campaign && (
              <table className="table-auto w-full">
                <thead className="bg-mainGreen text-white py-4 border border-mainGreen rounded-tl-lg">
                  <tr>
                    <th className="py-4">
                      Image
                    </th>
                    <th>
                      Name
                    </th>
                    <th>
                      Price
                    </th>
                    <th>
                      Number of Sales
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    campaign?.products?.map((product: Product) => (
                      <tr className="text-center border border-mainGreen h-28" key={product._id}>
                        <td>
                          <Image 
                            className="flex justify-center items-center mx-auto" 
                            src={product.image} 
                            alt={product.name} 
                            width={100} 
                            height={100} 
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.numberOfSales}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            )
          }
        </div>
    </main>
  )
}

export default Campaigns;