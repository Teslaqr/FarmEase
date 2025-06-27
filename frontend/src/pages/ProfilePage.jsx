import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { FiUser, FiMail, FiPhone, FiMapPin, FiHome, FiTruck, FiDollarSign, FiEdit2, FiSave } from 'react-icons/fi';
import defaultProfileImage from './profilePic.png';

const ProfilePage = () => {
    const { user, updateProfile, getProfile } = useAuthStore();
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        profileImage: defaultProfileImage,
        phoneNumber: '',
        farmLocation: '',
        farmSize: '',
        equipmentOwned: '',
        yearsExperience: '',
        bio: ''
    });

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                profileImage: user.additionalFields?.profileImage || defaultProfileImage,
                phoneNumber: user.additionalFields?.phoneNumber || '',
                farmLocation: user.additionalFields?.farmLocation || '',
                farmSize: user.additionalFields?.farmSize || '',
                equipmentOwned: user.additionalFields?.equipmentOwned || '',
                yearsExperience: user.additionalFields?.yearsExperience || '',
                bio: user.additionalFields?.bio || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const { name, phoneNumber, farmLocation, farmSize } = formData;
        
        if (!name) {
            alert('Please enter your name');
            return false;
        }
        
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(phoneNumber)) {
            alert('Please enter a valid 10-digit phone number');
            return false;
        }
        
        if (!farmLocation) {
            alert('Please enter your farm location');
            return false;
        }
        
        if (!farmSize || isNaN(farmSize)) {
            alert('Please enter a valid farm size');
            return false;
        }
        
        return true;
    };

    const handleSave = async () => {
        if (validateForm()) {
            try {
                // Send flattened structure instead of nested additionalFields
                await updateProfile({
                    name: formData.name,
                    profileImage: formData.profileImage,
                    phoneNumber: formData.phoneNumber,
                    farmLocation: formData.farmLocation,
                    farmSize: formData.farmSize,
                    equipmentOwned: formData.equipmentOwned,
                    yearsExperience: formData.yearsExperience,
                    bio: formData.bio
                });
                // Refresh profile data
                await getProfile();
                setIsEditable(false);
                alert('Profile updated successfully!');
            } catch (error) {
                console.error('Error updating profile:', error);
                alert('Failed to update profile');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-center">
                        <h1 className="text-3xl font-bold text-white">Farmer Profile</h1>
                    </div>

                    <div className="p-8">
                        <div className="flex flex-col items-center mb-8">
                            <label htmlFor="profileImageUpload" className="cursor-pointer">
                                <img
                                    src={formData.profileImage}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                {isEditable && (
                                    <div className="mt-2 text-sm text-emerald-600">Click to change photo</div>
                                )}
                            </label>
                            {isEditable && (
                                <input
                                    type="file"
                                    id="profileImageUpload"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className={`flex items-center border ${isEditable ? 'border-emerald-300' : 'border-gray-300'} rounded-lg p-3 ${isEditable ? 'bg-white' : 'bg-gray-50'}`}>
                                <FiUser className="text-emerald-600 mr-3 text-xl" />
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-500">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full mt-1 ${isEditable ? 'bg-white' : 'bg-transparent'} focus:outline-none`}
                                        readOnly={!isEditable}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-center border border-gray-300 rounded-lg p-3 bg-gray-100">
                                <FiMail className="text-emerald-600 mr-3 text-xl" />
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-500">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        className="w-full mt-1 bg-transparent focus:outline-none cursor-not-allowed"
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div className={`flex items-center border ${isEditable ? 'border-emerald-300' : 'border-gray-300'} rounded-lg p-3 ${isEditable ? 'bg-white' : 'bg-gray-50'}`}>
                                <FiPhone className="text-emerald-600 mr-3 text-xl" />
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-500">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        className={`w-full mt-1 ${isEditable ? 'bg-white' : 'bg-transparent'} focus:outline-none`}
                                        readOnly={!isEditable}
                                        placeholder="10-digit number"
                                    />
                                </div>
                            </div>

                            {/* Farm Location */}
                            <div className={`flex items-center border ${isEditable ? 'border-emerald-300' : 'border-gray-300'} rounded-lg p-3 ${isEditable ? 'bg-white' : 'bg-gray-50'}`}>
                                <FiMapPin className="text-emerald-600 mr-3 text-xl" />
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-500">Farm Location</label>
                                    <input
                                        type="text"
                                        name="farmLocation"
                                        value={formData.farmLocation}
                                        onChange={handleInputChange}
                                        className={`w-full mt-1 ${isEditable ? 'bg-white' : 'bg-transparent'} focus:outline-none`}
                                        readOnly={!isEditable}
                                        placeholder="Address or coordinates"
                                    />
                                </div>
                            </div>

                            {/* Farm Size */}
                            <div className={`flex items-center border ${isEditable ? 'border-emerald-300' : 'border-gray-300'} rounded-lg p-3 ${isEditable ? 'bg-white' : 'bg-gray-50'}`}>
                                <FiHome className="text-emerald-600 mr-3 text-xl" />
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-500">Farm Size (acres)</label>
                                    <input
                                        type="number"
                                        name="farmSize"
                                        value={formData.farmSize}
                                        onChange={handleInputChange}
                                        className={`w-full mt-1 ${isEditable ? 'bg-white' : 'bg-transparent'} focus:outline-none`}
                                        readOnly={!isEditable}
                                    />
                                </div>
                            </div>

                            {/* Equipment Owned */}
                            <div className={`flex items-center border ${isEditable ? 'border-emerald-300' : 'border-gray-300'} rounded-lg p-3 ${isEditable ? 'bg-white' : 'bg-gray-50'}`}>
                                <FiTruck className="text-emerald-600 mr-3 text-xl" />
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-500">Equipment Owned</label>
                                    <input
                                        type="text"
                                        name="equipmentOwned"
                                        value={formData.equipmentOwned}
                                        onChange={handleInputChange}
                                        className={`w-full mt-1 ${isEditable ? 'bg-white' : 'bg-transparent'} focus:outline-none`}
                                        readOnly={!isEditable}
                                        placeholder="Tractors, harvesters, etc."
                                    />
                                </div>
                            </div>

                            {/* Years of Experience */}
                            <div className={`flex items-center border ${isEditable ? 'border-emerald-300' : 'border-gray-300'} rounded-lg p-3 ${isEditable ? 'bg-white' : 'bg-gray-50'}`}>
                                <FiDollarSign className="text-emerald-600 mr-3 text-xl" />
                                <div className="flex-1">
                                    <label className="block text-sm text-gray-500">Years of Experience</label>
                                    <input
                                        type="number"
                                        name="yearsExperience"
                                        value={formData.yearsExperience}
                                        onChange={handleInputChange}
                                        className={`w-full mt-1 ${isEditable ? 'bg-white' : 'bg-transparent'} focus:outline-none`}
                                        readOnly={!isEditable}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mt-6">
                            <label className="block text-gray-700 font-medium mb-2">About Your Farm</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 border ${isEditable ? 'border-emerald-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                                    isEditable ? 'bg-white' : 'bg-gray-100'
                                }`}
                                rows="4"
                                placeholder="Describe your farming practices, crops, etc."
                                readOnly={!isEditable}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex justify-center space-x-4">
                            {isEditable ? (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center hover:from-green-600 hover:to-emerald-700"
                                    >
                                        <FiSave className="mr-2" />
                                        Save Profile
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditable(false)}
                                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsEditable(true)}
                                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center hover:from-green-600 hover:to-emerald-700"
                                >
                                    <FiEdit2 className="mr-2" />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;