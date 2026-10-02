# Tech Blogsite

A complete, production-ready blog application built with Node.js, Express, MongoDB, and vanilla JavaScript. Features include a public blog with post listing, individual post pages, and a secured admin panel for content management.

## 🚀 Features

- 📝 Public blog homepage with featured posts
- 📄 Individual post pages with dynamic loading
- 🔐 Admin authentication with JWT tokens
- 📊 Admin dashboard for post management
- ✏️ Create, edit, and delete blog posts
- 📌 Publish/draft post status
- 💾 MongoDB database integration
- 🎨 Responsive and modern UI
- 🌐 Ready for production deployment

## 📦 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt, environment variables
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Render, Railway, or Heroku

## 🛠 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn
- Git

## ⚡ Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/grahamonlineedu-wq/tech-blogsite.git
cd tech-blogsite
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment file
```bash
cp .env.example .env
```

### 4. Configure your .env file
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tech_blog
JWT_SECRET=your_very_long_random_secret_key_change_this_12345
ADMIN_EMAIL=admin@techblog.com
ADMIN_PASSWORD=admin123
NODE_ENV=development
```

### 5. Start MongoDB (if local)
```bash
mongod
```

### 6. Start the application

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

### 7. Open in browser
- **Homepage**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin-panel
  - Email: admin@techblog.com
  - Password: admin123

## 🔑 Default Admin Credentials

**Email**: admin@techblog.com  
**Password**: admin123

⚠️ **Important**: Change these credentials in production!

## 📋 Project Structure

```
tech-blogsite/
├── models/
│   └── Post.js              # MongoDB Post schema
├── routes/
│   ├── api.js               # Public blog API endpoints
│   └── admin.js             # Admin authentication endpoints
├── index.html               # Homepage with blog list
├── post.html                # Individual post page
├── admin-panel.html         # Admin dashboard interface
├── app.js                   # Frontend script for homepage
├── style.css                # Global styles
├── server.js                # Express server setup
├── package.json             # Dependencies
├── .env.example             # Environment template
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🌐 API Endpoints

### Public Endpoints (No authentication required)

**Get all published posts**
```
GET /api/posts
```

**Get single post by slug**
```
GET /api/posts/:slug
```

### Admin Endpoints (JWT authentication required)

**Admin login**
```
POST /admin/login
Content-Type: application/json

{
  "email": "admin@techblog.com",
  "password": "admin123"
}
```

**Get all posts** (including drafts)
```
GET /api/admin/posts
Authorization: Bearer <JWT_TOKEN>
```

**Create new post**
```
POST /api/posts
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Post Title",
  "slug": "post-slug",
  "summary": "Brief summary",
  "content": "<p>Full HTML content</p>",
  "author": "Author Name",
  "published": true
}
```

**Update post**
```
PUT /api/posts/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Delete post**
```
DELETE /api/posts/:id
Authorization: Bearer <JWT_TOKEN>
```

## 🚀 Deployment

### Deploy to Render

1. **Create a Render account** at https://render.com
2. **Connect your GitHub repository**
3. **Create a new Web Service**
4. **Set environment variables** in Render dashboard:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_long_random_secret`
   - `ADMIN_EMAIL=your_admin_email`
   - `ADMIN_PASSWORD=your_admin_password`
   - `NODE_ENV=production`
5. **Deploy** - Render will automatically build and deploy

### Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with username and password
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/tech_blog?retryWrites=true&w=majority`
5. Use this as `MONGO_URI` in your Render environment variables

### Deploy to Heroku

1. Install Heroku CLI: `brew tap heroku/brew && brew install heroku`
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   ```
5. Deploy: `git push heroku main`

## 🔐 Security Best Practices

- ✅ Change default admin credentials immediately
- ✅ Use a strong JWT_SECRET (at least 32 characters)
- ✅ Use MongoDB Atlas with IP whitelist in production
- ✅ Enable HTTPS on your domain
- ✅ Keep dependencies updated: `npm audit fix`
- ✅ Never commit .env files with real credentials
- ✅ Use environment variables for all sensitive data

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or your Atlas connection string is correct
- Check your `MONGO_URI` in .env file
- Verify network access if using Atlas

### Admin Login Not Working
- Confirm credentials match those in .env
- Clear browser localStorage and try again
- Check browser console for error messages

### Posts Not Loading
- Verify MongoDB is connected
- Check API response in browser DevTools Network tab
- Ensure published posts exist in database

### Port Already in Use
- Change `PORT` in .env file or kill process using port 5000

## 📚 Useful Commands

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Check npm packages for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Update all packages
npm update
```

## 💡 Next Steps

1. Customize the blog design and branding
2. Add category/tag support for posts
3. Add comments functionality
4. Implement email notifications
5. Add social media sharing buttons
6. Set up analytics tracking
7. Create SEO metadata for posts

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Happy Blogging! 🚀**

Built with ❤️ by Tech Blog Team
