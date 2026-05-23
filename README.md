# 🎓 QuizMaster - The Ultimate Quiz Platform

QuizMaster is a full-stack, responsive quiz application built with Node.js, Express, MongoDB, and Vanilla JavaScript. It features a modern "Glassmorphism" UI, role-based access control (Admin/User), real-time quiz timers, and comprehensive performance tracking.

## ✨ Features

### 👤 User Features
* **Authentication:** Secure registration and login using JWT and bcrypt.
* **Student Dashboard:** View total points, available quizzes, and personal quiz history.
* **Interactive Quiz Player:** * Real-time countdown timer (30 seconds per question with auto-skip).
  * Dynamic progress bar.
  * Instant score calculation and detailed results page (accuracy, points earned).
* **Account Management:** Securely update account passwords.

### 🛡️ Admin Features
* **Admin Dashboard:** Overview of platform statistics (Total Users, Total Active Quizzes).
* **Quiz Management:** Create, edit, and delete quizzes with dynamic question/option generation.
* **User Management:** View all registered users and edit their contact information.
* **Auto-Provisioning:** The system automatically creates a default admin account on the first run.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom Glassmorphism UI), Vanilla JavaScript (DOM manipulation, Fetch API)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ODM
* **Security:** JSON Web Tokens (JWT) for authentication, `bcryptjs` for password hashing

## 📂 Project Structure

```text
.
├── middleware/
│   └── auth.js             # JWT verification and Admin role authorization
├── models/
│   ├── Quiz.js             # Quiz schema (title, category, questions, options)
│   ├── Result.js           # Result schema (user, quiz, score, accuracy)
│   └── User.js             # User schema with pre-save password hashing
├── public/                 # Static frontend files
│   ├── admin/              # Admin dashboard and management views
│   ├── css/                # Global stylesheets
│   ├── js/                 # Global API wrapper (api.js)
│   └── *.html              # User-facing views (login, register, play, result)
├── routes/
│   ├── auth.js             # Login and Registration routes
│   ├── quiz.js             # Quiz CRUD operations and stats
│   └── user.js             # Profile management, history, and submission
├── .env                    # Environment variables configuration
├── package.json            # Project dependencies and scripts
└── server.js               # Application entry point & MongoDB connection
```

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a MongoDB Atlas URI)

### 1. Installation
Clone the repository or extract the project files, then navigate to the project directory:

```bash
cd QuizMaster
npm install
```

### 2. Environment Configuration
The project comes with a `.env` file. Ensure it contains the following variables (you can modify these as needed):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quiz_app
JWT_SECRET=your_super_secure_jwt_secret_here
```

### 3. Start the Application
Run the following command to start the server:

```bash
npm start
```
*You should see the following in your terminal:*
> MongoDB Connected: localhost  
> ✅ Default admin account created automatically!  
> Server running on port 5000  
> ➜ Local: http://localhost:5000

## 🔑 Default Credentials

When the server connects to the database for the first time, it automatically generates a default Admin account so you can access the dashboard immediately.

* **Admin Login URL:** `http://localhost:5000/login.html`
* **Phone:** `1234567890`
* **Password:** `admin@simakhi`

*(Note: It is highly recommended to change this password or create a new admin account in a production environment).*

## 📡 API Endpoints Overview

The frontend communicates with the backend via a centralized `api.js` wrapper handling JWT headers. 

**Auth Routes (`/api/auth`)**
* `POST /register` - Create a new user
* `POST /login` - Authenticate and receive JWT

**User Routes (`/api/user`)**
* `GET /profile` - Get current user info & quiz history
* `PUT /update-password` - Change user password
* `POST /submit-quiz` - Submit answers and calculate score
* `GET /all` - (Admin) Get all users
* `PUT /edit/:id` - (Admin) Edit user details

**Quiz Routes (`/api/quiz`)**
* `GET /all` - Get all available quizzes
* `GET /:id` - Get a specific quiz by ID
* `POST /create` - (Admin) Create a new quiz
* `PUT /update/:id` - (Admin) Update a quiz
* `DELETE /delete/:id` - (Admin) Delete a quiz
* `GET /stats/summary` - (Admin) Get platform statistics

## 🎨 UI/UX Design Note
This application utilizes a custom CSS implementation heavily inspired by **Glassmorphism**. It uses translucent backgrounds, subtle borders (`var(--glass-border)`), and soft shadows to create a modern, frosted-glass aesthetic layered over a clean white background.

```