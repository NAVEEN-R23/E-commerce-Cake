import { useState } from "react";
import bgImage from "../images/bg1.png";

function AdminProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: "",
    discountPrice: "",
    category: "",
    subCategory: "",
    weight: "", // ✅ Added weight to state
    stock: "",
    flavors: "",
    isFeatured: false,
    isBestSeller: false,
    Eggless: false,
  });

  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "flavors") {
        data.append(key, formData[key]);
      }
    });

    // ✅ FIX flavors
    const flavorsArray = formData.flavors
      ? formData.flavors.split(",").map((f) => f.trim())
      : [];

    data.append("flavors", JSON.stringify(flavorsArray));

    // images
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    data.append("thumbnail", thumbnail);

   const res = await fetch("http://localhost:5000/products/createdata", {
  method: "POST",
  body: data,
});

const result = await res.json();

if (res.ok) {
  alert("Product created successfully!");
} else {
  alert(result.message || "Error creating product");
}
  };

  return (
    <div
      className="min-h-screen p-6 text-[#fde68a] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-[#3b2207] p-6 rounded-xl border border-[#8B6914] space-y-4"
      >
        <h2 className="text-2xl text-center">Add Product</h2>

        <input name="title" placeholder="Title" onChange={handleChange} className="input" />

        <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />

        <input name="shortDescription" placeholder="Short Description" onChange={handleChange} className="input" />

        <input name="price" type="number" placeholder="Price" onChange={handleChange} className="input" />

        <input name="discountPrice" type="number" placeholder="Discount Price" onChange={handleChange} className="input" />

        <select name="category" onChange={handleChange} className="input">
          <option value="">Select Category</option>
          <option value="Cakes">Cakes</option>
          <option value="Desserts">Desserts</option>
        </select>

        <input name="subCategory" placeholder="Sub Category" onChange={handleChange} className="input" />

        {/* ✅ Added Weight Dropdown */}
        <select name="weight" onChange={handleChange} className="input text-black">
          <option value="">Select Weight</option>
          <option value="500g">500g</option>
          <option value="1kg">1kg</option>
          <option value="2kg">2kg</option>
        </select>

        <input name="stock" type="number" placeholder="Stock" onChange={handleChange} className="input" />

        <input name="flavors" placeholder="Flavors (comma separated)" onChange={handleChange} className="input" />

        {/* Image Upload */}
        <div>
          <label>Upload Images</label>
         <input type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files))} />
        </div>

        {/* Thumbnail */}
        <div>
          <label>Thumbnail</label>
          <input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files[0])} />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-4">
          <label>
            <input type="checkbox" name="isFeatured" onChange={handleChange} /> Featured
          </label>

          <label>
            <input type="checkbox" name="isBestSeller" onChange={handleChange} /> Best Seller
          </label>

          <label>
            <input type="checkbox" name="Eggless" onChange={handleChange} /> Eggless
          </label>
        </div>

        <button className="w-full bg-[#4a2e10] border border-[#8B6914] py-2 rounded hover:border-[#fde68a]">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AdminProductForm;