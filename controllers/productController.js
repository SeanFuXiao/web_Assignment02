const Category = require('../models/Category');
const Product = require('../models/Product');

// Controller for getting by name or get all products
exports.getProducts = async (req, res) => {
  const productName = req.query.name;

  try {
      let products;
      if (productName) {
          // If a name query parameter is present, search by name
          products = await Product.find({
              name: new RegExp(productName, 'i') // Case-insensitive search
          });
      } else {
          // If no name query parameter is present, fetch all products
          products = await Product.find();
      }
      res.json(products);
  } catch (error) {
      res.status(500).send('An error occurred while querying the database');
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
    category
  });
  console.log(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: err });
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
