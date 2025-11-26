# 📧 Contact Form Setup Guide for Vercel

Your portfolio uses a separate backend server for the contact form. This guide shows you how to deploy both the frontend and backend.

## 📦 Deployment Architecture

- **Frontend**: React app deployed on Vercel (main portfolio)
- **Backend**: Express server deployed separately on Vercel (handles emails)

## 🔐 Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**: https://myaccount.google.com/apppasswords
4. Select app: **Mail**
5. Select device: **Other (Custom name)** → Type "Portfolio Contact Form"
6. Click **Generate**
7. **Copy the 16-character password** (you won't see it again!)

## 🚀 Step 2: Deploy Backend Server

1. **Create a new Vercel project for the backend:**
   - Go to https://vercel.com/new
   - Click "Add New" → "Project"
   - Import your GitHub repository (MY-PORTFOLIO)
   - **Important**: Set Root Directory to `server`
   - Project Name: `portfolio-backend` (or any name you like)
   - Click "Deploy"

2. **Copy the backend URL:**
   - After deployment, copy the URL (e.g., `https://portfolio-backend.vercel.app`)
   - You'll need this for the frontend

## ⚙️ Step 3: Add Environment Variables

### For Backend (portfolio-backend project):

1. Go to your backend project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add these variables:

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your portfolio project
3. Click **Settings** → **Environment Variables**
4. Add these two variables:

   **Variable 1:**
   - Name: `GMAIL_USER`
   - Value: `your-email@gmail.com` (your Gmail address)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

   **Variable 2:**
   - Name: `GMAIL_PASS`
   - Value: `xxxx xxxx xxxx xxxx` (the 16-char app password from Step 1)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

5. Click **Save** for each variable

### For Frontend (main portfolio project):

1. Go to your main portfolio project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add this variable:

   **Variable:**
   - Name: `VITE_API_URL`
   - Value: `https://portfolio-backend.vercel.app` (your backend URL from Step 2)
   - Environment: ✅ Production, ✅ Preview, ✅ Development

4. Click **Save**

## 🚀 Step 4: Redeploy Both Projects

After adding environment variables, you need to redeploy:

**Option A: Automatic (Recommended)**
- Just push any commit to GitHub
- Vercel will automatically redeploy with the new environment variables

**Option B: Manual**
- Go to your Vercel project
- Click **Deployments** tab
- Click the three dots (...) on the latest deployment
- Click **Redeploy**

## ✅ Step 5: Test Your Contact Form

1. Visit your deployed portfolio
2. Go to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your Gmail inbox for the message!

## 🐛 Troubleshooting

### Form not sending?
- Check browser console for errors (F12)
- Verify environment variables are set correctly in Vercel
- Make sure you used an **App Password**, not your regular Gmail password
- Check Vercel function logs: Project → Deployments → Click deployment → Functions tab

### Still not working?
- Ensure 2-Step Verification is enabled on your Google account
- Try regenerating the App Password
- Check that GMAIL_USER matches the email that generated the App Password
- Wait a few minutes after adding environment variables before testing

## 📝 How It Works

1. User fills out contact form on your portfolio
2. Form sends POST request to `/api/contact`
3. Vercel serverless function (`api/contact.js`) receives the request
4. Function uses Nodemailer to send email via Gmail SMTP
5. Email arrives in your Gmail inbox
6. User sees success message

## 🔒 Security Notes

- Never commit `.env` files with real credentials to GitHub
- App Passwords are safer than using your main Gmail password
- Environment variables in Vercel are encrypted and secure
- The serverless function only accepts POST requests
- Input validation is performed before sending emails

---

**Need help?** Check the Vercel documentation: https://vercel.com/docs/concepts/functions/serverless-functions
