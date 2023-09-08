'use client'

import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef, useEffect, Dispatch, SetStateAction, useState } from 'react';

type RegisterInputs = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

type LoginInputs = {
  email: string;
  password: string;
}

const AuthModal = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [tab, setTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target))
        setIsOpen(false);

    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="fixed z-50 text-black top-0 left-0 bg-[rgba(0,0,0,.5)] w-screen h-screen flex items-center justify-center">
      <div ref={modalRef} className="p-4 h-screen w-screen flex justify-center flex-col max-w-[500px] sm:h-auto lg:p-8 bg-white rounded-lg shadow-xl">
        <div className='flex gap-4 text-2xl font-semibold border-b-2 border-mainGreen w-full'>
          <button
            onClick={() => setTab('login')} 
            className={`${tab !== 'login' ? `bg-white text-medium` : 'text-white bg-mainGreen'} p-3 rounded-tr-lg rounded-tl-lg w-full`} 
          >
            Login
          </button>
          <button 
            onClick={() => setTab('register')} 
            className={`${tab !== 'register' ? `bg-white text-medium` : 'text-white bg-mainGreen'} p-3 rounded-tr-lg rounded-tl-lg w-full`}
          >
            Register
          </button>
        </div>
        {tab === 'login' ? <LoginForm setIsOpen={setIsOpen}  /> : <RegisterForm setTab={setTab} />}
        <div>
          <p className='text-center mt-2'>or</p>
          <button 
            className='w-full border-2 text-xl text-mainGreen border-mainGreen mt-4 rounded-lg p-3 font-semibold' 
            type='submit'
            onClick={() => signIn('google')}
          >
              Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}

const LoginForm = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { register, handleSubmit, reset, formState: { errors }} = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });
    
    if(res?.ok)
    return setIsOpen(false);

    reset();
  };

  return (
    <form className='w-full flex flex-col text-xl pt-4' onSubmit={handleSubmit(onSubmit)}>
      <label className='my-2'>
        Email:
        <input
          className={`${errors.email && 'border-mainRed'} w-full p-2 border rounded-lg`}
          placeholder='johndoe@mail.com'
          type="email"
          {...register('email', { required: true })}
        />
      </label>
      <label className='my-2'>
        Password:
        <input
          className={`${errors.password && 'border-mainRed'} w-full p-2 border rounded-lg`}
          placeholder='p4ssW0rd'
          type="password"
          {...register('password', { required: true })}
        />
      </label>
      <button 
        className='w-full bg-mainGreen text-white mt-4 rounded-lg p-3 font-semibold' 
        type='submit'
      >
        Login
      </button>
    </form>
  )
};

const RegisterForm = ({ setTab }: { setTab: Dispatch<SetStateAction<'login' | 'register'>> }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>();
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const res = await fetch(`/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    if(!res.ok)
    return toast.error(res.statusText, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    toast.success('Account created successfully.', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

    return setTab('login');
  };

  return (
    <form className='w-full flex flex-col text-xl pt-4' onSubmit={handleSubmit(onSubmit)}>
      <label className='my-2'>
        Full Name:
        <input
          className={`${errors.fullName && 'border-mainRed'} w-full p-2 border rounded-lg`}
          placeholder='John Doe'
          type="text"
          {...register('fullName',
            {
              required: 'fullname is required.',
              maxLength: {
                value: 30,
                message: 'full name must be max 30 characters.'
              }
            })
          }
        />
        <p className='text-mainRed text-lg' >{errors.fullName?.message}</p>
      </label>
      <label className='my-2'>
        Email:
        <input
          className={`${errors.email && 'border-mainRed'} w-full p-2 border rounded-lg`}
          placeholder='johndoe@mail.com'
          type="email"
          {...register('email',
            {
              required: 'email is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address."
              }
            })
          }
        />
        <p className='text-mainRed text-lg' >{errors.email?.message}</p>
      </label>
      <label className='my-2'>
        Phone:
        <input
          className={`${errors.phone && 'border-mainRed'} w-full p-2 border rounded-lg`}
          placeholder='+44 555 33 44'
          type="text"
          {...register('phone',
            {
              required: 'phone is required.',
              pattern: {
                value: /^[0-9]+$/,
                message: "invalid phone number."
              }
            })
          }
        />
        <p className='text-mainRed text-lg' >{errors.phone?.message}</p>
      </label>
      <label className='my-2'>
        Password:
        <input
          className={`${errors.password && 'border-mainRed'} w-full p-2 border rounded-lg`}
          placeholder='p4ssW0rd'
          type="password"
          {...register('password', {
              required: 'password is required.',
              minLength: {
                value: 5,
                message: 'password must be min 5 characters.'
              },
              maxLength: {
                value: 20,
                message: 'password must be max 20 characters.'
              }
            })
          }
        />
        <p className='text-mainRed text-lg' >{errors.password?.message}</p>
      </label>
      <p className='text-center text-sm opacity-70 font-medium'>
        When you create an account, you agree to our all terms and policies.
      </p>
      <button 
        className='w-full bg-mainGreen text-white mt-4 rounded-lg p-3 font-semibold' 
        type='submit'
      >
        Create Account
      </button>
    </form>
  )
};

export default AuthModal;