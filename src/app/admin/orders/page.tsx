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
        orders.map((order) => (
          <AdminOrderCard order={order} />
        ))
      }
    </main>
  )
}

export default Orders;