'use client'

import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import uploadToCloudinary from "@/utils/uploadToCloudinary";

type Props = {
  productId: Product['_id'];
  type: 'add' | 'edit';
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

type ProductProps = {
  name: string;
  price: number;
  category: string;
  description: string;
  ingredients: string[];
}

const ModifyProductModal = ({ productId, type, setIsOpen }: Props) => {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [image, setImage] = useState<any>('');
  const [imageFile, setImageFile] = useState<any>(null);
  const [properties, setProperties] = useState<ProductProps>({
    name: '',
    price: 0,
    category: '',
    description: '',
    ingredients: []
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/categories`);
      const data = await res.json();

      setCategories(data.categories);
    };

    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();

      setProperties({
        name: data.product.name,
        price: data.product.price,
        category: data.product.category._id,
        description: data.product.description,
        ingredients: data.product.ingredients || []
      });

      setImage(data.product.image);
      setIngredients(data.product.ingredients);
    };

    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target))
        setIsOpen(false);
    }

    fetchCategories();
    (type === 'edit' && productId) && fetchProduct();

    document.body.style.overflow = 'hidden';
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);


  const editProduct = async (e: any) => {
    e.preventDefault();

    if (!properties.name || properties.price === 0 || !properties.category)
      return toast.error('Name, price and category is required.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

    let imageUrl = image;

    if (imageFile) {
      const response = await uploadToCloudinary(imageFile);
      const data = await response.json();
      imageUrl = data.secure_url;
    }

    const res = await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...properties,
        image: imageUrl,
        ingredients,
      })
    });

    if (!res.ok)
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

    toast.success('Product updated successfully.', {
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
  };

  const addProduct = async (e: any) => {
    e.preventDefault();

    if (!properties.name || properties.price === 0 || !properties.category || !imageFile)
      return toast.error('Name, price, category and image is required.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });

    const response = await uploadToCloudinary(imageFile);
    const data = await response.json();

    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        ...properties,
        image: data.secure_url,
        ingredients,
      })
    });

    if (!res.ok)
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

    toast.success('Product created successfully.', {
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
  };

  const handleChange = <T extends keyof ProductProps>(prop: T, value: ProductProps[T]) => {
    setProperties({ ...properties, [prop]: value });
  };

  const handleIngredients = (e: any) => {
    let value = e.target.value;
    const ingredientArray = value.split(' ');

    setIngredients(ingredientArray);
    setProperties({ ...properties, ingredients: ingredientArray })
  }

  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target?.result);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="fixed z-50 text-black top-0 left-0 bg-[rgba(0,0,0,.5)] w-screen h-screen flex items-center justify-center">
      <div ref={modalRef} className="p-4 h-screen w-screen flex flex-col md:flex-row max-w-[1000px] sm:h-auto lg:p-8 bg-white rounded-lg shadow-xl gap-4">
        <form onSubmit={(e) => type === 'add' ? addProduct(e) : editProduct(e)} className="flex flex-col justify-between">
          <h1 className="text-3xl font-semibold">{type === 'add' ? 'Create Product' : 'Edit Product'}</h1>
          <label className="text-start font-semibold text-xl">
            Image:
            <input
              type="file"
              name="image"
              value={image.name}
              className="border rounded-lg w-full p-2"
              onChange={handleImage}
            />
          </label>
          <label className="text-start font-semibold text-xl">
            Name:
            <input
              type="text"
              name="name"
              value={properties?.name}
              className="border rounded-lg w-full p-2"
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </label>
          <label className="text-start font-semibold text-xl">
            Price:
            <input
              type="number"
              name="price"
              value={properties?.price}
              step={5}
              min={0}
              className="border rounded-lg w-full p-2"
              onChange={(e) => handleChange('price', Number(e.target.value))}
            />
          </label>
          <label className="text-start font-semibold text-xl">
            Category:
            <select
              value={properties.category}
              className="w-full border rounded-lg p-2"
              name="category"
              onChange={(e) => handleChange('category', e.target.value)}
            >
              {
                categories?.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))
              }
            </select>
          </label>
          <label className="text-start font-semibold text-xl">
            Description:
            <textarea
              className="w-full border rounded-lg p-2"
              name="description"
              cols={25} rows={3}
              value={properties.description}
              onChange={(e) => handleChange('description', e.target.value)}
            ></textarea>
          </label>
          <label className="text-start font-semibold text-xl">
            Ingredients:
            <textarea
              className="w-full border rounded-lg p-2"
              name="ingredients"
              cols={25} rows={3}
              value={properties.ingredients}
              onChange={handleIngredients}
            ></textarea>
          </label>
          <div className="flex gap-2 font-semibold">
            <button className="text-white bg-mainRed rounded-lg py-2 px-4 w-full">{type === 'add' ? 'Create' : 'Save'}</button>
            <button className="text-mainRed border-2 border-mainRed py-2 px-4 rounded-lg w-full">Reset</button>
          </div>
        </form>
        <Preview properties={properties} image={image} />
      </div>
    </div>
  )
}

const Preview = ({ properties, image }: { properties: ProductProps, image: any }) => {
  return (
    <div className="border-l pl-4 w-full md:w-[500px]">
      <div className='h-auto rounded-lg group flex flex-col justify-between border-[3px] border-mainRed w-full'>
        <div className='px-8 py-4 xl:py-8'>
          {
            image ?
              <Image
                className='mx-auto w-full'
                alt={properties.name}
                width={500}
                height={500}
                src={image}
              />
              :
              <div className="w-full h-[400px] border-2 border-mainRed" />
          }
        </div>
        <div className='px-4 pb-8 text-center'>
          <h3 className='text-mainRed text-4xl text-center font-semibold' >{properties.name}</h3>
          <p className='text-mainRed text-xl font-medium mt-4' >{properties?.description}</p>
          <p className='text-6xl text-mainRed font-semibold my-8'>${properties.price}</p>
          <button className="py-2 px-4 bg-mainRed rounded-lg text-white">Add to Cart</button>
        </div>
      </div>
    </div>
  )
};

export default ModifyProductModal;