import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trash2, ShoppingCart } from 'lucide-react';

interface CartItem {
  _id: string;
  itemName: string;
  rentPrice: number;
  description: string;
  imageURL: string;
  category: string;
  condition: string;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCartItems(cartItems.filter(item => item._id !== itemId));
      } else {
        alert('Failed to remove item from cart');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.rentPrice, 0);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your <span className="text-purple-600">Cart</span>
          </h1>
          <p className="text-gray-600">Review your selected items</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-8">Browse our items and add some to your cart</p>
            <a
              href="/items"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 inline-block"
            >
              Browse Items
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48 h-32 rounded-lg overflow-hidden">
                      <img
                        src={item.imageURL}
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{item.itemName}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                              {item.condition}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-purple-600">₹{item.rentPrice}</span>
                          <span className="text-sm text-gray-500">/day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({cartItems.length})</span>
                    <span className="font-semibold">₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold">₹0</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total (per day)</span>
                      <span className="text-2xl font-bold text-purple-600">₹{getTotalPrice()}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                  Proceed to Checkout
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-4">
                  By proceeding, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;