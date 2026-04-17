// import { useEffect, useState } from "react";

// function CustomOrderDetails() {
//   const [orders, setOrders] = useState([]);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch Orders
//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/getdata");
//       const data = await res.json();

//       setOrders(data.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // ✅ Mark as Completed (Delete)
//   const handleComplete = async (id) => {
//     const confirmDelete = window.confirm("Mark as completed?");
//     if (!confirmDelete) return;

//     try {
//       await fetch(`http://localhost:5000/api/delete/${id}`, {
//         method: "DELETE",
//       });

//       alert("Order completed!");
//       fetchOrders(); // refresh list
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   // ✅ Loading State
//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-yellow-300">
//         Loading orders...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 text-[#fde68a]">
//       <h2 className="text-2xl mb-4">Custom Orders</h2>

//       {/* ✅ Empty State */}
//       {orders.length === 0 ? (
//         <p>No orders found</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border border-[#8B6914]">
//             <thead className="bg-[#3b2207] text-white">
//               <tr>
//                 <th className="p-2">Name</th>
//                 <th>Phone</th>
//                 <th>Cake</th>
//                 <th>Flavor</th>
//                 <th>Date</th>
//                 <th>Image</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="text-center border-t">
//                   <td className="p-2">{order.name}</td>
//                   <td>{order.phone}</td>
//                   <td>
//                     {order.cakeType} ({order.cakeSize})
//                   </td>
//                   <td>{order.flavor}</td>
//                   <td>
//                     {order.deliveryDate
//                       ? new Date(order.deliveryDate).toLocaleDateString()
//                       : "-"}
//                   </td>

//                   {/* ✅ Cloudinary Image */}
//                   <td>
//                     {order.image ? (
//                       <img
//                         src={order.image}   // 🔥 FIXED
//                         alt="order"
//                         className="w-16 h-16 object-cover cursor-pointer border rounded hover:scale-105 transition"
//                         onClick={() => setSelectedImage(order.image)}
//                       />
//                     ) : (
//                       "No Image"
//                     )}
//                   </td>

//                   {/* ✅ Action */}
//                   <td>
//                     <button
//                       onClick={() => handleComplete(order._id)}
//                       className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-white"
//                     >
//                       Completed
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ✅ 🔥 Image Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//           onClick={() => setSelectedImage(null)}
//         >
//           <img
//             src={selectedImage}
//             alt="Preview"
//             className="max-w-[90%] max-h-[90%] rounded shadow-lg"
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default CustomOrderDetails;
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

function CustomOrderDetails() {
  const [orders, setOrders] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/api/getdata");
      const data = await res.json();
      setOrders(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleComplete = async (id) => {
    if (!window.confirm("Mark this order as completed?")) return;

    try {
      await axiosInstance.delete(`/api/delete/${id}`);

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  // 🔄 Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-800">
      <h2 className="text-3xl font-semibold mb-6">Custom Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center bg-white p-6 rounded shadow">
          <p className="text-gray-500">No orders available</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full">
            <thead className="bg-gray-800 text-white sticky top-0">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Cake</th>
                <th className="p-3 text-left">Flavor</th>
                <th className="p-3 text-left">Shape</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-center">Image</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{order.name}</td>
                  <td>{order.phone}</td>
                  <td>
                    {order.cakeType} ({order.cakeSize})
                  </td>
                  <td>{order.flavor}</td>
                  <td>
                    {order.shape === "Custom"
                      ? order.customShape || "Custom"
                      : order.shape}
                  </td>
                  <td>
                    {order.deliveryDate
                      ? new Date(order.deliveryDate).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* Image */}
                  <td className="text-center">
                    {order.image ? (
                      <img
                        src={order.image}
                        alt="order"
                        className="w-14 h-14 object-cover rounded cursor-pointer border hover:scale-110 transition"
                        onClick={() => setSelectedImage(order.image)}
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="text-center">
                    <button
                      onClick={() => handleComplete(order._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔥 Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow"
            >
              ✕
            </button>

            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[85vh] rounded shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomOrderDetails;