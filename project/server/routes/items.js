import express from 'express';
import Item from '../models/Item.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isAvailable: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.itemName = { $regex: search, $options: 'i' };
    }

    const items = await Item.find(query).populate('ownedBy', 'name email');
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('ownedBy', 'name email');
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create item (owners only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owners can add items' });
    }

    const { itemName, rentPrice, description, imageURL, category, condition } = req.body;

    const item = new Item({
      itemName,
      rentPrice,
      description,
      imageURL,
      category,
      condition,
      ownedBy: req.user.userId
    });

    await item.save();

    // Add item to user's itemsOwned
    await User.findByIdAndUpdate(req.user.userId, {
      $push: { itemsOwned: item._id }
    });

    res.status(201).json({ message: 'Item added successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update item (owner only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.ownedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own items' });
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete item (owner only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.ownedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own items' });
    }

    await Item.findByIdAndDelete(req.params.id);

    // Remove from user's itemsOwned
    await User.findByIdAndUpdate(req.user.userId, {
      $pull: { itemsOwned: req.params.id }
    });

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get owner's items
router.get('/owner/my-items', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'owner') {
      return res.status(403).json({ message: 'Only owners can access this endpoint' });
    }

    const items = await Item.find({ ownedBy: req.user.userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;