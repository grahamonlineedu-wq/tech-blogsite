const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the project root so the existing HTML/CSS/JS files work.
app.use(express.static(path.join(__dirname)));

app.use('/api', require('./routes/api'));

app.get('/posts/:slug', (req, res) => {
    res.sendFile(path.join(__dirname, 'post.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tech_blog';

mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch((err) => {
        console.error('Database connection error:', err.message);
    });

app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
