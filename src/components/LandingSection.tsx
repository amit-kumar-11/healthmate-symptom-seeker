
import React from 'react';
import { ArrowRight, Heart, Shield, Users } from 'lucide-react';

interface LandingSectionProps {
  onStartDiagnosis: () => void;
}

const LandingSection: React.FC<LandingSectionProps> = ({ onStartDiagnosis }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="text-center lg:text-left space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              AI <span className="text-blue-600">Health</span>
              <span className="text-green-600">Mate</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Your intelligent virtual health assistant. Get instant insights about your symptoms and discover appropriate remedies with AI-powered recommendations.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-2 text-gray-700">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Trusted Advice</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium">24/7 Available</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">10k+ Users</span>
            </div>
          </div>

          <button
            onClick={onStartDiagnosis}
            className="group bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto lg:mx-0"
          >
            Start Free Diagnosis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Animated Illustration */}
        <div className="relative animate-scale-in">
          <div className="relative w-full max-w-md mx-auto">
            {/* Main Medical Icon */}
            <div className="bg-white rounded-full p-8 shadow-2xl">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-full p-12">
                <Heart className="w-24 h-24 text-blue-600 mx-auto animate-pulse" />
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
              <Shield className="w-6 h-6" />
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-bounce delay-300">
              <Users className="w-6 h-6" />
            </div>
            
            {/* Pulse Rings */}
            <div className="absolute inset-0 rounded-full bg-blue-200 opacity-20 animate-ping"></div>
            <div className="absolute inset-2 rounded-full bg-green-200 opacity-20 animate-ping delay-150"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection;
