import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ItemCard from '../components/ItemCard';
import { Plus, Package, Edit, Trash2 } from 'lucide-react';

interface Item {
  _id: string;
  itemName: string;
  rentPrice: number;
  description: string;
  imageURL: string;
  category: string;
  condition: string;
  isAvailable: boolean;
  ownedBy: {
    name: string;
    email: string;
  };
}

const OwnerDashboard: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/items/owner/my-items', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setItems(items.filter(item => item._id !== itemId));
        alert('Item deleted successfully');
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, <span className="text-purple-600">{user?.name}</span>
            </h1>
            <p className="text-gray-600">Manage your rental items</p>
          </div>
          <Link
            to="/add-item"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Item</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{items.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.filter(item => item.isAvailable).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <Package className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-gray-600">Rented Out</p>
                <p className="text-2xl font-bold text-gray-900">
                  {items.filter(item => !item.isAvailable).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {items.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No items yet</h3>
            <p className="text-gray-600 mb-8">Start by adding your first item for rent</p>
            <Link
              to="/add-item"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Your First Item</span>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Items</h2>
              <p className="text-gray-600">{items.length} items</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item._id} className="relative group">
                  <ItemCard item={item} showOwner={false} />
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 space-y-2">
                    <Link
                      to={`/edit-item/${item._id}`}
                      className="block bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full font-semibold">
                        Rented Out
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;