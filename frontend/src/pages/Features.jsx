import React from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const Features = () => {
  const farmerFeatures = [
    {
      id: 1,
      title: "Easy Equipment Search",
      description: "Find the perfect equipment with powerful search filters by type, location, price, and availability."
    },
    {
      id: 2,
      title: "Real-time Availability",
      description: "See which equipment is available right now and book instantly without waiting."
    },
    {
      id: 3,
      title: "Secure Payments",
      description: "Pay securely through our platform with multiple payment options and escrow protection."
    },
    {
      id: 4,
      title: "Ratings & Reviews",
      description: "Make informed decisions based on ratings and reviews from other farmers."
    }
  ];

  const ownerFeatures = [
    {
      id: 1,
      title: "Simple Listing",
      description: "List your equipment in minutes with our easy-to-use interface."
    },
    {
      id: 2,
      title: "Calendar Management",
      description: "Easily manage your equipment availability with our intuitive calendar system."
    },
    {
      id: 3,
      title: "Insurance Options",
      description: "Protect your equipment with our partner insurance offerings."
    },
    {
      id: 4,
      title: "Earnings Dashboard",
      description: "Track your rental income and equipment utilization with detailed analytics."
    }
  ];

  const platformFeatures = [
    {
      id: 1,
      title: "Mobile App Access",
      description: "Manage your rentals on the go with our Android and iOS apps."
    },
    {
      id: 2,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team."
    },
    {
      id: 3,
      title: "Verified Users",
      description: "All users go through verification for a trusted community."
    },
    {
      id: 4,
      title: "Maintenance Network",
      description: "Access our network of certified maintenance providers."
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
              Powerful Features for Farmers & Equipment Owners
            </h1>
            <p className="mt-6 text-xl text-green-100">
              Discover how Agri-Help simplifies equipment rental and maximizes value for everyone in the agricultural ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Farmer Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">For Farmers</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Features designed to make renting equipment simple, affordable, and reliable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {farmerFeatures.map(feature => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/signup?role=farmer" 
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            >
              Sign Up as Farmer
            </Link>
          </div>
        </div>
      </section>

      {/* Owner Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">For Equipment Owners</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Turn your underutilized equipment into a source of income
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ownerFeatures.map(feature => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link 
              to="/signup?role=owner" 
              className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 transition-colors"
            >
              List Your Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Platform Features</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a seamless rental experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map(feature => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to get started with Agri-Help
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sign Up</h3>
              <p className="text-gray-600">
                Create your account as a farmer or equipment owner. Complete your profile.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Find or List</h3>
              <p className="text-gray-600">
                Farmers search for equipment. Owners list their machinery with details.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-700">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect & Rent</h3>
              <p className="text-gray-600">
                Contact each other, agree on terms, and complete the rental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Simple & Transparent Pricing</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We only succeed when you succeed
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Farmers</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">Free</div>
                <p className="text-gray-600 mb-6">
                  Browse and rent equipment with no platform fees
                </p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No signup fees</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Unlimited equipment searches</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure payment options</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>24/7 customer support</span>
                  </li>
                </ul>
                <Link 
                  to="/signup?role=farmer" 
                  className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors block"
                >
                  Get Started
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform md:scale-105 relative">
              <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                Most Popular
              </div>
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Equipment Owners</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">10% Fee</div>
                <p className="text-gray-600 mb-6">
                  Only pay when you earn from rentals
                </p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>List unlimited equipment</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>10% commission on rentals</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free insurance options</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Priority customer support</span>
                  </li>
                </ul>
                <Link 
                  to="/signup?role=owner" 
                  className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors block"
                >
                  List Your Equipment
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Enterprises</h3>
                <div className="text-4xl font-bold text-green-600 mb-4">Custom</div>
                <p className="text-gray-600 mb-6">
                  Solutions for large farms and equipment dealers
                </p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom pricing</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Bulk equipment management</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>API integration</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom reporting</span>
                  </li>
                </ul>
                <Link 
                  to="/contact" 
                  className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors block"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about Agri-Help
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How do I rent equipment?",
                answer: "Simply sign up as a farmer, search for the equipment you need, and contact the owner directly through our platform to arrange the rental."
              },
              {
                question: "What fees do equipment owners pay?",
                answer: "Owners pay a 10% commission on each rental transaction. There are no listing fees or subscription charges."
              },
              {
                question: "Is there insurance for rented equipment?",
                answer: "Yes, we offer optional insurance coverage through our partners to protect both renters and owners during the rental period."
              },
              {
                question: "How are payments processed?",
                answer: "Payments are securely processed through our platform. Renters pay upfront, and owners receive payment after the rental period ends, minus our commission."
              },
              {
                question: "What if equipment is damaged during rental?",
                answer: "Our platform includes a damage resolution process. Renters are responsible for damages, and we provide mediation services if disputes arise."
              },
              {
                question: "Can I rent equipment for long periods?",
                answer: "Absolutely! You can rent equipment for as long as you need. Many farmers rent machinery for entire seasons."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join Agri-Help today and experience the future of agricultural equipment rental
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

export default Features;