const Product = require('../models/Product');

// Controller for getting all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error getting products' });
  }
};

// Controller for getting a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error getting product' });
  }
};

// Controller for adding a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  const product = new Product({
    name,
    description,
    price,
    quantity,
    category,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Error adding product' });
  }
};

// Controller for updating a product by ID
exports.updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Controller for removing a product by ID
exports.removeProductById = async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!removedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(removedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error removing product' });
  }
};

// Controller for removing all products
exports.removeAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products removed' });
  } catch (err) {
    res.status(500).json({ error: 'Error removing products' });
  }
};

// Controller for finding products by name
exports.findProductsByName = async (req, res) => {
  const { name } = req.query;
  try {
    const products = await Product.find({ name: { $regex: name, $options: 'i' } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error finding products' });
  }
};