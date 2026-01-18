# 📸 LensLocker

> **A modern camera gear rental platform connecting photographers with professional equipment**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.1.4-green)](https://www.mongodb.com/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4.24.13-purple)](https://next-auth.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

**🌐 Live Demo:** [https://lens-locker.vercel.app/](https://your-production-url.com)

---

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Authentication** with NextAuth.js
- **Multiple Auth Providers**: Email/Password and Google OAuth
- **User Registration** with profile management
- **Protected Routes** with role-based access control
- **Session Management** with JWT tokens

### 📷 Gear Management
- **Browse Equipment** by category (DSLR, Mirrorless, Drones, Lighting, Lenses, Accessories)
- **Advanced Search** by name, brand, or model
- **Infinite Scroll** for seamless browsing
- **Detailed Gear Pages** with specifications and images
- **Add Your Gear** - List your equipment for rent
- **Location-based** gear discovery

### 🛒 Rental System
- **Shopping Cart** functionality
- **Date Selection** for rental periods
- **Price Calculation** based on daily rates
- **Rental Management** dashboard
- **Order Tracking** with status updates

### 🎨 User Experience
- **Modern UI/UX** with Tailwind CSS
- **Responsive Design** for all devices
- **Smooth Animations** with Framer Motion
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **Dark Theme** optimized interface

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.2** - React framework with App Router
- **React 19.2.3** - UI library
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Swiper** - Touch slider component
- **React Hot Toast** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js 4.24.13** - Authentication solution
- **MongoDB** - NoSQL database
- **Mongoose 9.1.4** - MongoDB object modeling
- **bcryptjs** - Password hashing

### Infrastructure
- **Vercel** (recommended) - Deployment platform
- **MongoDB Atlas** - Cloud database hosting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** or **pnpm**
- **MongoDB** database (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lens-locker.git
   cd lens-locker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth Configuration
   NEXTAUTH_SECRET=your_random_secret_key_here
   NEXTAUTH_URL=http://localhost:3000

   # Google OAuth (Optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Seed the database (Optional)**
   ```bash
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📋 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes | - |
| `NEXTAUTH_SECRET` | Secret key for JWT encryption | ✅ Yes | - |
| `NEXTAUTH_URL` | Base URL of your application | ✅ Yes | `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | ❌ No | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | ❌ No | - |

### Production Environment Variables

For production deployment, ensure:
- `NEXTAUTH_URL` is set to your production domain (e.g., `https://yourdomain.com`)
- `NEXTAUTH_SECRET` is a strong, random secret (different from development)
- `MONGODB_URI` points to your production database
- All variables are set in your hosting platform's environment settings

---

## 📁 Project Structure

```
lens-locker/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── gear/          # Gear API endpoints
│   │   └── rental/        # Rental API endpoints
│   ├── gear/              # Gear pages
│   ├── login/             # Authentication pages
│   ├── registration/      # User registration
│   ├── cart/              # Shopping cart
│   └── orders/            # Order management
├── components/             # React components
│   ├── Home/              # Homepage components
│   └── ...                # Other components
├── lib/                   # Utility libraries
│   ├── auth.js            # NextAuth configuration
│   ├── db.js              # Database connection
│   └── utils.js           # Helper functions
├── models/                # Mongoose models
│   ├── Gear.js            # Gear schema
│   └── Rental.js          # Rental schema
├── actions/               # Server actions
├── provider/              # Context providers
├── public/                # Static assets
├── scripts/               # Utility scripts
└── proxy.js               # Next.js proxy (middleware)
```

---

## 🎯 Usage

### For Renters

1. **Browse Equipment**
   - Visit the gear page to see available equipment
   - Use search and filters to find specific items
   - View detailed specifications and images

2. **Rent Equipment**
   - Click on any gear item to view details
   - Select rental dates
   - Add to cart and complete checkout

3. **Manage Rentals**
   - View your orders in the orders page
   - Track rental status

### For Gear Owners

1. **Create Account**
   - Register with email/password or Google
   - Complete your profile

2. **List Your Gear**
   - Navigate to "Add Gear" page
   - Fill in equipment details
   - Set daily rental rate
   - Add images and specifications

3. **Manage Listings**
   - View and edit your listed equipment
   - Track rental requests

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

2. **Import project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - **Important**: Set `NEXTAUTH_URL` to your Vercel domain

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `your-project.vercel.app`

### Deploy to Other Platforms

The application can be deployed to any platform supporting Next.js:
- **Netlify**
- **Railway**
- **Render**
- **AWS Amplify**
- **DigitalOcean App Platform**

Ensure all environment variables are configured in your hosting platform.

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with sample gear |

---

## 🧪 Testing

### Demo Credentials

For testing purposes, you can use:
- **Email:** `admin@example.com`
- **Password:** `123456`

*Note: Create your own account for production use*

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vercel](https://vercel.com/) for hosting

---

## 📞 Support

For support, email support@lenslocker.com or open an issue in the GitHub repository.

---

## 🗺️ Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time chat between renters and owners
- [ ] Review and rating system
- [ ] Advanced filtering and sorting
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Analytics dashboard

---

<div align="center">

**Made with ❤️ by the LensLocker Team**

[⭐ Star this repo](https://github.com/yourusername/lens-locker) | [🐛 Report Bug](https://github.com/yourusername/lens-locker/issues) | [💡 Request Feature](https://github.com/yourusername/lens-locker/issues)

</div>
