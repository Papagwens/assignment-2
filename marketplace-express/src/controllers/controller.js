

const Product = require('../models/products');
// get all products

router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// get product by ID

router.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// create a new product

router.post('/api/products', async (req, res) => {
  const product = new Product(req.body);
  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error creating product' });
  }
});

// update product by ID

router.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error updating product' });
  }
});

// remove product by ID

router.delete('/api/products/:id', async (req, res) => {
  try {
    const removedProduct = await Product.findByIdAndRemove(req.params.id);
    if (!removedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(removedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error deleting product' });
  }
});

// remove all products

router.delete('/api/products', async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    res.json({ message: `Deleted ${result.deletedCount} products` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting all products' });
  }
});

// find all products with kw

router.get('/api/products/search/:keyword', async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products with keyword' });
  }
});

module.exports = router;