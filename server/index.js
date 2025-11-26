require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()

// Configure CORS to allow requests from your frontend
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://hemant-mistri.vercel.app',
  'https://your-portfolio-domain.vercel.app' // Replace with your actual domain
]

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS policy violation'), false)
    }
    return callback(null, true)
  },
  credentials: true
}))

app.use(express.json())

const PORT = process.env.PORT || 4000

// configure transporter using Gmail SMTP (use App Password)
const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_PASS = process.env.GMAIL_PASS

if (!GMAIL_USER || !GMAIL_PASS) {
  console.warn('GMAIL_USER or GMAIL_PASS not set. Server will run but send will fail until configured.')
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
})

// verify transporter at startup to catch auth/connectivity errors early
transporter.verify().then(() => {
  console.log('Nodemailer transporter verified — ready to send emails')
}).catch((err) => {
  console.error('Nodemailer verification failed. Check GMAIL_USER / GMAIL_PASS and network. Error:')
  console.error(err && err.message ? err.message : err)
})

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ ok: false, error: 'Missing fields' })

    const mailOptions = {
      from: `${name} <${email}>`,
      to: GMAIL_USER,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Sent:', info.messageId)
    // Return messageId and response from provider for debugging
    res.json({ ok: true, messageId: info.messageId, response: info.response })
  } catch (err) {
    console.error('Send error', err)
    // If nodemailer provides response or code include it in reply for debugging
    const debug = {
      message: err && err.message ? err.message : 'Unknown error',
      code: err && err.code ? err.code : undefined,
      response: err && err.response ? err.response : undefined,
    }
    res.status(500).json({ ok: false, error: 'Failed to send', debug })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// For Vercel serverless, export the app
// For local development, start the server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
}

module.exports = app
