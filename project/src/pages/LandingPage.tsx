import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calculator, Projector, Shield, Clock, Users, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Secure & Trusted",
      description: "All users are verified with Aadhar authentication for safe transactions"
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Flexible Rental",
      description: "Rent for days, weeks, or months - choose what works for you"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Student Community",
      description: "Built by students, for students - helping each other succeed"
    }
  ];

  const categories = [
    { icon: <Camera className="h-12 w-12" />, name: "Cameras", count: "15+" },
    { icon: <Calculator className="h-12 w-12" />, name: "Calculators", count: "25+" },
    { icon: <Projector className="h-12 w-12" />, name: "Projectors", count: "8+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Rent Tech,{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Save Money
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The ultimate platform for college students to rent or lend technology appliances. 
              From cameras to calculators, get what you need when you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-gray-600">Discover the tech you need for your studies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center group">
                <div className="text-purple-600 group-hover:text-blue-600 transition-colors duration-300 flex justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} items available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Rent-a-Tech?</h2>
            <p className="text-gray-600">Built with students in mind</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center group">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-purple-100 mb-12">Simple steps to get started</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
              <p className="text-purple-100">Create your account as an owner or renter</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Browse or List</h3>
              <p className="text-purple-100">Find items to rent or list your own for others</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-white/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Connect & Rent</h3>
              <p className="text-purple-100">Connect with other students and start renting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Renting?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of students already saving money with Rent-a-Tech
          </p>
          <Link
            to="/signup"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 inline-flex items-center space-x-2"
          >
            <span>Join Now - It's Free</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;