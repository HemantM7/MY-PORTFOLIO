require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
app.use(cors())
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

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
