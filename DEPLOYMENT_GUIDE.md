# SkillSwap Deployment Guide

## 📋 Prerequisites
- GitHub account
- Vercel account (free tier)
- Render account (free tier)
- Node.js installed locally

---

## 🚀 Frontend Deployment to Vercel

### Step 1: Prepare Frontend Repository

1. **Navigate to frontend directory**
   ```bash
   cd skillswap-frontend
   ```

2. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create GitHub repository**
   - Go to https://github.com/new
   - Repository name: `skillswap-frontend`
   - Make it Public
   - Click "Create repository"
   - Copy the repository URL

4. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/skillswap-frontend.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign up/login with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select `skillswap-frontend` from your GitHub repositories
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)

4. **Environment Variables**
   - Click "Environment Variables"
   - Add:
     - Key: `VITE_API_URL`
     - Value: `https://skillswap-backend.onrender.com` (update after backend deployment)
   - Click "Add"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (1-2 minutes)
   - Copy the deployed URL (e.g., `https://skillswap-frontend.vercel.app`)

---

## 🚀 Backend Deployment to Render

### Step 1: Prepare Backend Repository

1. **Navigate to backend directory**
   ```bash
   cd skillswap-backend
   ```

2. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create GitHub repository**
   - Go to https://github.com/new
   - Repository name: `skillswap-backend`
   - Make it Public
   - Click "Create repository"

4. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/skillswap-backend.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Render

1. **Go to Render**
   - Visit https://render.com
   - Sign up/login with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Select `skillswap-backend` from your GitHub repositories
   - Click "Connect"

3. **Configure Service**
   - **Name**: `skillswap-backend`
   - **Region**: Oregon (us-west) or closest to you
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Environment Variables**
   - Click "Advanced" → "Add Environment Variable"
   - Add:
     - Key: `PORT`
     - Value: `8000`
   - Add:
     - Key: `NODE_ENV`
     - Value: `production`
   - Add:
     - Key: `JWT_SECRET`
     - Value: Generate a random string (click "Generate")
   - Add:
     - Key: `FRONTEND_URL`
     - Value: `https://skillswap-frontend.vercel.app` (from Vercel deployment)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (2-3 minutes)
   - Copy the deployed URL (e.g., `https://skillswap-backend.onrender.com`)

---

## 🔗 Update Frontend Environment Variable

1. **Go back to Vercel**
   - Visit https://vercel.com/dashboard
   - Select `skillswap-frontend` project

2. **Update Environment Variable**
   - Go to "Settings" → "Environment Variables"
   - Find `VITE_API_URL`
   - Update value to your Render backend URL
   - Click "Save"

3. **Redeploy**
   - Go to "Deployments"
   - Click the three dots next to latest deployment
   - Click "Redeploy"

---

## ✅ Verification

### Test Backend
```bash
curl https://skillswap-backend.onrender.com/health
```
Expected: `{"status":"ok","timestamp":"..."}`

### Test Frontend
- Open your Vercel URL in browser
- Navigate to `/dashboard`
- Should see user data loaded from API

---

## 🔧 Troubleshooting

### Frontend Issues
- **Blank screen**: Check browser console for errors
- **API errors**: Verify `VITE_API_URL` is correct
- **Build fails**: Check `package.json` scripts

### Backend Issues
- **Service not starting**: Check Render logs
- **CORS errors**: Verify `FRONTEND_URL` environment variable
- **Port conflicts**: Ensure PORT is set to 8000

---

## 📊 Deployment URLs

After successful deployment, you'll have:

- **Frontend**: https://skillswap-frontend.vercel.app
- **Backend**: https://skillswap-backend.onrender.com
- **Health Check**: https://skillswap-backend.onrender.com/health
- **API Users**: https://skillswap-backend.onrender.com/users
- **API Matches**: https://skillswap-backend.onrender.com/matches/u1
- **API Sessions**: https://skillswap-backend.onrender.com/sessions/u1
