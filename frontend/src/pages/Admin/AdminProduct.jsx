// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [selectedSub, setSelectedSub] = useState("All");
//   const [showModal, setShowModal] = useState(false);
//   const [editData, setEditData] = useState(null);

//   // 🔄 Fetch Products
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/products/getdata");
//       setProducts(res.data.data);
//       setFiltered(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // 🗑️ Delete Product
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/products/delete/${id}`);
//       fetchProducts();
//       alert("Product deleted");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ✏️ Edit Product (basic)
// const handleEdit = (product) => {
//   setEditData(product);
//   setShowModal(true);
// };
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setEditData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

//   // 📂 Filter by subcategory
//   const handleFilter = (sub) => {
//     setSelectedSub(sub);
//     if (sub === "All") {
//       setFiltered(products);
//     } else {
//       const data = products.filter((p) => p.subCategory === sub);
//       setFiltered(data);
//     }
//   };

//   const handleUpdate = async () => {
//   try {
//     const formData = new FormData();

//     formData.append("title", editData.title);
//     formData.append("price", editData.price);
//     formData.append("category", editData.category);
//     formData.append("stock", editData.stock);

//     await axios.put(
//       `http://localhost:5000/products/update/${editData._id}`,
//       formData
//     );

//     alert("Product updated ✅");
//     setShowModal(false);
//     fetchProducts();

//   } catch (err) {
//     console.log(err);
//   }
// };

//   // 🧠 Unique subcategories
//   const subCategories = ["All", ...new Set(products.map(p => p.subCategory))];

// return (
//   <div className="flex min-h-screen bg-[#3b250f] text-[#fde68a]">

//     {/* 📂 Sidebar */}
//     <div className="w-64 bg-[#4a2e10] p-4 border-r border-[#8B6914]">
//       <h2 className="text-xl font-bold mb-4">Sub Categories</h2>
//       {subCategories.map((sub, i) => (
//         <div
//           key={i}
//           onClick={() => handleFilter(sub)}
//           className={`p-2 rounded cursor-pointer mb-2 ${
//             selectedSub === sub ? "bg-[#8B6914]" : "hover:bg-[#5a3a14]"
//           }`}
//         >
//           {sub || "Uncategorized"}
//         </div>
//       ))}
//     </div>

//     {/* 📊 Table Section */}
//     <div className="flex-1 p-6">
//       <h1 className="text-2xl font-bold mb-4">Products</h1>

//       <div className="overflow-x-auto">
//         <table className="w-full border border-[#8B6914]">
          
//           <thead className="bg-[#4a2e10]">
//             <tr>
//               <th className="p-2 border">Image</th>
//               <th className="p-2 border">Title</th>
//               <th className="p-2 border">Category</th>
//               <th className="p-2 border">Price</th>
//               <th className="p-2 border">Stock</th>
//               <th className="p-2 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filtered.map((product) => (
//               <tr key={product._id} className="text-center">

//                 {/* 🖼️ Image */}
//                 <td className="p-2 border">
//                   <img
//                     src={`http://localhost:5000/uploads/${product.thumbnail}`}
//                     alt={product.title}
//                     className="w-16 h-16 object-cover mx-auto rounded"
//                   />
//                 </td>

//                 {/* 📦 Data */}
//                 <td className="p-2 border">{product.title}</td>
//                 <td className="p-2 border">{product.category}</td>
//                 <td className="p-2 border">₹{product.price}</td>
//                 <td className="p-2 border">{product.stock}</td>

//                 {/* ⚙️ Actions */}
//                 <td className="p-2 border  justify-center">
//                   <button
//                     onClick={() => handleEdit(product)}
//                     className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="bg-red-600 px-3 py-1 ml-2 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>

//     {/* ✏️ Edit Modal */}
//     {showModal && editData && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        
//         <div className="bg-[#4a2e10] p-6 rounded w-96 border border-[#8B6914] shadow-lg">
//           <h2 className="text-xl mb-4 font-bold">Edit Product</h2>

//           {/* Title */}
//           <input
//             type="text"
//             name="title"
//             value={editData.title}
//             onChange={handleChange}
//             className="input mb-2"
//             placeholder="Title"
//           />

