# SkillSwap

A full-stack skill exchange platform that connects people who want to learn and teach skills. Built with React, Node.js, and Express.

## 🌟 Features

- **Smart Matching Algorithm**: AI-powered skill compatibility scoring with synonym recognition
- **Session Management**: Schedule, track, and complete skill exchange sessions
- **Real-time Dashboard**: View matches, sessions, and activity in one place
- **Responsive Design**: Beautiful UI built with Tailwind CSS
- **RESTful API**: Clean backend architecture with controller-service pattern

## 🚀 Live Demo

- **Frontend**: https://skillswap-frontend.vercel.app
- **Backend**: https://skillswap-backend.onrender.com
- **API Health**: https://skillswap-backend.onrender.com/health

## 📸 Screenshots

| Page | Description |
|------|-------------|
| Home | Landing page with feature overview |
| Dashboard | User profile, stats, and quick actions |
| Matches | Browse and filter skill matches |
| Sessions | View and manage scheduled sessions |

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

## 📁 Project Structure

```
skillswap/
├── skillswap-frontend/          # React frontend
│   ├── src/
│   │   ├── api/               # API client
│   │   ├── components/        # Reusable components
│   │   │   ├── layout/       # Layout components
│   │   │   └── ui/           # UI components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom hooks
│   │   ├── utils/            # Utility functions
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # Entry point
│   ├── public/               # Static assets
│   ├── index.css             # Global styles
│   ├── tailwind.config.js    # Tailwind config
│   └── package.json          # Dependencies
│
└── skillswap-backend/         # Node.js backend
    ├── src/
    │   ├── data/            # Data layer
    │   │   ├── seed.js     # Seed data
    │   │   └── store.js    # In-memory store
    │   ├── routes/         # API routes
    │   ├── controllers/    # Request handlers
    │   ├── services/       # Business logic
    │   │   └── matchingEngine.js  # Matching algorithm
    │   ├── app.js          # Express app
    │   └── server.js       # Server entry point
    ├── .env                # Environment variables
    ├── .env.example        # Environment template
    └── package.json       # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skillswap-frontend.git
   cd skillswap-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variable**
   ```bash
   # Create .env file
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to http://localhost:5173

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/skillswap-backend.git
   cd skillswap-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Edit .env with your values
   PORT=8000
   NODE_ENV=development
   JWT_SECRET=your_secret_here
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Verify health check**
   ```bash
   curl http://localhost:8000/health
   ```

## 📡 API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:id` - Update user

### Matches
- `GET /matches/:userId` - Get matches for user
- `POST /matches/:matchId/request` - Request session
- `POST /matches/generate/:userId` - Generate new matches

### Sessions
- `GET /sessions/:userId` - Get sessions for user
- `POST /sessions` - Create new session
- `PATCH /sessions/:id/complete` - Mark session complete
- `DELETE /sessions/:id` - Cancel session

## 🧪 Testing

### Test Backend API
```bash
# Health check
curl http://localhost:8000/health

# Get all users
curl http://localhost:8000/users

# Get matches for user u1
curl http://localhost:8000/matches/u1

# Get sessions for user u1
curl http://localhost:8000/sessions/u1
```

## 🎨 Matching Algorithm

The matching engine uses a three-tier scoring system:

1. **Exact Match** (weight: 1.0) - Perfect skill match
2. **Synonym Match** (weight: 0.8) - Recognizes skill aliases (e.g., "JS" = "JavaScript")
3. **Partial Match** (weight: 0.4) - Substring matches

Scores are bidirectional and averaged to produce a 0-100 compatibility score.

## 📝 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```env
PORT=8000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy automatically

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service in Render
3. Set environment variables
4. Deploy automatically

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

**Jenani** - Full Stack Developer

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- Vercel for hosting the frontend
- Render for hosting the backend

---

**Built with ❤️ for the skill-sharing community**
