# E-Commerce Platform

This is a fully-featured e-commerce platform built with Node.js, Express.js, MongoDB, and Mongoose. The application is designed to handle all the essential functionalities of an e-commerce website, including user authentication, product management, order processing, and more. The project is deployed on Vercel and connected to MongoDB Atlas for database management.

## Features

### User Authentication & Authorization
- **Email Confirmation**: Users sign up with email confirmation using NodeMailer and JWT. If the token expires before email confirmation, a new link is sent, which never expires.
- **Password Reset**: Users can reset their password via email, with a secure link sent through NodeMailer and JWT.
- **Authentication**: Guests cannot access any part of the app unless they register as users.
- **Authorization**: Admins and Super Admins can perform CRUD operations on users, while regular users can manage their own profiles.
- **Token Expiration**: When users change their password, the previous JWT token is invalidated, and they must log in again.

### Product Management
- **Brand, Category, and Subcategory Management**: Admins can manage brands, categories, and subcategories. Images are uploaded to Cloudinary.
- **Product Management**: Admins can add, update, and delete products, with main images and cover images stored in organized folders.
- **Coupons Module**: Admins can manage coupons, and users can apply them to their cart before checkout.
- **Cart Module**: Users can manage their cart, apply coupons, and view pricing details.

### Order & Payment
- **Order Module**: Users can place orders and apply coupons. Cash order functionality is implemented, and card checkout will be added later.
- **Order Management**: Users can view and cancel their orders if they haven't been shipped.
- **Invoice Generation**: Invoices are generated for each order and sent to the order creator.

### Reviews & Wishlist
- **Reviews Module**: Users can review and rate products only if they have purchased, received, and paid for them. The system recalculates the product's average rating after each review.
- **Wishlist Module**: Users can manage a wishlist of desired products.

### Admin Application
- **Admin Role Application**: Users can apply for admin roles, with approval or rejection managed by the Super Admin.

### Error Handling & API Features
- **Error Handling**: Implemented using `asyncHandler`. APIs handle errors by deleting files from Cloudinary and database entries if any error occurs during operations.
- **API Features**: Sorting, selecting, searching, filtering, and pagination are supported.

### Technology Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose (Connected to MongoDB Atlas)
- **Deployment**: Vercel
- **File Upload**: Multer, Cloudinary
- **Data Validation**: Joi

## Usage

- Sign up as a user to access the platform.
- Admins can log in to manage products, categories, orders, and more.
- Users can browse products, manage their cart, place orders, and write reviews.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