//           {/* Price */}
//           <input
//             type="number"
//             name="price"
//             value={editData.price}
//             onChange={handleChange}
//             className="input mb-2"
//             placeholder="Price"
//           />

//           {/* Category */}
//           <input
//             type="text"
//             name="category"
//             value={editData.category}
//             onChange={handleChange}
//             className="input mb-2"
//             placeholder="Category"
//           />

//           {/* Stock */}
//           <input
//             type="number"
//             name="stock"
//             value={editData.stock}
//             onChange={handleChange}
//             className="input mb-4"
//             placeholder="Stock"
//           />

//           {/* Buttons */}
//           <div className="flex justify-between">
//             <button
//               onClick={() => setShowModal(false)}
//               className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-600"
//             >
//               Cancel
//             </button>

//             <button
//               onClick={handleUpdate}
//               className="bg-[#8B6914] px-3 py-1 rounded hover:bg-[#fde68a] hover:text-black"
//             >
//               Update
//             </button>
//           </div>

//         </div>
//       </div>
//     )}

//   </div>
// );
// };

// export default AdminProducts;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedSub, setSelectedSub] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔄 Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products/getdata");
      setProducts(res.data.data);
      setFiltered(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch products ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑️ Delete Product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/products/delete/${id}`);
      alert("Product deleted ✅");
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  // ✏️ Open Edit Modal
  const handleEdit = (product) => {
    setEditData(product);
    setShowModal(true);
  };

  // ✏️ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔄 Update Product
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/products/update/${editData._id}`,
        editData
      );

      alert("Product updated ✅");
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  // 📂 Filter by subcategory
  const handleFilter = (sub) => {
    setSelectedSub(sub);
    if (sub === "All") {
      setFiltered(products);
    } else {
      const data = products.filter(
        (p) => (p.subCategory || "Uncategorized") === sub
      );
      setFiltered(data);
    }
  };

  // 🧠 Unique subcategories
  const subCategories = [
    "All",
    ...new Set(products.map((p) => p.subCategory || "Uncategorized")),
  ];

  return (
    <div className="flex min-h-screen bg-[#3b250f] text-[#fde68a]">

      {/* 📂 Sidebar */}
      <div className="w-64 bg-[#4a2e10] p-4 border-r border-[#8B6914]">
        <h2 className="text-xl font-bold mb-4">Sub Categories</h2>
        {subCategories.map((sub, i) => (
          <div
            key={i}
            onClick={() => handleFilter(sub)}
            className={`p-2 rounded cursor-pointer mb-2 ${
              selectedSub === sub
                ? "bg-[#8B6914]"
                : "hover:bg-[#5a3a14]"
            }`}
          >
            {sub}
          </div>
        ))}
      </div>

      {/* 📊 Table Section */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-[#8B6914]">
            <thead className="bg-[#4a2e10]">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Stock</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((product) => (
                <tr key={product._id} className="text-center">

                  {/* 🖼️ Image */}
                  <td className="p-2 border">
                    <img
                      src={
                        product.thumbnail?.url ||
                        "https://via.placeholder.com/100"
                      }
                      alt={product.title}
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  </td>

                  {/* 📦 Data */}
                  <td className="p-2 border">{product.title}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">₹{product.price}</td>
                  <td className="p-2 border">{product.stock}</td>

                  {/* ⚙️ Actions */}
                  <td className="p-2 border  justify-center gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-600 px-3 py-1 rounded mr-2 hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✏️ Edit Modal */}
      {showModal && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#4a2e10] p-6 rounded w-96 border border-[#8B6914] shadow-lg">
            <h2 className="text-xl mb-4 font-bold">Edit Product</h2>

            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="input mb-2"
              placeholder="Title"
            />

            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleChange}
              className="input mb-2"
              placeholder="Price"
            />

            <input
              type="text"
              name="category"
              value={editData.category}
              onChange={handleChange}
              className="input mb-2"
              placeholder="Category"
            />

            <input
              type="number"
              name="stock"
              value={editData.stock}
              onChange={handleChange}
              className="input mb-4"
              placeholder="Stock"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="bg-[#8B6914] px-3 py-1 rounded hover:bg-[#fde68a] hover:text-black"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;