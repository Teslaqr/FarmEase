import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <span className="ml-3 text-white text-xl font-bold">Agri-Help</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/about') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-600'}`}
            >
              About
            </Link>
            <Link 
              to="/features" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/features') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-600'}`}
            >
              Features
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-md text-sm font-medium text-green-800 bg-white hover:bg-green-100"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-500"
            >
              Sign Up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-200 hover:text-white hover:bg-green-600 focus:outline-none"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-600'}`}
            >
              About
            </Link>
            <Link 
              to="/features" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/features') ? 'bg-green-800 text-white' : 'text-green-100 hover:bg-green-600'}`}
            >
              Features
            </Link>
            <div className="pt-4 border-t border-green-600">
              <Link 
                to="/login" 
                className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-green-800 bg-white hover:bg-green-100"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block w-full text-center mt-2 px-4 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;