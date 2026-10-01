const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from your .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve your static frontend files (index.html, style.css, app.js) from public/
app.use(express.static(path.join(__dirname, 'public')));

// 1. Mount all backend API endpoints first
app.use('/api', require('./routes/api'));

// 2. Route to handle rendering individual full blog post pages
app.get('/posts/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'post.html'));
});

// 3. Fallback route to serve index.html for any unhandled frontend requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tech_blog';
mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Database connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});

