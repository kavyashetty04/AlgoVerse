import express from 'express';
import multer from 'multer';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// 1. Load environment variables
dotenv.config();

// 2. Create Express app
const app = express();
const upload = multer({ dest: 'uploads/' });

// 3. Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
app.use(express.json());

// 4. Create uploads directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// 5. Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// 6. Payment Endpoint (PUT THIS IN YOUR BACKEND)
app.post('/api/submit-payment', upload.single('paymentProof'), async (req, res) => {
  try {
    console.log('Received submission:', {
      body: req.body,
      file: req.file
    });

    const { tradingViewUsername, email } = req.body;
    
    if (!req.file || !tradingViewUsername || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process payment (add your logic here)
    
    // Send confirmation email
    await transporter.sendMail({
      from: `AlgoVerse <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Payment Confirmed',
      html: `
        <h1>Thank you for your purchase!</h1>
        <p>Username: ${tradingViewUsername}</p>
        <p>We've received your payment proof.</p>
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// 7. Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});