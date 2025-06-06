# Church Website

A modern, full-stack church website built with Next.js 13+ (App Router) and MongoDB. Features include hero slider management, event management, user authentication with role-based access control, and email/SMS verification.

## Tech Stack

### Frontend
- **Next.js 13+** - React framework with App Router
- **Tailwind CSS** - For styling
- **React Hook Form** - Form handling and validation
- **Swiper** - For hero slider functionality
- **React Calendar** - Calendar component
- **React Clock** - Digital clock component

### Backend
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Next.js API Routes** - Backend API
- **JSON Web Tokens (JWT)** - Authentication
- **bcryptjs** - Password hashing

### External Services
- **SendGrid** - Email verification and notifications
- **Twilio** - SMS verification

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 16.8 or later
- MongoDB instance (local or Atlas)
- SendGrid account for email services
- Twilio account for SMS services

## Environment Variables

Create a \`.env.local\` file in the root directory with the following variables:

\`\`\`bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
SENDGRID_API_KEY=your_sendgrid_api_key
NEXT_PUBLIC_API_URL=http://localhost:3000/api
CONTACT_EMAIL=your_church_email@domain.com
SENDGRID_VERIFIED_SENDER=your_verified_sender@domain.com
\`\`\`

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd church-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── src/
│   ├── app/                 # Next.js 13 app directory
│   │   ├── api/            # API routes
│   │   ├── admin/          # Admin pages
│   │   └── ...            # Other pages
│   ├── components/         # React components
│   │   ├── admin/         # Admin components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── lib/               # Utility functions
│   └── models/            # MongoDB models
└── public/               # Static files
\`\`\`

## Features

1. **Authentication & Authorization**
   - User registration with email and phone verification
   - JWT-based authentication
   - Role-based access control (user, admin, superadmin)

2. **Admin Dashboard**
   - Hero slider management
   - Event management
   - Department-based admin access

3. **Public Pages**
   - Homepage with hero slider
   - Events page
   - About page
   - Contact page

4. **Components**
   - Responsive header with navigation
   - Live calendar
   - Digital clock
   - Contact form
   - Event listings

## Deployment

1. Build the application:
\`\`\`bash
npm run build
\`\`\`

2. Start the production server:
\`\`\`bash
npm start
\`\`\`

### Deployment Platforms
You can deploy this application on:
- Vercel (Recommended for Next.js)
- AWS
- DigitalOcean
- Heroku

## Security Features

- Password hashing with bcryptjs
- JWT for secure authentication
- Email verification
- Phone number verification
- Role-based access control
- Protected API routes
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
