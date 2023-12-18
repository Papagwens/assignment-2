

const express = require('express');
const router = express.Router();
const productController = require('../controllers/Controller');

router.get('/api/products', productController.allProducts);
router.get('/api/products/:id', productController.productByID);
router.post('/api/products', productController.addProduct);
router.put('/api/products/:id', productController.updateProductById);
router.delete('/api/products/:id', productController.removeProductById);
router.delete('/api/products', productController.removeAllProducts);
router.get('/api/products/search/:keyword', productController.findProductByName);

module.exports = router;
