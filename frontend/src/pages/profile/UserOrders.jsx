import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const UserOrders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get(`/order/user-orders/${user.id}`);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <p className="text-gray-500">No orders yet 🛒</p>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded">

          <div className="flex justify-between mb-2">
            <p className="font-bold">Order ID: {order._id}</p>
            <p className="text-sm">{order.status}</p>
          </div>

          <p className="text-sm text-gray-500">
            Total: ₹ {order.totalAmount}
          </p>

          {/* 🛒 Items */}
          <div className="mt-2">
            {order.items.map((item, index) => (
              <div key={index} className="text-sm">
                {item.title} × {item.quantity} = ₹ {item.price * item.quantity}
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
};

export default UserOrders;