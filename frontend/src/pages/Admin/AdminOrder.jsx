import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/order/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.post("/order/update-order", {
        orderId,
        status: newStatus,
      });

      // 🔄 Refresh orders after update
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6 bg-[#2e1a06] min-h-screen text-[#fde68a]">
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-[#3b2207] p-4 rounded-lg mb-4"
          >
            {/* Top Info */}
            <div className="flex justify-between mb-2">
              <p><strong>Order ID:</strong> {order._id}</p>

              {/* 🔽 STATUS DROPDOWN */}
              <select
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
                className="bg-black text-white px-2 py-1 rounded"
              >
                <option value="Placed">Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <p><strong>Total:</strong> ₹ {order.totalAmount}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>

            {/* Items */}
            <p className="mt-2 font-semibold">Items:</p>

            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm border-b border-[#8B6914] py-1"
              >
                <span>
                  {item.productId?.title} x {item.quantity}
                </span>
                <span>
                  ₹ {(item.productId?.price || 0) * item.quantity}
                </span>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;