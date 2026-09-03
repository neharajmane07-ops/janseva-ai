# JANSEVA AI - AI-Powered Government Scheme Assistant

A full-stack web application that helps citizens discover, check eligibility, and apply for government schemes.

## Features

✅ **Home Page** - Beautiful hero section with statistics and features
✅ **Scheme Discovery** - Browse 500+ government schemes across 25+ departments
✅ **Eligibility Checker** - AI-powered eligibility verification
✅ **User Authentication** - Secure login and signup with JWT
✅ **Multi-language Support** - English, Hindi, Tamil, Telugu
✅ **Responsive Design** - Works on all devices
✅ **24/7 Support** - AI chat assistant

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (Custom, no frameworks)
- Vanilla JavaScript

**Backend:**
- Node.js
- Express.js
- JWT Authentication
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/neharajmane07-ops/janseva-ai.git
   cd janseva-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/janseva-ai
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5000
   ```

## Project Structure

```
janseva-ai/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # All styling
│   └── app.js              # Frontend logic
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── schemes.js          # Scheme routes
│   ├── eligibility.js      # Eligibility check routes
│   └── applications.js     # Application routes
├── server.js               # Express server
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
└── README.md               # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Schemes
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get scheme by ID
- `GET /api/schemes/search/:query` - Search schemes

### Eligibility
- `POST /api/eligibility/:schemeId` - Check eligibility

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/:id` - Get application status
- `GET /api/applications/user/:userId` - Get user applications
- `PATCH /api/applications/:id` - Update application

## Features Implemented

### ✅ Frontend
- Responsive navigation bar with language selector
- Beautiful hero section with government building background
- Statistics section showing 25+ Departments, 500+ Schemes, 10L+ Beneficiaries, 24/7 Support
- Feature cards for Personalized Results, 100% Free Service, Secure & Reliable, Multi-language Support
- Modal-based authentication (Login/Signup)
- Multiple pages: Home, About Us, Help, Schemes
- Scheme browsing with eligibility checker
- Smooth animations and transitions
- Mobile-responsive design

### ✅ Backend
- Express.js server with CORS support
- JWT-based authentication
- Password hashing with bcrypt
- Mock database for schemes and applications
- RESTful API structure
- Error handling

## Customization

### Add More Schemes
Edit `routes/schemes.js` and add to the schemes array:

```javascript
{
    id: 7,
    name: 'Your Scheme Name',
    category: 'Category',
    description: 'Description',
    eligibility: 'Eligibility criteria',
    benefits: 'Benefits details',
    department: 'Department name'
}
```

### Modify Colors
Edit `public/styles.css` and change the color variables:
- Primary Blue: `#0052cc`
- Dark Blue: `#001a4d`
- Orange: `#ff9500`

## Future Enhancements

- [ ] Database integration (MongoDB)
- [ ] Email notifications
- [ ] File upload for documents
- [ ] Real AI eligibility checker
- [ ] Payment gateway integration
- [ ] SMS notifications
- [ ] Admin dashboard
- [ ] Analytics

## License

MIT License - See LICENSE file for details

## Support

For issues and feature requests, please create an issue on GitHub.

---

**Made with ❤️ for India's Citizens**
