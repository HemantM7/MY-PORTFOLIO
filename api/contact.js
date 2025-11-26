const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    // Get credentials from environment variables
    const GMAIL_USER = process.env.GMAIL_USER;
    const GMAIL_PASS = process.env.GMAIL_PASS;

    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('GMAIL_USER or GMAIL_PASS not configured');
      return res.status(500).json({ ok: false, error: 'Email service not configured' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `${name} <${email}>`,
      to: GMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);

    return res.status(200).json({ 
      ok: true, 
      messageId: info.messageId,
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}
