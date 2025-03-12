import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useRef } from 'react'
import LogoutButton from './LogoutButton'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '../redux/api/userApiSlice'
const Navbar = () => {


    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => (state.auth))
    // console.log(userInfo);
    // let session = false;
    // useEffect(() => {
    //     if (userInfo) {
    //         session = true;
    //     }
    // }, [userInfo, navigate]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible((prev) => !prev);
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const LogoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();

            dispatch(logout());
            toast.success(" logout success")
            // navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (

        <div className='bg-[#2b2b2b] flex justify-between p-3 text-white'>
            <div className="left text-xl font-bold">BlockBudget</div>
            {userInfo ? (
                <div className=' flex flex-row' >
                    <ul className='flex gap-6'>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black bg-white p-4  text-lg font-bold transition duration-200"
                                        : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/mywallets"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black bg-white p-4  text-lg font-bold transition duration-200"
                                        : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                                }
                            >
                                My Wallets
                            </NavLink>
                        </li>
                        <li><NavLink
                            to="/transaction"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black bg-white p-4  text-lg font-bold transition duration-200"
                                    : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                            }
                        >
                            Transaction History
                        </NavLink></li>
                        <li><NavLink
                            to="/transferfunds"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black bg-white p-4  text-lg font-bold transition duration-200"
                                    : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                            }
                        >
                            Transfer Funds
                        </NavLink></li>
                        {/* <li><NavLink
                            to="/connectwallet"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-black bg-white p-4  text-lg font-bold transition duration-200"
                                    : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                            }
                        >
                            Connect Wallet
                        </NavLink></li> */}

                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 text-white focus:outline-none"
                            >
                                {userInfo.data.user.avatar ? (
                                    <img
                                        src={userInfo.data.user.avatar}
                                        alt="Profile"
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                        <span className="text-lg text-gray-800">
                                            {userInfo.data.user.userName[0]}
                                        </span>
                                    </div>
                                )}
                                <span className="hidden sm:block">
                                    {userInfo.data.user.userName}
                                </span>
                            </button>
                            {dropdownVisible && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-0 mt-2 w-80 bg-[#2b2b2b] text-white border border-gray-200 rounded-lg shadow-xl z-20 transition transform origin-top-right"
                                >
                                    <div className="p-4 border-b border-gray-200">
                                        <div className="flex items-center space-x-3">
                                            {userInfo.data.user.avatar ? (
                                                <img
                                                    src={userInfo.data.user.avatar}
                                                    alt="Profile"
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                                    <span className="text-xl text-white">
                                                        {userInfo.data.user.username[0]}
                                                    </span>
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-bold text-white text-lg">
                                                    Hi! {userInfo.data.user.fullname}
                                                </h3>
                                                <p className="text-sm text-white">
                                                    {userInfo.data.user.email}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        
                                       
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <button
                                            onClick={() => {
                                                setDropdownVisible(false);
                                                navigate('/update-profile');
                                            }}
                                            className="w-full text-left px-4 py-2 font-semibold text-white rounded transition duration-200 hover:bg-black hover:cursor-pointer"
                                        >
                                            Update Profile
                                        </button>
                                        <button
                                            onClick={() => {
                                                setDropdownVisible(false);
                                                navigate('/dashboard');
                                            }}
                                            className="w-full text-left px-4 py-2 font-semibold text-white rounded transition duration-200 hover:bg-black hover:cursor-pointer"
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            onClick={LogoutHandler}
                                            className="w-full text-left px-4 py-2 font-semibold text-white rounded transition duration-200 hover:bg-black hover:cursor-pointer"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ul>
                </div>
            ) :
                <ul className='flex  gap-8'>
                    <li>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-50 underline text-lg font-bold transition duration-200"
                                    : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                            }
                        >
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-50 underline text-lg font-bold transition duration-200"
                                    : "text-white text-lg font-bold transition duration-200 hover:text-blue-50"
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>}
        </div>
    )
}

export default Navbar
