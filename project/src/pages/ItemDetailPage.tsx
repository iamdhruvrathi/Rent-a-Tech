import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Calculator, Projector, Laptop, Headphones, Tablet, ShoppingCart, User, Mail, ArrowLeft } from 'lucide-react';

interface Item {
  _id: string;
  itemName: string;
  rentPrice: number;
  description: string;
  imageURL: string;
  category: string;
  condition: string;
  ownedBy: {
    name: string;
    email: string;
  };
}

const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/items/${id}`);
      const data = await response.json();
      setItem(data);
    } catch (error) {
      console.error('Error fetching item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconClass = "h-6 w-6 text-purple-600";
    switch (category) {
      case 'camera': return <Camera className={iconClass} />;
      case 'calculator': return <Calculator className={iconClass} />;
      case 'projector': return <Projector className={iconClass} />;
      case 'laptop': return <Laptop className={iconClass} />;
      case 'headphones': return <Headphones className={iconClass} />;
      case 'tablet': return <Tablet className={iconClass} />;
      default: return <Laptop className={iconClass} />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAddToCart = async () => {
    if (!user || user.role !== 'renter') {
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);
    try {
      const response = await fetch(`http://localhost:5000/api/cart/add/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Item added to cart successfully!');
      } else {
        alert(data.message || 'Failed to add item to cart');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h2>
          <button
            onClick={() => navigate('/items')}
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            ← Back to items
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={item.imageURL}
                alt={item.itemName}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {getCategoryIcon(item.category)}
                <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
                  {item.condition}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.itemName}</h1>
              
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-bold text-purple-600">₹{item.rentPrice}</span>
                <span className="text-gray-500">/day</span>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{item.ownedBy.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{item.ownedBy.email}</span>
                </div>
              </div>
            </div>

            {user?.role === 'renter' && (
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isAddingToCart
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transform hover:-translate-y-0.5'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}</span>
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  By adding to cart, you agree to our terms and conditions
                </p>
              </div>
            )}

            {!user && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-700 text-center">
                  <span
                    onClick={() => navigate('/login')}
                    className="font-semibold cursor-pointer hover:underline"
                  >
                    Sign in
                  </span>
                  {' '}to add items to your cart
                </p>
              </div>
            )}

            {user?.role === 'owner' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-700 text-center">
                  You cannot rent items as an owner. Switch to a renter account to rent items.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;