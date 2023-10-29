const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products/:id', productController.getProductById);
router.get('/products', productController.getProducts);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProductById);
router.delete('/products/:id', productController.removeProductById);
router.delete('/products', productController.removeAllProducts);

module.exports = router;