import React from 'react'
import LeftSideBar from '../components/LeftSideBar'
import { useSelector } from 'react-redux'
import RightSideBar from '../components/RightSideBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Home = () => {
    const { userInfo } = useSelector(state => state.auth);
    // const user = userInfo.data.user;
    // console.log(user.username)
    return (
        // <div>

        //     <div className="flex h-screen bg-gray-100">
        //         <div className="content text-black w-[80%]">
        //             <h1>Welcome {user.username}</h1>
        //             <p>Access and manage your accounts and transactions efficiently</p>

        //             <div>Chart Work for different accounts and balances</div>
        //             <div>Recent Transactions Components</div>
        //             {/* <RightSideBar /> */}

        //         </div>

        //         {/* Main Content Area */}
        //         <div className="flex-1 p-6 overflow-y-auto">
        //             <RightSideBar />
        //         </div>
        //     </div>
        // </div>
        <div className='flex' >
            <div className="left w-[65%] ">
                <h1>Efficient and Secure<br></br>Crypto Management</h1>
            </div>
            <div className="right w-[35%]">
                <img className='w-20 h-20' src='https://t3.ftcdn.net/jpg/07/06/10/34/360_F_706103440_C4MqrdfDa2Al2xuqdPvYtxcJqeKcJGOu.jpg' />

            </div>
        </div>
    )
}

export default Home
