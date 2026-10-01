const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET all published blog posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({ published: true })
            .sort({ createdAt: -1 })
            .select('title slug summary author createdAt');
        
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

// GET a single blog post by slug
router.get('/posts/:slug', async (req, res) => {
    try {
        const post = await Post.findOne({ slug: req.params.slug, published: true });
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
});

// POST a new blog post (protected - you can add auth middleware)
router.post('/posts', async (req, res) => {
    try {
        const { title, slug, summary, content, author, published } = req.body;
        
        // Basic validation
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

// PUT update a blog post
router.put('/posts/:id', async (req, res) => {
    try {
        const { title, slug, summary, content, author, published } = req.body;
        
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                slug,
                summary,
                content,
                author,
                published,
                updatedAt: Date.now()
            },
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

// DELETE a blog post
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
