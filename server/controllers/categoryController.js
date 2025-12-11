const Category = require('../models/Category');

// Get all categories for a user
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.user.id })
      .sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check user owns category
    if (category.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { name, type, icon, color } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({
      user: req.user.user.id,
      name: name
    });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({
      user: req.user.user.id,
      name,
      type,
      icon,
      color
    });

    await category.save();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check user owns category
    if (category.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { name, type, icon, color } = req.body;

    category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, type, icon, color },
      { new: true }
    );

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check user owns category
    if (category.user.toString() !== req.user.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Check if it's a default category
    if (category.isDefault) {
      return res.status(400).json({ message: 'Cannot delete default category' });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get categories by type
exports.getCategoriesByType = async (req, res) => {
  try {
    const { type } = req.params;

    const categories = await Category.find({
      user: req.user.user.id,
      type: type
    }).sort({ name: 1 });

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
