const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

async function ensureDefaultPosts() {
    const count = await Post.countDocuments();

    if (count > 0) return;

    const defaults = [
        {
            title: 'Getting Started with Node.js and Express',
            slug: 'getting-started-with-nodejs-and-express',
            summary: 'A beginner-friendly overview of building web apps with Node.js and Express.',
            content: '<p>Node.js and Express make it easy to build fast APIs and web applications.</p><p>You can create routes, serve static files, and connect to databases with minimal setup.</p>',
            author: 'Tech Blog Team',
            published: true
        },
        {
            title: 'MongoDB Essentials for Modern Apps',
            slug: 'mongodb-essentials-for-modern-apps',
            summary: 'Learn the fundamentals of MongoDB and when to use it for your application data model.',
            content: '<p>MongoDB stores data in flexible JSON-like documents.</p><p>This makes it a great fit for dynamic content, blog data, and product catalogs.</p>',
            author: 'Tech Blog Team',
            published: true
        },
        {
            title: 'Frontend Performance Tips That Actually Help',
            slug: 'frontend-performance-tips-that-actually-help',
            summary: 'Simple techniques to make your web pages feel faster and smoother for users.',
            content: '<p>Performance improvements often come from reducing unnecessary work, improving caching, and simplifying page structure.</p><p>Small changes can have a large impact on perceived speed.</p>',
            author: 'Tech Blog Team',
            published: true
        }
    ];

    await Post.insertMany(defaults);
}

router.get('/posts', async (req, res) => {
    try {
        await ensureDefaultPosts();

        const posts = await Post.find({ published: true })
            .sort({ createdAt: -1 })
            .select('title slug summary author createdAt')
            .lean();

        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

router.get('/posts/:slug', async (req, res) => {
    try {
        await ensureDefaultPosts();

        const post = await Post.findOne({ slug: req.params.slug, published: true }).lean();

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
});

router.post('/posts', async (req, res) => {
    try {
        const { title, slug, summary, content, author, published } = req.body;

        if (!title || !slug || !summary || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newPost = new Post({
            title,
            slug,
            summary,
            content,
            author: author || 'Admin',
            published: published !== undefined ? published : true
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

router.put('/posts/:id', async (req, res) => {
    try {
        const { title, slug, summary, content, author, published } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, slug, summary, content, author, published, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

module.exports = router;
