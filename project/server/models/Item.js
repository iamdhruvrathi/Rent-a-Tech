import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  rentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    default: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  category: {
    type: String,
    enum: ['camera', 'calculator', 'projector', 'laptop', 'tablet', 'headphones', 'other'],
    default: 'other'
  },
  condition: {
    type: String,
    enum: ['excellent', 'good', 'fair'],
    default: 'good'
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Item', itemSchema);