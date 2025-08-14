import express from 'express';
import User from '../models/User.js';
import Item from '../models/Item.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Add item to cart
router.post('/add/:itemId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'renter') {
      return res.status(403).json({ message: 'Only renters can add items to cart' });
    }

    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (!item.isAvailable) {
      return res.status(400).json({ message: 'Item is not available' });
    }

    const user = await User.findById(req.user.userId);
    if (user.cartItems.includes(req.params.itemId)) {
      return res.status(400).json({ message: 'Item already in cart' });
    }

    user.cartItems.push(req.params.itemId);
    await user.save();

    res.json({ message: 'Item added to cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'renter') {
      return res.status(403).json({ message: 'Only renters can remove items from cart' });
    }

    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { cartItems: req.params.itemId }
    });

    res.json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get cart items
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'renter') {
      return res.status(403).json({ message: 'Only renters can view cart' });
    }

    const user = await User.findById(req.user.userId).populate('cartItems');
    res.json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;