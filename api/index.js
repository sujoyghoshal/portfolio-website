import cors from 'cors';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import express from 'express';
import Razorpay from 'razorpay';

dotenv.config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID     || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

function isConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

/* ── Health ── */
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    razorpay: isConfigured(),
    env: process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live') ? 'live' : 'test',
  });
});

/* ── Create Order ── */
app.post('/api/razorpay/create-order', async (req, res) => {
  if (!isConfigured()) {
    return res.status(400).json({ error: 'Razorpay not configured.' });
  }
  const { amount, serviceName, currency = 'INR' } = req.body;
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount.' });
  }
  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(Number(amount) * 100),
      currency,
      receipt:  `rcpt_${Date.now()}`,
      notes:    { service: serviceName || 'Portfolio Service' },
    });
    res.json({
      order_id: order.id,
      amount:   order.amount,
      currency: order.currency,
      key_id:   process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create order.' });
  }
});

/* ── Verify Payment ── */
app.post('/api/razorpay/verify', (req, res) => {
  if (!isConfigured()) {
    return res.status(400).json({ error: 'Razorpay not configured.' });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ verified: false, error: 'Missing fields.' });
  }
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expected === razorpay_signature) {
    return res.json({ verified: true, payment_id: razorpay_payment_id });
  }
  res.status(400).json({ verified: false, error: 'Signature mismatch.' });
});

export default app;
