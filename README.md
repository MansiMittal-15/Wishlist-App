# 🎁 Wishlist App

A modern, full-stack wishlist application built with React, Node.js, and MongoDB. Create and manage wishlists, add products with images, and invite friends to collaborate.

## 🌐 Live Demo

- **Frontend**: [https://wishlist-app-new.vercel.app](https://wishlist-app-new.vercel.app)
- **Backend API**: [https://wishlist-app-phde.onrender.com](https://wishlist-app-phde.onrender.com)

## ✨ Features

### 🎯 Core Features
- **User Authentication**: Secure login/register with JWT
- **Wishlist Management**: Create, edit, and delete wishlists
- **Product Management**: Add, edit, and remove products with images
- **Collaboration**: Invite friends via email to share wishlists
- **Real-time Updates**: Instant UI updates with Redux state management

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Image Upload**: Cloudinary integration for product images
- **Toast Notifications**: User-friendly feedback messages
- **Loading States**: Smooth loading indicators
- **Error Handling**: Comprehensive error management

### 🔧 Technical Features
- **Full-stack**: React frontend + Node.js backend
- **Database**: MongoDB with Mongoose ODM
- **State Management**: Redux Toolkit
- **File Upload**: Multer + Cloudinary
- **Security**: JWT authentication, CORS protection
- **Production Ready**: Environment-specific configurations

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Multer** - File upload
- **Cloudinary** - Image storage
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WishlistApp
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   # Create .env file with your configuration
   npm run dev
   ```

4. **Environment Variables**

   **Backend (.env)**
   ```env
   NODE_ENV=development
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/wishlist-app
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret_key
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend (.env)**
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_APP_NAME=Wishlist App
   VITE_APP_VERSION=1.0.0
   ```

## 📁 Project Structure

```
WishlistApp/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── user.js
│   │   ├── wishlist.js
│   │   └── product.js
│   ├── middlewares/
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── models/
│   │   ├── user.js
│   │   └── wishlist.js
│   ├── routes/
│   │   ├── user.js
│   │   ├── wishlist.js
│   │   └── product.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Cards.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Wishlist.jsx
│   │   │   └── WishlistDetail.jsx
│   │   ├── redux/
│   │   │   ├── authSlice.js
│   │   │   ├── store.js
│   │   │   └── wishlistSlice.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout

### Wishlists
- `GET /api/v1/wishlist/get/user` - Get user's wishlists
- `GET /api/v1/wishlist/get/:id` - Get single wishlist
- `POST /api/v1/wishlist/create` - Create wishlist
- `PUT /api/v1/wishlist/update/:id` - Update wishlist
- `DELETE /api/v1/wishlist/remove/:id` - Delete wishlist
- `POST /api/v1/wishlist/invite/:id` - Invite user to wishlist

### Products
- `POST /api/v1/product/add` - Add product
- `PUT /api/v1/product/update/:id` - Update product
- `DELETE /api/v1/product/remove/:id` - Remove product
- `POST /api/v1/product/get` - Get products

## 🎯 Usage

### Creating a Wishlist
1. Register/Login to your account
2. Click "Create Wishlist" on the dashboard
3. Enter a wishlist name
4. Start adding products

### Adding Products
1. Open a wishlist
2. Click "Add Product"
3. Fill in product details (name, price, image)
4. Save the product

### Inviting Friends
1. Open a wishlist
2. Click "Invite People"
3. Enter friend's email address
4. Send invitation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **CORS Protection**: Configured for production domains
- **Input Validation**: Server-side validation
- **Error Handling**: Secure error responses

## 🚀 Deployment

### Production Deployment
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

##  Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Node.js](https://nodejs.org/) - Runtime environment
- [MongoDB](https://mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vercel](https://vercel.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting