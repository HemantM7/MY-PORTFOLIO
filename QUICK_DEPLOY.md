# 🚀 Quick Deployment Guide

## Two Vercel Projects Setup

Your portfolio needs **TWO separate Vercel projects**:
1. **Frontend** (React app) - Main portfolio
2. **Backend** (Express server) - Email service

---

## 📋 Step-by-Step Deployment

### 1️⃣ Deploy Backend First

1. Go to https://vercel.com/new
2. Import your GitHub repo: `HemantM7/MY-PORTFOLIO`
3. **IMPORTANT**: Configure these settings:
   - **Project Name**: `portfolio-backend` (or any name)
   - **Root Directory**: `server` ⚠️ (Click "Edit" and type `server`)
   - **Framework Preset**: Other
4. Click **Deploy**
5. **Copy the deployment URL** (e.g., `https://portfolio-backend.vercel.app`)

### 2️⃣ Add Backend Environment Variables

1. In the backend project, go to **Settings** → **Environment Variables**
2. Add these:
   - `GMAIL_USER` = `hemantmistri00@gmail.com`
   - `GMAIL_PASS` = `your-gmail-app-password` (get from https://myaccount.google.com/apppasswords)
   - `NODE_ENV` = `production`
3. **Redeploy** the backend project

### 3️⃣ Deploy Frontend

1. Go to https://vercel.com/new again
2. Import the **SAME** GitHub repo: `HemantM7/MY-PORTFOLIO`
3. Configure:
   - **Project Name**: `my-portfolio` (or any name)
   - **Root Directory**: Leave empty (root of repo)
   - **Framework Preset**: Vite
4. Click **Deploy**

### 4️⃣ Add Frontend Environment Variable

1. In the frontend project, go to **Settings** → **Environment Variables**
2. Add:
   - `VITE_API_URL` = `https://portfolio-backend.vercel.app` (your backend URL from step 1)
3. **Redeploy** the frontend project

---

## ✅ Test It!

1. Visit your frontend URL (e.g., `https://my-portfolio.vercel.app`)
2. Scroll to Contact section
3. Fill the form and submit
4. Check your Gmail inbox!

---

## 🔧 Local Development

### Run Backend:
```bash
cd server
npm install
node index.js
```
Backend runs on http://localhost:4000

### Run Frontend:
```bash
# In project root
npm install
npm run dev
```
Frontend runs on http://localhost:5173

The frontend will automatically connect to `http://localhost:4000` in development.

---

## 🐛 Troubleshooting

### Backend not working?
- Check environment variables are set in backend project
- Visit `https://your-backend-url.vercel.app/api/health` - should return `{"status":"ok"}`
- Check Vercel function logs

### Frontend can't reach backend?
- Verify `VITE_API_URL` is set correctly in frontend project
- Check browser console for CORS errors
- Make sure backend URL doesn't have trailing slash

### Gmail not sending?
- Use App Password, not regular password
- Enable 2-Step Verification on Google account
- Check backend logs in Vercel

---

## 📝 Summary

```
GitHub Repo (MY-PORTFOLIO)
    ├── Frontend (root) → Vercel Project 1
    └── Backend (server/) → Vercel Project 2
```

**Two projects, one repo!** 🎉
