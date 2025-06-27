import React, { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { FiUser, FiMail, FiPhone, FiMapPin, FiHome, FiTruck, FiDollarSign, FiCalendar, FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ViewProfilePage = () => {
    const { user, getProfile } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                await getProfile();
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [getProfile]);

    const profileFields = [
        { icon: <FiUser className="mr-2" />, label: 'Full Name', value: user?.name },
        { icon: <FiMail className="mr-2" />, label: 'Email', value: user?.email },
        { icon: <FiPhone className="mr-2" />, label: 'Phone Number', value: user?.additionalFields?.phoneNumber || 'Not specified' },
        { icon: <FiMapPin className="mr-2" />, label: 'Farm Location', value: user?.additionalFields?.farmLocation || 'Not specified' },
        { icon: <FiHome className="mr-2" />, label: 'Farm Size (acres)', value: user?.additionalFields?.farmSize || 'Not specified' },
        { icon: <FiTruck className="mr-2" />, label: 'Equipment Owned', value: user?.additionalFields?.equipmentOwned || 'Not specified' },
        { icon: <FiDollarSign className="mr-2" />, label: 'Years of Experience', value: user?.additionalFields?.yearsExperience || 'Not specified' },
        { icon: <FiCalendar className="mr-2" />, label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available' }
    ];

    const handleEditProfile = () => {
        navigate('/profile/edit');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-8 text-center relative">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <img
                                    src={user?.additionalFields?.profileImage || '/default-profile.png'}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/default-profile.png';
                                    }}
                                />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">{user?.name || 'User'}</h1>
                        <p className="text-emerald-100">{user?.additionalFields?.farmLocation || 'Location not specified'}</p>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                                <FiUser className="mr-2 text-emerald-600" />
                                Farmer Profile
                            </h2>
                            <button
                                onClick={handleEditProfile}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition-colors flex items-center"
                            >
                                <FiEdit2 className="mr-2" />
                                Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {profileFields.map((field, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        {field.icon}
                                        <span className="font-medium">{field.label}</span>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-800 pl-8">
                                        {field.value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Bio Section */}
                        {user?.additionalFields?.bio && (
                            <div className="mt-8 bg-gray-50 rounded-lg p-4 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">About My Farm</h3>
                                <p className="text-gray-700 whitespace-pre-line">{user.additionalFields.bio}</p>
                            </div>
                        )}

                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 focus:outline-none"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfilePage;