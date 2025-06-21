import React from 'react';
import { Link } from 'react-router-dom';
import EquipmentCard from '../components/EquipmentCard';
import TestimonialCard from '../components/TestimonialCard';

const Home = () => {
  // Sample equipment data
  const featuredEquipment = [
    {
      id: 1,
      name: 'John Deere Tractor',
      price: 2500,
      type: 'Tractor',
      location: 'Punjab',
      rating: 4,
      reviews: 24,
      availability: 'Immediate'
    },
    {
      id: 2,
      name: 'Combine Harvester',
      price: 5000,
      type: 'Harvester',
      location: 'Haryana',
      rating: 5,
      reviews: 18,
      availability: 'Next Week'
    },
    {
      id: 3,
      name: 'Rotavator',
      price: 800,
      type: 'Soil Cultivator',
      location: 'Uttar Pradesh',
      rating: 4,
      reviews: 32,
      availability: 'Immediate'
    },
    {
      id: 4,
      name: 'Seed Drill',
      price: 1200,
      type: 'Seeding Equipment',
      location: 'Maharashtra',
      rating: 4,
      reviews: 15,
      availability: 'Tomorrow'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Farmer from Punjab',
      rating: 5,
      comment: 'Agri-Help has revolutionized how I access farming equipment. Renting instead of buying has saved me so much money!'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Equipment Owner',
      rating: 5,
      comment: 'Listing my equipment on Agri-Help was so easy. Now my machines are earning money even when I\'m not using them.'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      role: 'Farm Manager',
      rating: 4,
      comment: 'The platform connects me with reliable equipment owners quickly. Perfect for seasonal farming needs.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Revolutionizing Agriculture Equipment Rental
              </h1>
              <p className="mt-6 text-xl text-green-100 max-w-2xl">
                Connect with equipment owners and farmers for hassle-free rentals. Save costs and maximize your farming potential.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/signup" 
                  className="px-8 py-3 bg-white text-green-800 font-bold rounded-lg shadow-lg hover:bg-green-100 transition-colors text-center"
                >
                  Get Started
                </Link>
                <Link 
                  to="/features" 
                  className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How Agri-Help Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to rent or list agricultural equipment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Create an Account</h3>
              <p className="text-gray-600">
                Sign up as a farmer or equipment owner. Complete your profile to get started.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Browse or List Equipment</h3>
              <p className="text-gray-600">
                Farmers can browse available equipment. Owners can list their machinery with details.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect & Rent</h3>
              <p className="text-gray-600">
                Contact the owner, agree on terms, and rent the equipment for your farming needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Equipment</h2>
              <p className="mt-2 text-gray-600">Top-rated machinery available for rent</p>
            </div>
            <Link to="#" className="text-green-600 font-semibold hover:text-green-700">
              View All Equipment →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEquipment.map(equipment => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Agri-Help?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Benefits for both farmers and equipment owners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cost-Effective</h3>
              <p className="text-gray-600">
                Farmers save money by renting instead of purchasing expensive equipment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Community</h3>
              <p className="text-gray-600">
                Verified users and equipment with ratings and reviews for peace of mind.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Rent equipment when you need it, for as long as you need it.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Additional Income</h3>
              <p className="text-gray-600">
                Equipment owners earn passive income from underutilized machinery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Success stories from farmers and equipment owners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Farming Experience?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of farmers and equipment owners who are already benefiting from Agri-Help
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-white text-green-800 font-bold rounded-lg shadow-lg hover:bg-green-100 transition-colors"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;