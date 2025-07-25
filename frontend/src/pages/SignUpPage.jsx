import { motion } from "framer-motion";
import { FaTractor, FaUser, FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!isPasswordStrong) {
      toast.error("Your password is very weak. Please set a stronger password.");
      return;
    }

    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-y-auto">
      {/* Background Image Container */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Signup Card with hover effect */}
      <div className="w-full max-w-md my-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20">
            {/* Card Header */}
            <div 
              className="bg-green-600 p-6 text-center"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(5, 150, 105, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%)"
              }}
            >
              <div className="flex justify-center mb-3">
                <FaTractor className="text-4xl text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Welcome to <span className="text-white">FarmSpace</span>
              </h1>
              <p className="text-white/90 text-sm">
                Create your account to get started
              </p>
            </div>

            {/* Card Body */}
            <div className="p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white/80"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white/80"
                      placeholder="farmer@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white/80"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <PasswordStrengthMeter password={password} onStrengthChange={setIsPasswordStrong} />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ${
                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing up...
                    </div>
                  ) : (
                    'Sign Up'
                  )}
                </motion.button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/90 text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    to="/login"
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                  >
                    Login to your account
                  </Link>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-8 pb-6 text-center text-xs text-gray-500 bg-white/80">
              <p>By continuing, you agree to our <Link to="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>.</p>
            </div>
          </div>
        </motion.div>

        {/* Back to Home with arrow - consistent with login page */}
        <div className="w-full flex justify-center mt-4">
          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-green-500 hover:text-green-600 hover:underline transition-colors"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;