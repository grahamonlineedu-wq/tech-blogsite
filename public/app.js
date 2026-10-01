document.addEventListener('DOMContentLoaded', () => {
    fetchBlogPosts();
});

// Fetch published blog posts from the Express API
async function fetchBlogPosts() {
    const postContainer = document.getElementById('blog-posts');

    // Fallback if the specific DOM container element isn't found in your HTML
    if (!postContainer) return;

    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();

        if (posts.length === 0) {
            postContainer.innerHTML = '<p class="no-posts">No blog posts found. Check back later!</p>';
            return;
        }

        // Clean container and map out the data objects into HTML layout template strings
        postContainer.innerHTML = posts.map(post => `
            <article class="post-card">
                <h2 class="post-title"><a href="/posts/${post.slug}">${post.title}</a></h2>
                <p class="post-meta">Published on ${new Date(post.createdAt).toLocaleDateString()}</p>
                <p class="post-summary">${post.summary}</p>
                <a href="/posts/${post.slug}" class="read-more">Read More &rarr;</a>
            </article>
        `).join('');

    } catch (error) {
        console.error('Error fetching blog entries:', error);
        postContainer.innerHTML = '<p class="error-msg">Failed to load blog posts. Please refresh the page.</p>';
    }
}
