# E-Commerce Platform

Welcome to the E-Commerce Platform! This robust application is designed to handle all the essential features of an e-commerce website. Built with Node.js, Express.js, MongoDB, and Mongoose, this project offers a comprehensive solution for managing products, orders, users, and more. Deployed on Vercel and connected to MongoDB Atlas, it ensures reliable performance and scalability.

## 🌐 Live Demo

Experience the application in action: [E-Commerce Platform Demo](https://e-commerce-ajzf.vercel.app/)

## 🚀 Features

### User Authentication & Authorization
- **Email Confirmation**: Secure sign-up with email confirmation using NodeMailer and JWT. Expired tokens trigger a new, permanent confirmation link.
- **Password Reset**: Easily reset passwords via email links, with enhanced security through NodeMailer and JWT.
- **Access Control**: Restrict access to authenticated users only. Admins and Super Admins can manage users, while regular users handle their own profiles.
- **Token Management**: Invalidates JWT tokens upon password change, requiring re-authentication for added security.

### Product Management
- **CRUD Operations**: Admins can create, read, update, and delete brands, categories, subcategories, and products.
- **Image Handling**: Upload and manage images for brands, categories, and products using Cloudinary. Product images are organized into specific folders.
- **Coupons Module**: Admins can manage coupons; users can apply them during checkout for discounts.
- **Cart Management**: Users can handle their carts, apply coupons, and view detailed pricing information.

### Order & Payment
- **Order Processing**: Users can place orders, apply coupons, and manage their orders with a cash payment option (card checkout coming soon).
- **Order Management**: View and cancel orders if they haven't been shipped.
- **Invoice Generation**: Automatic invoice creation for each order, with detailed order information sent to users.

### Reviews & Wishlist
- **Product Reviews**: Users can leave reviews and rate products only if they have purchased, received, and paid for them. Average ratings are recalculated with each review.
- **Wishlist**: Users can maintain a wishlist of favorite products.

### Admin Features
- **Admin Role Application**: Users can apply for admin roles; only the Super Admin has the authority to approve or reject applications.

### Error Handling & API Features
- **Robust Error Handling**: Utilizes `asyncHandler` to manage errors gracefully, including file and database cleanup in case of failures.
- **API Capabilities**: Supports sorting, selecting, searching, filtering, and pagination for efficient data handling.

## 🛠️ Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose (Connected to MongoDB Atlas)
- **Deployment**: Vercel
- **File Upload**: Multer, Cloudinary
- **Data Validation**: Joi

## 💻 Usage

1. **Sign Up**: Register as a user to access the platform's features.
2. **Admin Access**: Admins can manage products, categories, and user roles.
3. **User Interaction**: Browse products, manage your cart, place orders, and write reviews.

## 🤝 Contributing

We welcome contributions! To get started:

1. **Fork the Repository**: Create your own copy of the project.
2. **Create a Branch**: Use `git checkout -b feature-branch` to start a new feature or fix.
3. **Commit Changes**: Use `git commit -m 'Add new feature'` to save your progress.
4. **Push to GitHub**: Push your branch with `git push origin feature-branch`.
5. **Submit a Pull Request**: Open a pull request to propose your changes.
