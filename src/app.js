console.log('project is running');
console.log('Uday_sharma');

const express = require('express');
const hbs = require('hbs');
const session = require('express-session');

const app = express();


// Body parsing middleware (for JSON and form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware — important if you use req.session in routes
app.use(session({
  secret: 'your_secret_key',     // change this to a strong secret in production
  resave: false,
  saveUninitialized: true
}));

// Serve static files from 'public' folder
app.use(express.static('public'));

// Set view engine and views directory
app.set('view engine', 'hbs');
app.set('views', 'views');

// Import models (adjust path as needed)
const { User } = require('./models/User');
const Product = require('./models/Product');

// Import routes (adjust path as needed)
const routes = require('./routers/main');












// Use routes under root path
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
