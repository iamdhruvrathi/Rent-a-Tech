import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calculator, Projector, Laptop, Headphones, Tablet } from 'lucide-react';

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

interface ItemCardProps {
  item: Item;
  showOwner?: boolean;
}

const getCategoryIcon = (category: string) => {
  const iconClass = "h-5 w-5 text-purple-600";
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

const ItemCard: React.FC<ItemCardProps> = ({ item, showOwner = true }) => {
  return (
    <Link to={`/items/${item._id}`} className="group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.imageURL}
            alt={item.itemName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
              {item.condition}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getCategoryIcon(item.category)}
              <span className="text-sm text-gray-500 capitalize">{item.category}</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-purple-600">₹{item.rentPrice}</span>
              <span className="text-sm text-gray-500">/day</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            {item.itemName}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
          
          {showOwner && (
            <div className="border-t pt-3">
              <p className="text-xs text-gray-500">
                Owner: <span className="font-medium text-gray-700">{item.ownedBy.name}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;