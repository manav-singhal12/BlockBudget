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
              alt={user.userName}
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg mb-6"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-500 text-white text-4xl font-bold mb-6">
              {user.userName[0]}
            </div>
          )}
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{user.userName}</h3>
          <p className="text-lg text-gray-600 flex items-center gap-2">
            <FaEnvelope className="text-blue-500" /> {user.email}
          </p>
        </div>
        {/* Details Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.batch && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg shadow">
              <FaGraduationCap className="text-blue-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Batch</p>
                <p className="text-lg font-semibold text-gray-800">{user.batch}</p>
              </div>
            </div>
          )}
          {user.role && (   
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg shadow">
              <FaUserTie className="text-green-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-semibold text-gray-800">{user.role}</p>
              </div>
            </div>
          )}
          {user.education && (
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg shadow">
              <FaGraduationCap className="text-purple-600 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">Education</p>
                <p className="text-lg font-semibold text-gray-800">{user.education}</p>
              </div>
            </div>
          )}
          {user.linkedin && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg shadow">
              <FaLinkedin className="text-blue-700 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
          {user.github && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg shadow">
              <FaGithub className="text-gray-800 text-2xl" />
              <div>
                <p className="text-sm text-gray-500">GitHub</p>
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-gray-800 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          )}
          {user.bio && (
            <div className="col-span-1 md:col-span-2 p-4 bg-yellow-50 rounded-lg shadow">
              <p className="text-sm text-gray-500">Bio</p>
              <p className="text-lg font-semibold text-gray-800">{user.bio}</p>
            </div>
          )}
          <div className="col-span-1 md:col-span-2 p-4 bg-indigo-50 rounded-lg shadow">
            <p className="text-sm text-gray-500">Skills</p>
            <p className="text-lg font-semibold text-gray-800">
              {user.skills && user.skills.length ? user.skills.join(", ") : "None"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
