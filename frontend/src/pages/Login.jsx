import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../redux/api/userApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/auth/authSlice.js";
import { useEffect } from "react";
import {toast} from 'react-toastify'
import Loader from '../components/Loader.jsx'
export default function Login() {
    

const {userInfo} = useSelector((state)=>(state.auth))
const navigate = useNavigate();
const [username , setusername]=useState("")
const [password , setPassword]=useState("")
const [loginApiCall ,{isLoading}] = useLoginMutation()
const dispatch = useDispatch()

  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await loginApiCall({ username, password }).unwrap();
      if(res){
        // localStorage.setItem('accessToken', res.accessToken);
        // localStorage.setItem('refreshToken', res.refreshToken);

        toast.success("Login successFully! ✅");
        dispatch(setCredentials(res));
        navigate('/dashboard')
      }
      // dispatch(setCredentials(res));
      // navigate("/getCurrentUser");
    } catch (error) {
     let errorMessage = "Login failed! ❌"; 
    
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
    
      // toast.error(errorMessage, { position: "top-right" });  
    
      console.log("Something went wrong while sending data to API: ", error);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-[#004d40] mb-6 text-center">Login</h2>
        {/* {error && <p className="text-red-600 text-center mb-4">{error}</p>} */}


        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="username" className="block font-semibold text-gray-700">Username</label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={(e)=>(setusername(e.target.value))}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>(setPassword(e.target.value))}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>



          <button
            type="submit"
            className="w-full p-3 bg-[#004d40] text-white rounded-lg uppercase font-semibold hover:bg-[#00332a] transition"
          >
            Login
          </button>


        </form>

        <p className="mt-4 text-gray-600 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#004d40] font-semibold hover:underline">
            Register
          </Link>
        </p>


      </div>
      {isLoading && <Loader/>}
    </div>
  );
};

