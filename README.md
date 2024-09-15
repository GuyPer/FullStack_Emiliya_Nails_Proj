# Fullstack Project - Business Web "Emiliya Nails Art"

## Overview

This Fullstack project, built with the MERN stack (MongoDB, Express.js, React.js, Node.js), is a business website for "Emiliya Nails Art". The repository contains a responsive application demonstrating both front-end and back-end development skills. It uses technologies such as HTML, CSS, Bootstrap, TypeScript, and React for the front end, and Node.js, Express.js, and MongoDB for the back end.

## Project Description

The project aims to create a user-friendly platform for both clients and the admin:

Clients can browse the business's portfolio, register as new users to purchase products, schedule appointments, and contact the business owner across different platforms.
Admin users can manage products and gallery (create, edit, and delete), monitor user activity, and remove users when necessary.
The back-end server is built using JavaScript with the Express framework to handle HTTP requests via various middleware.

### Front-end Dependencies

    "bootstrap": "^5.3.2",
    "emailjs-com": "^3.2.0",
    "jwt-decode": "^4.0.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.1",
    "react-dom": "^18.2.0",
    "react-icons": "^5.2.1",
    "react-router-dom": "^6.22.0"
    "@types/node": "^22.5.1",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@types/react-router-dom": "^5.3.3",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "eslint": "^8.56.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "prettier": "^3.3.3",
    "typescript": "^5.2.2",
    "vite": "^5.1.0"

### Back-end dependencies:

    "bcryptjs": "^2.4.3",
    "chalk": "^4.1.2",
    "cloudinary": "^2.4.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "joi": "^17.13.1",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.8.0",
    "mongoose": "^8.4.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1"

## Installation and Usage

For both the front-end and back-end:

1. Install dependencies by running npm install.
2. Start the server with npm run dev.
   For back-end development, you must also install nodemon to auto-restart the server when changes are made.

## Environment File:

Create an .env file in the back-end directory to store sensitive data. It should contain:

PORT = "3000"
JWT_SECRET = "iLoveIsrael123!@#"
JWT_EXPIRES_IN = "30m"

DB_ENV= "online"
NODE_ENV= "dev"
MONGODB_LOCAL_URI_DEV = "mongodb://localhost:27017/Emiliya_nails"
MONGODB_SERVER_URI_DEV= "mongodb+srv://guyperetz1990:xFCbNBvoMTz82bxm@cluster1.6lh4q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

CLOUDINARY_CLOUD_NAME=drvvjiatz
CLOUDINARY_API_KEY= 116954438974699
CLOUDINARY_API_SECRET= vQp_YUYyVjD8xIwh5yI_nYqDo4k

Create an .env file in the Front-end directory to store sensitive data. It should contain:
VITE_EMAILJS_SERVICE_ID="service_bm3fnlr"
VITE_EMAILJS_TEMPLATE_ID="template_zgpo668"
VITE_EMAILJS_USER_ID="tfSO1b-QK1B1wnvF_"

## Database Connection Options
The application is designed to connect to MongoDB using either a cloud-based MongoDB Atlas connection or a locally hosted MongoDB instance.
-**1. Cloud-based MongoDB Atlas:** By default, the application will attempt to connect to MongoDB Atlas using the following environment variables in the .env file:
DB_ENV= "online"
MONGODB_SERVER_URI_DEV= "mongodb+srv://<username>:<password>@cluster1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
-**2. Local MongoDB (Compass)**: In case the MongoDB Atlas connection is unavailable, the application can fall back to a local MongoDB instance (e.g., using MongoDB Compass) by setting the environment to local:
DB_ENV= "local"
MONGODB_LOCAL_URI_DEV = "mongodb://localhost:27017/Emiliya_nails"
Make sure you have MongoDB installed locally, and the database is up and running on the specified port.
-**Seeding the Local Database**: 
If using the local MongoDB option, you must populate the database with initial data. To do this, run the provided seed file:
node seed.js
This will load the necessary users, products, and other initial data into the local database.

## Key Features

-**User Authentication:** Registered users can like products, and their preferences are saved even after logging out. -**Admin Functionality:** Admins can manage products and gallery images (create, edit, and delete). -**Profile Management:** Users can edit or delete their profiles. Admins can manage all profiles. -**Responsive Design:** Optimized for various screen sizes, up to 1024 pixels wide. -**CRUD Operations:** Supports CRUD for products and users, connected to MongoDB. -**Database Options:** Locally hosted MongoDB or cloud-based MongoDB Atlas.

## Folder Structure

Front-end -**Components:** Reusable UI elements (Navbar, Footer, etc.). -**Contexts:** Manages global state (e.g., theme, authentication). -**Interfaces:** Defines TypeScript interfaces for the app. -**Utils:** Contains utility functions like form validations. -**Services:** Handles API requests. -**Pages:** Contains main route components (e.g., Home, Profile). -**Layouts:** Controls the overall page layout.

Back-end

-**Seed:** Seeds the database with initial data (users, products, images). -**Controllers:** Handles server logic for API routes. -**Routes:** Defines API routes and applies middleware. -**Models:** Defines MongoDB schemas for users and products. -**Schemas:** Validates incoming requests using Joi. -**Logs:** Stores log files for debugging. -**server.js:** Entry point for starting the server

## Additional Libraries Used

-**cors:** Restricts cross-origin requests. -**Joi:** Validates data for API requests. -**bcryptjs:** Hashes passwords before saving them. -**JWT (JSON Web Token):** Manages user authentication with tokens.

## Mongoose Library

Utilized to create USERS and PRODUCTS models for MongoDB data management.

## Navigation

The application has different navigation modes (Visitor, User, Admin) and is mobile-friendly with a hamburger menu for easier access.

## Forms

Several forms are implemented for user registration, login, and product management. These forms validate input with real-time feedback, ensuring adherence to email, phone, and other standards.

## Admin User

For testing purposes, use the following credentials:

Email: admin@gmail.com
Password: Abc!123Abc

## Theme Support

Users can switch between light and dark themes based on their preferences.

## Data Base URLs using MongoDB

The application uses MongoDB and can be accessed at:

- http://localhost:3000
- http://127.0.0.1:3000

## CRUD Operations

### Users Routes

| No. | URL             | Method | Authorization            | Action        | Return          |
| --- | --------------- | ------ | ------------------------ | ------------- | --------------- |
| 1   | `/users`        | POST   | All                      | Register user | Encrypted token |
| 2   | `/users/login`  | POST   | All                      | Login         | User object     |
| 3   | `/users`        | GET    | Admin                    | Get all users | Array of users  |
| 4   | `/users/:id`    | GET    | Registered User or Admin | Get user      | User object     |
| 5   | `/users/:id`    | PUT    | Registered User          | Edit user     | User object     |
| 6   | `/users/:id`    | DELETE | Registered User or Admin | Delete user   | User object     |
| 7   | `/auth/profile` | GET    | Registered User          | User details  | User object     |

### products Routes

| No. | URL                    | Method | Authorization | Action              | Return            |
| --- | ---------------------- | ------ | ------------- | ------------------- | ----------------- |
| 1   | `/products`            | GET    | All           | Get all products    | Array of products |
| 2   | `/products/:id`        | GET    | All           | Get product         | Product object    |
| 4   | `/products`            | POST   | Admin         | Create new product  | Product object    |
| 5   | `/products/:id`        | PUT    | Admin         | Edit product        | Product object    |
| 6   | `/products/:id`        | DELETE | Admin         | Delete product      | Product object    |
| 7   | `/products/delete/all` | DELETE | Admin         | Delete All products | Product object    |
