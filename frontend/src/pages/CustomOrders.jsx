import { useState , useRef} from "react";

function CustomOrder() {

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    cakeType: "",
    cakeSize: "",
    eggType: "",   
    customSize: "",
    tierCount: "",
    flavor: "",
    customFlavor: "",
    shape: "",
    customShape: "",
    message: "",
    deliveryDate: "",
    address: "",
    instructions: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const removeImage = () => {
    setImage(null);
    setPreview("");
  
    if (fileInputRef.current) {
      fileInputRef.current.value = null;   // reset file input
    }
  };

  const handleChange = (e) => {

    if (e.target.name === "phone") {
      const onlyNums = e.target.value.replace(/\D/g, "");
      if (onlyNums.length <= 10) {
        setFormData({ ...formData, phone: onlyNums });
      }
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {

    if (!formData.name.trim()) return alert("Name is required");

    if (formData.phone.length !== 10)
      return alert("Phone number must be 10 digits");

    if (!formData.cakeType) return alert("Select cake type");

    if (!formData.cakeSize) return alert("Select cake size");

    if (formData.cakeSize === "Custom" && !formData.customSize)
      return alert("Enter custom cake size");

    if (!formData.eggType)
      return alert("Please select Egg or Eggless");

    if (!formData.flavor) return alert("Select flavor");

    if (formData.flavor === "Other" && !formData.customFlavor)
      return alert("Enter custom flavor");

    if (!formData.shape) return alert("Select cake shape");

    if (formData.shape === "Custom" && !formData.customShape)
      return alert("Enter custom shape");

    if (!formData.deliveryDate)
      return alert("Select delivery date");

    const today = new Date().toISOString().split("T")[0];

    if (formData.deliveryDate < today)
      return alert("Delivery date cannot be in the past");

    if (!formData.address.trim())
      return alert("Delivery address is required");
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {
      const res = await fetch("http://localhost:5000/api/custom-order", {
        method: "POST",
        body: data
      });

      if (res.ok) {
        alert("Custom order submitted successfully!");
      }

    } catch (error) {
      console.log(error);
      alert("Order failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-6 text-center">
        Custom Cake Order
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        {/* Event Type */}
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Event</option>
          <option>Birthday</option>
          <option>Wedding</option>
          <option>Anniversary</option>
          <option>Baby Shower</option>
          <option>Corporate</option>
          <option>Other</option>
        </select>

        {/* Cake Type */}
        <select
          name="cakeType"
          value={formData.cakeType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Cake Type</option>
          <option>Normal Cake</option>
          <option>Bento Cake</option>
          <option>Photo Cake</option>
          <option>Fondant Cake</option>
          <option>Tier Cake</option>
          <option>Wedding Cake</option>
        </select>

        {/* Tier Count */}
        {formData.cakeType === "Tier Cake" && (
          <select
            name="tierCount"
            value={formData.tierCount}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="">Select Tier</option>
            <option value="2">2 Tier</option>
            <option value="3">3 Tier</option>
            <option value="4">4 Tier</option>
          </select>
        )}

        {/* Cake Size */}
        <select
          name="cakeSize"
          value={formData.cakeSize}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Cake Size</option>
          <option>0.5kg</option>
          <option>1kg</option>
          <option>2kg</option>
          <option>3kg</option>
          <option>4kg</option>
          <option>5kg</option>
          <option value="Custom">Custom Size</option>
        </select>

        {formData.cakeSize === "Custom" && (
          <input
            type="text"
            name="customSize"
            placeholder="Enter custom size (ex: 6kg)"
            value={formData.customSize}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        )}

        {/* Egg Option */}
        <div className="border p-3 rounded">
          <p className=" mb-2">Cake Base</p>

          <label className="mr-4">
            <input
              type="radio"
              name="eggType"
              value="Egg"
              onChange={handleChange}
              checked={formData.eggType === "Egg"}
            />
            <span className="ml-2">Egg</span>
          </label>

          <label>
            <input
              type="radio"
              name="eggType"
              value="Eggless"
              onChange={handleChange}
              checked={formData.eggType === "Eggless"}
            />
            <span className="ml-2">Eggless</span>
          </label>
        </div>

        {/* Flavor */}
        <select
          name="flavor"
          value={formData.flavor}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Flavor</option>
          <option>Chocolate</option>
          <option>Vanilla</option>
          <option>Red Velvet</option>
          <option>Black Forest</option>
          <option>Butterscotch</option>
          <option>Strawberry</option>
          <option value="Other">Other</option>
        </select>

        {formData.flavor === "Other" && (
          <input
            type="text"
            name="customFlavor"
            placeholder="Enter custom flavor"
            value={formData.customFlavor}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        )}

        {/* Shape */}
        <select
          name="shape"
          value={formData.shape}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Cake Shape</option>
          <option>Round</option>
          <option>Heart</option>
          <option>Square</option>
          <option>Rectangle</option>
          <option value="Custom">Custom Shape</option>
        </select>

        {formData.shape === "Custom" && (
          <input
            type="text"
            name="customShape"
            placeholder="Describe custom shape"
            value={formData.customShape}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        )}

        {/* Message */}
        <input
          type="text"
          name="message"
          placeholder="Cake Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Delivery Date */}
        <div>
          <label className="block mb-1 ">
            Delivery Date
          </label>

          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
        </div>


        {/* Address */}
        <textarea
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          required
        />

        {/* Instructions */}
        <textarea
          name="instructions"
          placeholder="Special Instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Image Upload */}
        <label className="block mb-1">
          Reference Cake Image (optional)
        </label>

        <input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  onChange={handleImage}
  className="w-full border p-2 rounded"
/>

        {preview && (
          <div className="mt-3">
            <p className="text-sm text-gray-500 mb-1">
              Click image to remove
            </p>

            <img
              src={preview}
              alt="preview"
              onClick={removeImage}
              className="w-40 rounded cursor-pointer hover:opacity-80"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#3b2207] text-white p-3 rounded hover:bg-[#3b2207]"
        >
          Submit Custom Order
        </button>

      </form>
    </div>
  );
}

export default CustomOrder;