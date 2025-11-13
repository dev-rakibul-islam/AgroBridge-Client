# AgroBridge - Connecting Farmers & Agro Enthusiasts

**Live Site:** [AgroBridge Live](https://agrobridge.netlify.app)

AgroBridge is a modern web platform that bridges the gap between farmers and agricultural enthusiasts. It enables users to discover, share, and trade agricultural products and services in a seamless, user-friendly environment.

---

## ✨ Key Features

- **🌾 Crop Marketplace**: Browse and explore a diverse collection of agricultural crops and products with detailed information about each listing.

- **📝 Create & Manage Listings**: Farmers and vendors can easily add, edit, and manage their crop listings with images, descriptions, and pricing details.

- **❤️ Interest Management**: Users can express interest in specific crops and maintain a personalized list of their favorite products for quick reference.

- **👥 User Authentication & Profiles**: Secure login and registration system with personalized user profiles to track your posts, interests, and activities.

- **🔍 Advanced Search & Filtering**: Find exactly what you're looking for with powerful search capabilities and filtering options by crop type, price, and location.

- **📱 Responsive Design**: Fully responsive and mobile-optimized interface built with modern CSS and Tailwind, ensuring a seamless experience on all devices.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase
- **Backend**: Node.js & Express
- **API Communication**: RESTful API
- **Linting**: ESLint

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/AgroBridge.git
   cd AgroBridge/AgroBridge-Client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   - Create a `.env.local` file in the root directory
   - Add your Firebase configuration and API endpoints

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

---

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

---

## 📂 Project Structure

```
src/
├── components/      # Reusable React components
├── pages/          # Page components for different routes
├── context/        # React Context for state management
├── hooks/          # Custom React hooks
├── Firebase/       # Firebase configuration
├── lib/            # Utility functions and API calls
├── layouts/        # Layout components
└── assets/         # Static assets
```

---

## 🔐 Features in Detail

### Authentication

- User registration and login with Firebase
- Secure session management
- Protected routes for authenticated users

### Crop Management

- Full CRUD operations for crop listings
- Image upload support
- Detailed crop information including specifications

### User Dashboard

- View all personal posts
- Manage interests and wishlist
- Edit profile information

---

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ by the AgroBridge Team**
