'use client'

import { toast } from "react-toastify";
import { ReactNode, useState } from "react";
import CampaignModal from "../modals/CampaignModal";

type Props = {
  children: ReactNode;
  campaignId: Campaign['_id'] | null;
}

const CampaignButton = ({ children, campaignId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = async () => {
    if(!campaignId)
    return setIsModalOpen(true);

    const res = await fetch(`/api/campaigns/${campaignId}`, { method: 'DELETE' });

    if(res.ok)
    return toast.success('Campaign deleted successfully.', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    toast.error(res.statusText, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  }

  return (
    <>
      <button 
        className="bg-mainGreen px-4 py-2 text-white font-semibold rounded-lg hover:opacity-70" 
        onClick={handleClick}
      >
          {children}
      </button>
      {
        isModalOpen && (
          <CampaignModal 
            setIsOpen={setIsModalOpen} 
          />
        )
      }
    </>
  )
}

export default CampaignButton;