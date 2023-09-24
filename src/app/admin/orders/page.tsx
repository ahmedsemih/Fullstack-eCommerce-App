import AdminOrderCard from "@/components/cards/AdminOrderCard";

async function fetchOrders() {
  const res = await fetch(`${process.env.BASE_URL}/api/orders`, { cache: 'no-cache' });
  const data = await res.json();
  return data.orders;
}

const Orders = async () => {
  const orders: Order[] = await fetchOrders();

  return (
    <main>
      {
        orders ? (
          orders?.map((order) => (
            <AdminOrderCard key={order._id} order={order} />
          ))
        ) : (
          <div className="border-2 border-mainGreen rounded-lg p-4 w-full text-mainGreen text-center text-3xl mt-4">
            There is no order.
          </div>
        )
      }
    </main>
  )
}

export default Orders;