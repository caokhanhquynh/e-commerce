import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-orange-50 to-blue-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <div className="flex items-center bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                <Zap className="h-4 w-4 mr-1" />
                Flash Sale Today
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Shop Smart,
              <span className="text-orange-500"> Save More</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Discover amazing deals on millions of products. Free shipping, easy returns, and unbeatable prices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-500 px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                View Deals
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Featured Products"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold transform rotate-12">
                50% OFF
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -left-4 top-1/2 bg-white rounded-lg shadow-lg p-3 transform -translate-y-1/2 hidden lg:block">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">2M+ Happy Customers</span>
              </div>
            </div>
            
            <div className="absolute -right-4 top-8 bg-white rounded-lg shadow-lg p-3 hidden lg:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">4.8★</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;