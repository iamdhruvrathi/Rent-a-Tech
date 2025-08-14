import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Laptop, ShoppingCart, Plus, LayoutDashboard, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Laptop className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Rent-a-Tech
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                {user.role === 'renter' && (
                  <>
                    <Link 
                      to="/items" 
                      className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
                    >
                      Browse Items
                    </Link>
                    <Link 
                      to="/cart" 
                      className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Cart</span>
                    </Link>
                  </>
                )}
                {user.role === 'owner' && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      to="/add-item" 
                      className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Item</span>
                    </Link>
                  </>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {user && (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition-colors duration-200"
              >
                <LogOut className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;