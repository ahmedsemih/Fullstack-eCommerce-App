'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Loader } from '..';
import Select from 'react-select';
import { toast } from 'react-toastify';

type Props = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type CampaignInputs = {
  name: string;
  discountRate: number;
  endDate: string;
  products: any;
}

const CampaignModal = ({ setIsOpen }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [productOptions, setProductOptions] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [campaignValues, setCampaignValues] = useState<CampaignInputs>({
    name: '',
    discountRate: 0,
    endDate: '',
    products: []
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();

      const options: any[] = []

      data.products?.forEach((product: Product) => {
        options.push({ value: product._id, label: product.name })
      });

      setProductOptions(options);
    }

    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target))
      setIsOpen(false);
    }

    fetchProducts();
    document.body.style.overflow = 'hidden';
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    document.body.style.overflow = 'auto';
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if(campaignValues.name === '' || campaignValues.products.length < 3 || campaignValues.discountRate === 0)
    return toast.error('Name, discount and products fields are required.',{
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    const res = await fetch('/api/campaigns', { method: 'POST', body: JSON.stringify(campaignValues) });

    if(!res.ok){
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

    setIsOpen(false);

    return toast.success('Campaign created successfully.',{
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

  const handleChange = <T extends keyof CampaignInputs>(prop: T, value: CampaignInputs[T]) => {
    setCampaignValues({ ...campaignValues, [prop]: value });
  };

  const handleReset = () => {
    setCampaignValues({
      name: '',
      discountRate: 0,
      endDate: '',
      products: []
    });
  }

  return (
    <div className="fixed z-50 text-black top-0 left-0 bg-[rgba(0,0,0,.5)] w-screen h-screen flex items-center justify-center">
      {
        productOptions.length > 0 ? (
          <div ref={modalRef} className="p-4 h-screen w-screen flex justify-center flex-col max-w-[500px] sm:h-auto lg:p-8 bg-white rounded-lg shadow-xl">
            <h1 className='text-4xl font-semibold mb-4 text-center'>New Campaign</h1>
            <form onSubmit={handleSubmit} className='flex flex-col'>
              <label className='my-2'>
                Name 
                <input 
                  type="text" 
                  value={campaignValues.name}
                  className='w-full border rounded-md p-1' 
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </label>
              <label className='my-2'>
                Discount Rate
                <input 
                  type="number" 
                  value={campaignValues.discountRate}
                  step={5} min={0} 
                  className='w-full border rounded-md p-1'
                  onChange={(e) => handleChange('discountRate', Number(e.target.value))}
                />
              </label>
              <label className='my-2'>
                End Date
                <input 
                  type="date"
                  value={campaignValues.endDate!}
                  className='w-full border rounded-md p-1'
                  onChange={(e) => handleChange('endDate', e.target.value)}
                />
              </label>
              <label className='my-2'>
                Products
                <Select 
                  options={productOptions} 
                  value={selectedProducts}
                  isMulti 
                  closeMenuOnSelect={false}
                  onChange={(options) => {
                      let values = options.map((opt) => opt.value);
                      handleChange('products', values);
                      setSelectedProducts(options)
                    }
                  } 
                />
              </label>
              <div className='flex gap-4 mt-4'>
                <button className='rounded-md bg-mainGreen border-mainGreen border-2 py-2 px-4 text-white w-full hover:opacity-70' type='submit'>
                  Create
                </button>
                <button type='button' onClick={handleReset} className='rounded-md border-2 border-mainGreen py-2 px-4 text-mainGreen w-full hover:opacity-70'>
                  Reset
                </button>
              </div>
            </form>
          </div>
          ): (
            <Loader />
          )
      }
    </div>
  )
}

export default CampaignModal