import React from 'react';
import { Link } from 'react-router-dom';
import TestimonialCard from '../components/TestimonialCard';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Amit Sharma',
      role: 'Founder & CEO',
      bio: 'Agricultural engineer with 15+ years of farming experience.'
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'CTO',
      bio: 'Tech enthusiast focused on agricultural technology solutions.'
    },
    {
      id: 3,
      name: 'Rahul Verma',
      role: 'Head of Operations',
      bio: 'Expert in farm equipment logistics and supply chain management.'
    },
    {
      id: 4,
      name: 'Neha Singh',
      role: 'Customer Success',
      bio: 'Dedicated to ensuring farmer satisfaction and platform adoption.'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sanjay Mehta',
      role: 'Large Scale Farmer, Maharashtra',
      rating: 5,
      comment: 'Agri-Help has reduced my equipment costs by 40% while maintaining productivity.'
    },
    {
      id: 2,
      name: 'Deepika Reddy',
      role: 'Equipment Owner, Andhra Pradesh',
      rating: 5,
      comment: 'My tractor now earns ₹50,000/month when not in use. A game-changer for equipment owners!'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white py-32">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              About Agri-Help
            </h1>
            <p className="mt-6 text-xl text-green-100">
              Connecting farmers with equipment owners to revolutionize agricultural practices across India.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-6">
                At Agri-Help, we're driven by a simple yet powerful vision: to make modern farming equipment accessible and affordable for every farmer in India.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                We recognized that small and medium-scale farmers often struggle to afford expensive machinery, while equipment owners face challenges in maximizing utilization of their investments. Agri-Help bridges this gap through a trusted sharing economy platform.
              </p>
              <div className="flex space-x-4">
                <Link 
                  to="/signup" 
                  className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Join Our Community
                </Link>
                <Link 
                  to="/features" 
                  className="px-6 py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition-colors"
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Impact</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering farmers and transforming agriculture across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-green-600 mb-3">5,000+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Active Farmers</h3>
              <p className="text-gray-600">
                Using Agri-Help to access equipment for their farming needs
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-green-600 mb-3">₹25 Cr+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Savings Generated</h3>
              <p className="text-gray-600">
                For farmers through affordable equipment rental
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="text-5xl font-bold text-green-600 mb-3">15,000+</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Equipment Rentals</h3>
              <p className="text-gray-600">
                Successfully completed through our platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals dedicated to transforming agriculture
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-green-600 font-medium">{member.role}</p>
                  <p className="mt-3 text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from farmers and equipment owners who use Agri-Help
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating with industry leaders to serve farmers better
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-40 h-40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the Agricultural Revolution</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Whether you're a farmer or equipment owner, Agri-Help has solutions for you
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-white text-green-800 font-bold rounded-lg shadow-lg hover:bg-green-100 transition-colors"
            >
              Sign Up Now
            </Link>
            <Link 
              to="/features" 
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-colors"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;