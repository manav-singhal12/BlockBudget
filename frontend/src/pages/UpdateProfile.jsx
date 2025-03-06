// src/components/UpdateProfile.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../redux/api/userApiSlice";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    walletKey: [],
  });

  const [walletKeyInput, setWalletKeyInput] = useState("");
  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();

  // Pre-populate form when user data is available
  console.log(userInfo)
  // console.log(userInfo.data.user.walletKey)
  useEffect(() => {
    if (userInfo) {
      setFormData({
        fullname: userInfo.data.user.fullname || "",
        email: userInfo.data.user.email || "",
        walletKey: userInfo.data.user.walletKey || [],
      });
    }
  }, [userInfo]);

  // Handle input changes for fullname and email
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new walletKey if it doesn't exist
  const addWalletKey = (e) => {
    e.preventDefault();
    if (walletKeyInput.trim() && !formData.walletKey.includes(walletKeyInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        walletKey: [...prev.walletKey, walletKeyInput.trim()],
      }));
      setWalletKeyInput("");
    }
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Submitting Data:", formData); // Debugging step
  
      await updateProfile({
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
      }).unwrap();
      
      navigate("/dashboard"); // Navigate after successful update
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#004d40] mb-6 text-center">
          Update Profile
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error?.data?.message || "Something went wrong"}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="usename" className="block font-semibold text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>
          <div>
            <label htmlFor="fullname" className="block font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>

          {/* Wallet Key Input */}
          <div>
            <label htmlFor="walletKey" className="block font-semibold text-gray-700">
              Wallet Key
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                id="walletKey"
                name="walletKey"
                value={walletKeyInput}
                onChange={(e) => setWalletKeyInput(e.target.value)}
                placeholder="Enter a wallet key"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#004d40]"
              />
              <button onClick={addWalletKey} className="bg-[#004d40] text-white p-3 rounded-lg">
                Add
              </button>
            </div>

            <div className="mt-2">
              {formData.walletKey.map((key, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-gray-800 py-1 px-2 mr-2 mb-2 rounded"
                >
                  {key}
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#004d40] text-white rounded-lg uppercase font-semibold hover:bg-[#00332a] transition"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
