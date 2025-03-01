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

  
// useEffect(()=>{
// if(userInfo){
//     navigate('/getCurrentUser')
// }
// },[navigate , userInfo ])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await loginApiCall({ username, password }).unwrap();
      if(res){
        toast.success("Login successFully! ✅");
        navigate('/dashboard')
      }
      dispatch(setCredentials(res));
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
    
      toast.error(errorMessage, { position: "top-right" });
    
      console.log("Something went wrong while sending data to API: ", error);
    }
    
  };


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
//       <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-96 p-6 bg-white shadow-xl rounded-2xl">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
        
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e)=>(setEmail(e.target.value))}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e)=>(setPassword(e.target.value))}
//               className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
//             Login
//           </button>
//         </form>
//         <p className="text-sm text-center text-gray-600 mt-4">
//           Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
//         </p>
//       </motion.div>
//       {isLoading && <Loader/>}
//     </div>

//   );
// }

















// const Login = () => {
//   

  
//   const [formData, setFormData] = useState({ email: '', password: '' });


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = login(formData);
//     if (success) {
//       navigate('/');
//     } else {
//       setError('Invalid email or password.');
//     }
//   };

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

// export default Login;


















// // src/pages/Login.jsx
// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const success = login(formData);
//     if (success) {
//       // Redirect to the profile dashboard instead of home
//       navigate('/profile');
//     } else {
//       setError('Invalid email or password.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
//       <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold text-[#004d40] mb-6 text-center">Login</h2>
//         {error && <p className="text-red-600 text-center mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4 text-left">
//           <div>
//             <label htmlFor="email" className="block font-semibold text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block font-semibold text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full p-3 bg-[#004d40] text-white rounded-lg uppercase font-semibold hover:bg-[#00332a] transition"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-gray-600 text-center">
//           Don't have an account?{' '}
//           <Link to="/register" className="text-[#004d40] font-semibold hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
