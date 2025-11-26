# 🎯 Simple Deployment Steps

## What You Need to Deploy

Your portfolio has **2 parts** that need to be deployed separately:

```
┌─────────────────────────────────────────────────┐
│  GitHub Repository: MY-PORTFOLIO                │
│                                                 │
│  ├── 📁 Root (Frontend - React)                │
│  │   ├── src/                                  │
│  │   ├── public/                               │
│  │   └── package.json                          │
│  │                                             │
│  └── 📁 server/ (Backend - Express)            │
│      ├── index.js                              │
│      ├── package.json                          │
│      └── vercel.json                           │
└─────────────────────────────────────────────────┘
         │                    │
         │                    │
         ▼                    ▼
┌──────────────────┐  ┌──────────────────┐
│  Vercel Project  │  │  Vercel Project  │
│   #1: Frontend   │  │   #2: Backend    │
│                  │  │                  │
│  Root: /         │  │  Root: /server   │
│  Framework: Vite │  │  Framework: Other│
└──────────────────┘  └──────────────────┘
```

---

## 🚀 Deploy in 4 Steps

### Step 1: Deploy Backend (Email Server)

1. Open https://vercel.com/new
2. Select your GitHub repo: `MY-PORTFOLIO`
3. **Configure Project:**
   ```
   Project Name: portfolio-backend
   Root Directory: server  ⚠️ IMPORTANT!
   Framework: Other
   ```
4. Click **Deploy**
5. **Save the URL** (e.g., `https://portfolio-backend-xyz.vercel.app`)

### Step 2: Configure Backend

1. Go to backend project → **Settings** → **Environment Variables**
2. Add these 3 variables:

   | Name | Value |
   |------|-------|
   | `GMAIL_USER` | `hemantmistri00@gmail.com` |
   | `GMAIL_PASS` | Get from [Google App Passwords](https://myaccount.google.com/apppasswords) |
   | `NODE_ENV` | `production` |

3. Click **Deployments** → **Redeploy**

### Step 3: Deploy Frontend (Portfolio Website)

1. Open https://vercel.com/new **again**
2. Select **SAME** repo: `MY-PORTFOLIO`
3. **Configure Project:**
   ```
   Project Name: my-portfolio
   Root Directory: (leave empty)
   Framework: Vite
   ```
4. Click **Deploy**

### Step 4: Configure Frontend

1. Go to frontend project → **Settings** → **Environment Variables**
2. Add this variable:

   | Name | Value |
   |------|-------|
   | `VITE_API_URL` | `https://portfolio-backend-xyz.vercel.app` |
   
   ⚠️ Use YOUR backend URL from Step 1!

3. Click **Deployments** → **Redeploy**

---

## ✅ Done! Test Your Contact Form

1. Visit your portfolio: `https://my-portfolio-xyz.vercel.app`
2. Go to Contact section
3. Send a test message
4. Check your Gmail inbox!

---

## 🔍 How to Get Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already)
3. Go to https://myaccount.google.com/apppasswords
4. Select:
   - App: **Mail**
   - Device: **Other** → Type "Portfolio"
5. Click **Generate**
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
7. Use this as `GMAIL_PASS` in Step 2

---

## 🐛 Quick Troubleshooting

### Backend Health Check
Visit: `https://your-backend-url.vercel.app/api/health`

Should return:
```json
{"status":"ok","message":"Server is running"}
```

### Common Issues

**"CORS error"**
- Make sure `VITE_API_URL` is set correctly in frontend
- Check backend URL doesn't have trailing slash

**"Email not sending"**
- Use App Password, not regular Gmail password
- Check `GMAIL_USER` and `GMAIL_PASS` are set in backend
- Check backend logs in Vercel

**"Cannot find module"**
- Make sure Root Directory is set to `server` for backend
- Redeploy after setting environment variables

---

## 📱 Local Development

### Terminal 1 - Backend:
```bash
cd server
npm install
node index.js
```
Runs on: http://localhost:4000

### Terminal 2 - Frontend:
```bash
npm install
npm run dev
```
Runs on: http://localhost:5173

Frontend automatically connects to localhost backend in development mode.

---

## 🎉 Summary

✅ **Two Vercel projects from one GitHub repo**
✅ **Backend handles emails via Gmail**
✅ **Frontend connects to backend via environment variable**
✅ **Both work together seamlessly**

Need help? Check `QUICK_DEPLOY.md` for more details!
