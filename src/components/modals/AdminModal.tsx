'use client'

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { FormSubmitHandler } from 'react-hook-form';
import { useSession } from 'next-auth/react';

type Props = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: string | null;
}

type Values = {
  fullName: string;
  email: string;
  password?: string;
  isAdmin: boolean;
}

const AdminModal = ({ setIsOpen, userId }: Props) => {
  const router = useRouter();
  const { data:session } = useSession();
  const modalRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<Values>({
    fullName: '',
    email: '',
    password: '',
    isAdmin: true
  })

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();

      setValues({
        fullName: data.user.fullName,
        email: data.user.email,
        password: data.user.password,
        isAdmin: data.user.isAdmin
      });
    }

    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target))
        setIsOpen(false);
    }

    userId && fetchUser();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleChange = <T extends keyof Values>(prop: T, value: Values[T]) => {
    setValues({ ...values, [prop]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if(!values.fullName || !values.email || !values.password)
    return toast.error('Please fill all the fields.', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    if(userId){
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(values)
      });

      if(!res.ok)
      return toast.error(res.statusText ,{
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      toast.success('User updated successfully.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      setIsOpen(false);
      return router.refresh();

    } else {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          provider: 'company'
        })
      });

      if(!res.ok)
      return toast.error(res.statusText ,{
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      toast.success('User created successfully.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

      setIsOpen(false);
      return router.refresh();
    }
  }

  const handleReset = () => {
    setValues({
      fullName: '',
      email: '',
      password: '',
      isAdmin: true
    });
  };

  return (
    <div className="fixed z-50 text-black top-0 left-0 bg-[rgba(0,0,0,.5)] w-screen h-screen flex items-center justify-center">
      <div ref={modalRef} className="p-4 h-screen w-screen flex flex-col max-w-[500px] sm:h-auto lg:p-8 bg-white rounded-lg shadow-xl">
        <h1 className='text-3xl'>{userId ? 'Edit User' : 'Create User'}</h1>
        <form className='w-full' onSubmit={handleSubmit} >
          <label className='flex flex-col items-start my-4 font-semibold'>
            Full Name:
            <input
              onChange={(e) => handleChange('fullName', e.target.value)}
              className='w-full border rounded-lg p-2'
              type="text"
              value={values.fullName}
            />
          </label>
          <label className='flex flex-col items-start my-4 font-semibold'>
            Email:
            <input
              onChange={(e) => handleChange('email', e.target.value)}
              className='w-full border rounded-lg p-2'
              type="email"
              value={values.email}
            />
          </label>
          {
            !userId && (
              <label className='flex flex-col items-start my-4 font-semibold'>
                Password:
                <input
                  onChange={(e) => handleChange('password', e.target.value)}
                  className='w-full border rounded-lg p-2'
                  type="password"
                  value={values.password}
                />
              </label>
            )
          }
          <label className='flex items-center font-semibold text-xl gap-3 my-4'>
            This user is an administrator:
            <input
              onChange={(e) => handleChange('isAdmin', e.target.checked)}
              className='border rounded-lg p-2 h-6 w-6 accent-mainGreen'
              type="checkbox"
              checked={values.isAdmin}
              disabled={userId === session?.user._id}
            />
          </label>
          <div className='flex gap-4 font-semibold'>
            <button
              className='text-white bg-mainGreen border-2 border-mainGreen px-4 py-2 rounded-lg w-full hover:opacity-70 transition-all duration-200'
              type='submit'
            >
              {userId ? 'Save' : 'Create'}
            </button>
            <button
              onClick={handleReset}
              className='text-mainGreen border-2 border-mainGreen px-4 py-2 rounded-lg w-full hover:opacity-70 transition-all duration-200'
              type='reset'
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminModal;