import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";

import { ModifyButton } from "@/components";

async function fetchProducts() {
  const res = await fetch(`${process.env.BASE_URL}/api/products`, { cache: 'no-cache' });

  if (res.ok) {
    let data = await res.json();
    return data.products;
  }

  return null;
};


const Products = async () => {
  const products: Product[] | null = await fetchProducts();

  return (
    <main className="min-h-[400px]">
      <table className="table-fixed overflow-auto text-black w-full border border-mainGreen rounded-lg mt-5 border-collapse">
        <thead className="bg-mainGreen text-white">
          <tr>
            <th>
              Image
            </th>
            <th>
              Name
            </th>
            <th>
              Category
            </th>
            <th>
              Price
            </th>
            <th>
              Discount
            </th>
            <th className="py-3 text-3xl">
              <ModifyButton productId="" type="add">
                <IoMdAddCircle />
              </ModifyButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            products && (
              products?.map((product) => (
                <tr className="text-center border border-mainGreen h-28" key={product._id}>
                  <td ><Image className="flex justify-center items-center mx-auto" src={product.image} alt={product.name} width={100} height={100} /></td>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>${product.price}</td>
                  <td>{product.discountRate}%</td>
                  <td className="text-3xl text-mainGreen">
                    <ModifyButton productId={product._id} type="edit" >
                      <MdModeEdit />
                    </ModifyButton>
                    <ModifyButton productId={product._id} type="delete" >
                      <AiFillDelete />
                    </ModifyButton>
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>
    </main>
  )
}

export default Products;