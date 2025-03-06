import React from 'react';
import { useSelector } from 'react-redux';
import { FaGraduationCap, FaUserTie, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Please log in to view your dashboard.
        </h2>
      </div>
    );
  }

  const user = userInfo.data.user;
  console.log(user)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 py-8 px-4">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">My Dashboard</h2>
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto">
        {/* Top Section: Profile Picture, Name & Email */}
        <div className="flex flex-col items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg mb-6"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-500 text-white text-4xl font-bold mb-6">
              {user.username[0]}
            </div>
          )}
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{user.username}</h3>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> {user.email}
          </p>
        </div>
        {/* Details Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2 p-4 bg-indigo-50 rounded-lg shadow">
            <p className="text-sm text-gray-500">Wallet Keys</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.walletKey && user.walletKey.length ? user.walletKey.join(", ") : "None"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
