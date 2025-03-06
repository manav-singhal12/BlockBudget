import { useState } from "react";
import { useRegisterMutation } from "../redux/api/userApiSlice.js";
import {useNavigate} from 'react-router-dom'
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";

function Register() {
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [walletKey , setwalletKey] = useState("");
  const[image,setImage]=useState("");
  const [skillInput, setSkillInput] = useState("");

  const [register, { isLoading, error }] = useRegisterMutation(); 
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("walletKey", walletKey);
    formData.append("avatar", image); // 'image' matches Multer field name
    

    try {
      const result = await register(formData).unwrap(); // Call RTK Query mutation
      console.log("Response:", result);
      if(result){
        toast.success("user register successFully! ✅");
        navigate('/dashboard')
      }
    } catch (error) {
      let errorMessage = "register failed! ❌"; 
    
      if (error?.data) {
       
        const isHtml = typeof error.data === "string" && error.data.includes("<html");
    
        if (isHtml) {
         
          const match = error.data.match(/Error:\s(.*?)<br>/);
          if (match) {
            errorMessage = match[1]; 
          }
        } else if (error.data.message) {
          errorMessage = error.data.message; 
        }
      }
    
      toast.error(errorMessage, { position: "top-right" });
      console.error("Upload failed:", error);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#004d40] mb-6 text-center">Register</h2>

        {/* {error && <p className="text-red-600 text-center mb-4">{error}</p>} */}
        <form onSubmit={handleSubmit} className="space-y-4">


          <div>
            <label htmlFor="fullname" className="block font-semibold text-gray-700">Name</label>
            <input type="text" id="fullname" name="fullname" value={fullname} onChange={(e)=>setFullName(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>

          <div>
            <label htmlFor="username" className="block font-semibold text-gray-700">username</label>
            <input type="text" id="username" name="username" value={username} onChange={(e)=>setUserName(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>

          <div>
            <label htmlFor="profilePicture" className="block font-semibold text-gray-700">Profile Picture URL</label>
            <input type="file" id="profilePicture" name="profilePicture" onChange={handleFileChange} placeholder="enter your profile pic" className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
          </div>
          <div>
            <label htmlFor="walletKey" className="block font-semibold text-gray-700">Wallet Key</label>
            <input type="text" id="walletKey" name="walletKey" onChange={(e)=>setwalletKey(e.target.value)} placeholder="Enter your wallet Key" className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]" />
        
           
          </div>
          

          <button type="submit" className="w-full p-3 bg-[#004d40] text-white rounded-lg uppercase font-semibold hover:bg-[#00332a] transition">
            Register
          </button>

        </form>
        {isLoading && <Loader/>}

      </div>
    </div>
  );
};

export default Register;

















