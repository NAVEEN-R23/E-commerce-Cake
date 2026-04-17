// pages/Address.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Address = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({});
  const [editId, setEditId] = useState(null);

  const fetchAddresses = async () => {
    const res = await axiosInstance.get("/address");
    setAddresses(res.data);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axiosInstance.put(`/address/${editId}`, form);
      } else {
        await axiosInstance.post("/address", form);
      }

      setForm({});
      setEditId(null);
      fetchAddresses();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/address/${id}`);
    fetchAddresses();
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setEditId(addr._id);
  };

  return (
    <div className="p-6">

      {/* 👤 User Info */}
      <h2 className="text-xl font-bold">{user?.name}</h2>
      <p className="text-gray-500 mb-4">{user?.email}</p>

      <h3 className="text-lg font-semibold mb-2">My Addresses</h3>

      {/* Address List */}
      <div className="grid gap-3">
        {addresses.map((addr) => (
          <div key={addr._id} className="border p-3 rounded">
            <p>{addr.house}, {addr.area}</p>
            <p>{addr.city}, {addr.state} - {addr.pincode}</p>
            <p>{addr.phone}</p>

            <div className="flex gap-3 mt-2">
              <button onClick={() => handleEdit(addr)} className="text-blue-500">
                Edit
              </button>
              <button onClick={() => handleDelete(addr._id)} className="text-red-500">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="mt-6 border p-4 rounded">
        <h4 className="font-semibold mb-2">
          {editId ? "Edit Address" : "Add Address"}
        </h4>

        <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 m-1" />
        <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2 m-1" />
        <input name="city" placeholder="City" onChange={handleChange} className="border p-2 m-1" />
        <input name="state" placeholder="State" onChange={handleChange} className="border p-2 m-1" />
        <input name="house" placeholder="House / Flat" onChange={handleChange} className="border p-2 m-1" />
        <input name="area" placeholder="Area / Street" onChange={handleChange} className="border p-2 m-1" />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 mt-2 rounded"
        >
          {editId ? "Update" : "Add Address"}
        </button>
      </div>
    </div>
  );
};

export default Address;