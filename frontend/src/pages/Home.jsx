import React from 'react'
import LeftSideBar from '../components/LeftSideBar'
import { useSelector } from 'react-redux'
import RightSideBar from '../components/RightSideBar';

const Home = () => {
    const { userInfo } = useSelector(state => state.auth);
    const user = userInfo.data.user;
    console.log(user.username)
    return (
        <div>

            <div className="flex h-screen bg-gray-100">
                <div className="content text-black w-[80%]">
                    <h1>Welcome {user.username}</h1>
                    <p>Access and manage your accounts and transactions efficiently</p>

                    <div>Chart Work for different accounts and balances</div>
                    <div>Recent Transactions Components</div>
                    {/* <RightSideBar /> */}

                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <RightSideBar />
                </div>
            </div>
        </div>
    )
}

export default Home
