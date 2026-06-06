import cors from 'cors';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import express from 'express';
import Razorpay from 'razorpay';

dotenv.config();

const app  = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// ─── Razorpay instance ────────────────────────────────────────
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID     || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    razorpay: isRazorpayConfigured(),
    env: process.env.RAZORPAY_KEY_ID?.startsWith('rzp_live') ? 'live' : 'test',
  });
});

// ─── Create Order ─────────────────────────────────────────────
// Frontend calls this FIRST to get a real order_id from Razorpay.
// Never trust the amount from the frontend directly — always set it here.
app.post('/api/razorpay/create-order', async (req, res) => {
  if (!isRazorpayConfigured()) {
    return res.status(400).json({ error: 'Razorpay not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env' });
  }

  const { amount, serviceName, currency = 'INR' } = req.body;

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount.' });
  }

  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(Number(amount) * 100),   // paise
      currency,
      receipt:  `rcpt_${Date.now()}`,
      notes: {
        service: serviceName || 'Portfolio Service',
      },
    });

    res.json({
      order_id:   order.id,
      amount:     order.amount,
      currency:   order.currency,
      key_id:     process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: err.message || 'Failed to create order.' });
  }
});

// ─── Verify Payment ───────────────────────────────────────────
// After Razorpay checkout succeeds, frontend sends the three IDs here.
// We verify the HMAC-SHA256 signature to confirm the payment is genuine.
app.post('/api/razorpay/verify', (req, res) => {
  if (!isRazorpayConfigured()) {
    return res.status(400).json({ error: 'Razorpay not configured.' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ verified: false, error: 'Missing payment fields.' });
  }

  const body     = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expected === razorpay_signature) {
    // ✅ Payment is genuine — you can update your DB here if needed.
    console.log(`✅ Payment verified: ${razorpay_payment_id}`);
    return res.json({ verified: true, payment_id: razorpay_payment_id });
  }

  console.warn(`❌ Signature mismatch for order: ${razorpay_order_id}`);
  res.status(400).json({ verified: false, error: 'Signature mismatch — payment may be fraudulent.' });
});

app.listen(port, () => {
  console.log(`\n🚀 Server running at http://localhost:${port}`);
  console.log(`   Razorpay: ${isRazorpayConfigured() ? '✅ configured' : '❌ not configured'}`);
});
