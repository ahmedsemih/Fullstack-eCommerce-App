'use client'

import { Loader } from "@/components";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import { toast } from "react-toastify";

type InputTypes = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const Account = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<InputTypes>({
    defaultValues: {
      fullName: user?.fullName,
      email: user?.email,
      phone: user?.phone,
      address: user?.address
    }
  });

  const onSubmit: SubmitHandler<InputTypes> = async (data) => {
    const res = await fetch(`/api/users/${session?.user._id}`, { method: 'PUT', body: JSON.stringify(data) });
    
    if(res.ok)
    return toast.success('Informations updated successfully.', {
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
    reset();
  };  

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${session?.user._id}`);
      const data = await res.json();

      setUser(data.user);
    };

    fetchUser();
  }, [session]);

  if(user)
  return (
    <main className="text-black mt-4 p-4 pb-2 border-2 border-black rounded-lg">
      <h1 className="text-4xl font-semibold text-center py-2">User Informations</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="flex md:flex-row flex-col gap-4">
        <div className="w-full py-3">
          <div className="text-xl flex md:flex-row flex-col font-semibold mb-5 mt-4 gap-4">
            <div className="w-full">
              <p>Join Date: <i className="font-medium" >{moment(user?.joinDate!).format('DD MMMM YYYY')}</i></p>
              <p>Status: <span className="text-mainGreen">Active</span></p>
            </div>
              {
                (errors.fullName?.message || errors.email?.message || errors.phone?.message) && (
                  <div className="bg-mainRed text-white w-full p-2 rounded-lg flex items-center">
                    <p className="flex">
                      <BiErrorCircle className='text-3xl mr-2' />
                      {errors.fullName?.message || errors.email?.message || errors.phone?.message}
                    </p>
                  </div>
                )
              }
          </div>
          <label className='text-xl font-semibold'>
            Full Name:
            <input
              className={`border rounded-lg block p-2 w-full mb-5 ${errors.fullName?.message && 'border-mainRed border-2'}`}
              type="text"
              defaultValue={user?.fullName}
              placeholder="John Doe"
              {...register('fullName',
                {
                  required: 'Fullname is required.',
                  maxLength: {
                    value: 30,
                    message: 'Full name must be max 30 characters.'
                  }
                })
              }
            />
          </label>
          <label className="text-xl font-semibold">
            Email:
            <input
              className={`border rounded-lg block p-2 w-full mb-5 ${errors.email?.message && 'border-mainRed border-2'}`}
              type="email"
              defaultValue={user?.email}
              placeholder="johndoe@mail.com"
              {...register('email',
                {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address."
                  }
                })
              }
            />
          </label>
        </div>
        <div className="w-full py-3">
          <label className="text-xl font-semibold">
            Phone Number:
            <input
              className={`border rounded-lg block p-2 w-full mb-5 ${errors.phone?.message && 'border-mainRed border-2'}`}
              type="text"
              defaultValue={user?.phone}
              placeholder="+44 555 33 44"
              {...register('phone',
                {
                  required: 'Phone is required.',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid phone number."
                  }
                })
              }
            />
          </label>
          <label className="text-xl font-semibold">
            Address:
            <textarea
              defaultValue={user?.address}
              className="border rounded-lg block p-2 w-full pb-4"
              cols={30}
              rows={4}
              {...register('address')}
            />
          </label>
          <div className="flex item-center justify-end gap-2 mt-8">
            <button 
              type='submit' 
              className="text-xl font-semibold bg-mainRed border-2 border-mainRed rounded-lg text-white p-1 w-60"
            >Save</button>
            <button 
              type="reset" 
              onClick={() => reset()} 
              className="text-xl font-semibold border-2 border-mainRed text-mainRed rounded-lg p-1 w-60" 
            >Reset</button>
          </div>
        </div>
      </form>
    </main>
  )

  return (
    <main className="w-full h-[38vh] flex items-center justify-center">
      <Loader/>
    </main>
  )
}

export default Account;