// src/components/UpdateProfile.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../redux/api/userApiSlice';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const {userInfo} =useSelector(state=>state.auth)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: '',
    role: '',
    profilePicture: '',
    education: '',
    bio: '',
    linkedin: '',
    github: '',
    skills: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [error, setError] = useState('');
  const [updateProfile , {isLoading}]= useUpdateProfileMutation();

  // Pre-populate form when user data is available
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        batch: userInfo.batch || '',
        role: userInfo.role || '',
        profilePicture: userInfo.profilePicture || '',
        education: userInfo.education || '',
        bio: userInfo.bio || '',
        linkedin: userInfo.linkedin || '',
        github: userInfo.github || '',
        skills: userInfo.skills || [],
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your context's updateProfile method (implement this in your AuthContext)
    updateProfile(formData);
    // Optionally, navigate to the profile dashboard after updating
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0f2f1] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-[#004d40] mb-6 text-center">
          Update Profile
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
          <div>
            <label htmlFor="batch" className="block font-semibold text-gray-700">
              Batch
            </label>
            <input
              type="text"
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>
          <div>
            <label htmlFor="role" className="block font-semibold text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            >
              <option value="">Select Role</option>
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="profilePicture"
              className="block font-semibold text-gray-700"
            >
              Profile Picture URL
            </label>
            <input
              type="url"
              id="profilePicture"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>
          <div>
            <label
              htmlFor="education"
              className="block font-semibold text-gray-700"
            >
              Education
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block font-semibold text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="linkedin"
              className="block font-semibold text-gray-700"
            >
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>
          <div>
            <label
              htmlFor="github"
              className="block font-semibold text-gray-700"
            >
              GitHub URL
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg mt-1 focus:outline-none focus:border-[#004d40]"
            />
          </div>
          <div>
            <label htmlFor="skills" className="block font-semibold text-gray-700">
              Skills
            </label>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                id="skills"
                name="skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter a skill"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#004d40]"
              />
              <button onClick={addSkill} className="bg-[#004d40] text-white p-3 rounded-lg">
                Add
              </button>
            </div>
            <div className="mt-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 text-gray-800 py-1 px-2 mr-2 mb-2 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#004d40] text-white rounded-lg uppercase font-semibold hover:bg-[#00332a] transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
