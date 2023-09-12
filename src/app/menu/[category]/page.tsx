import { Card } from '@/components';

async function fetchByCategory(categoryName: Category['name']) {
  const res = await fetch(`${process.env.BASE_URL}/api/products/category/${categoryName}`, { cache: "no-cache" });
  let data = await res.json();
  return data.products;
}

const Menu = async ({ params }: any) => {
  const products: Product[] = await fetchByCategory(params.category);

  return (
    <div className='text-black py-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {
        products?.map((product: Product) => {
          return (
            <Card
              key={product._id}
              product={product}
              category={params.category}
              border
            />
          )
        })
      }
    </div>
  )
}

export default Menu;