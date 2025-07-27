const express = require('express');
const router = express.Router();

const { User } = require('../models/User'); // Adjust path as needed
const Product = require('../models/Product'); // Adjust path as needed

router.get('/login', (req, res) => {
    res.render('index');
});



router.get('/marketplace', (req, res) => {
    res.render('marketplace');
});

router.get('/features', (req, res) => {
    res.render('features');
});

router.get('/testimonial', (req, res) => {
    res.render('testimonials');
});

router.get('/howitworks', (req, res) => {
    res.render('howitworks');
});






// Middleware to protect supplier routes
function isAuthenticated(req, res, next) {
    if (req.session?.user?.role === 'supplier') return next();
    return res.status(403).json({ error: 'Unauthorized' });
}

// Save new product
router.post('/api/products', isAuthenticated, async (req, res) => {
    const { name, category, price, quantity } = req.body;
    const supplierId = req.session.user.id;

    try {
        const product = await Product.create({ name, category, price, quantity, supplierId });
        res.status(201).json({ success: true, product });
    } catch (err) {
        console.error('Product save error:', err);
        res.status(500).json({ error: 'Failed to save product' });
    }
});

// Show all products (no supplier filter)
router.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json({ products });
    } catch (err) {
        console.error('Product fetch error:', err);
        res.status(500).json({ error: 'Failed to load products' });
    }
});






router.post('/api/purchase', isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (quantity < 1 || quantity > product.availableQty) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Subtract stock
    product.availableQty -= quantity;
    await product.save();

    // Simulate order confirmation
    const orderId = Math.floor(Math.random() * 1000000);
    res.json({ orderId });
  } catch (err) {
    console.error('Purchase error:', err);
    res.status(500).json({ error: 'Could not process purchase' });
  }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('❌ Logout error:', err);
            return res.status(500).send('An error occurred during logout.');
        }
        res.redirect('/login'); // Or wherever you want to redirect after logout
    });
});


// Example endpoint in your Node.js app
router.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: "Organic Tomatoes", category: "vegetable", price: 45, quantity: 50 },
        { id: 2, name: "Fresh Basil Leaves", category: "spice", price: 120, quantity: 20 },
        { id: 3, name: "Farm Fresh Milk", category: "dairy", price: 60, quantity: 30 }
    ];
    res.json(products);
});


router.get('/authmode', async (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role === 'customer') {
        res.render('home', { user });
    } else if (user.role === 'supplier') {
        res.render('supplier-dashboard', { user });
    } else {
        res.status(403).send('Unauthorized');
    }
});

router.post('/login', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await User.findOne({ where: { username, password } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Save user in session
        req.session.user = {
            id: user.id,
            username: user.username,
            role: user.role
        };

        // Respond with success JSON
        return res.json({ success: true, user: req.session.user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    console.log('📥 Received registration data:', req.body);

    try {
        const existing = await User.findOne({ where: { username } });
        if (existing) {
            return res.status(400).send('Username already exists');
        }

        const newUser = await User.create({ username, password, role });
        req.session.user = newUser;
        res.redirect('/login');
    } catch (err) {
        console.error('🔥 Registration error occurred:', err);

        if (err.name === 'SequelizeValidationError') {
            const messages = err.errors.map(e => e.message).join(', ');
            console.error('🛑 Validation errors:', messages);
            return res.status(400).send(`Validation error(s): ${messages}`);
        }

        if (err.name === 'SequelizeUniqueConstraintError') {
            console.error('🚫 Unique constraint error:', err.errors[0].message);
            return res.status(400).send(`Unique constraint error: ${err.errors[0].message}`);
        }

        if (process.env.NODE_ENV === 'development') {
            res.status(500).send(`Registration error: ${err.message}\n\nStack:\n${err.stack}`);
        } else {
            res.status(500).send('Registration error occurred, please try again later.');
        }
    }
});




router.get('/home', (req, res) => {
    res.render('home');
});

module.exports = router;
