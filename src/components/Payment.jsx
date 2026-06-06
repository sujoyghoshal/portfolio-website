import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Smartphone, CheckCircle, X, Copy, Check,
  AlertCircle, ShieldCheck, Lock, Zap, Globe, Wrench,
  Star, ArrowRight, Clock,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const BACKEND_URL     = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

function isRazorpayConfigured() {
  return Boolean(RAZORPAY_KEY_ID && !RAZORPAY_KEY_ID.startsWith('your_'));
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

async function createOrder(amount, serviceName) {
  const res = await fetch(`${BACKEND_URL}/api/razorpay/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, serviceName }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create order');
  }
  return res.json();
}

async function verifyPayment(payload) {
  const res = await fetch(`${BACKEND_URL}/api/razorpay/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

/* ── per-service UI metadata (UI-only, not in portfolio.js) ── */
const SERVICE_META = {
  'Portfolio Website': {
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.12)',
    icon: '🌐',
    features: ['Responsive & mobile-first', 'SEO optimised', 'Contact form included', '1 month free support'],
    popular: false,
    duration: '3–5 days',
  },
  'Full Stack Application': {
    color: '#00D4FF',
    bg: 'rgba(0,212,255,0.12)',
    icon: '⚡',
    features: ['React + Java / Node backend', 'Database & REST APIs', 'Auth & payments built-in', 'Deployment-ready'],
    popular: true,
    duration: '2–4 weeks',
  },
  'Bug Fixing / Consulting': {
    color: '#F97316',
    bg: 'rgba(249,115,22,0.12)',
    icon: '🔧',
    features: ['Root-cause analysis', 'Code review included', 'Performance optimisations', 'Flexible — pay per hour'],
    popular: false,
    duration: 'On demand',
  },
};

/* ── Payment method tab ────────────────────────────────────── */
function MethodTab({ id, active, onClick, icon, label, sublabel, recommended }) {
  return (
    <button type="button" onClick={() => onClick(id)} className={`pay-method-tab ${active ? 'active' : ''}`}>
      <div className="pay-method-tab-radio">
        {active && <div className="pay-method-tab-dot" />}
      </div>
      <div className="pay-method-tab-icon">{icon}</div>
      <div className="pay-method-tab-text">
        <span className="pay-method-tab-label">{label}</span>
        <span className="pay-method-tab-sublabel">{sublabel}</span>
      </div>
      {recommended && <span className="pay-method-tab-badge">Recommended</span>}
    </button>
  );
}

/* ── Main component ────────────────────────────────────────── */
export default function Payment() {
  const [selectedService, setSelectedService] = useState(null);
  const [hours,           setHours]           = useState(1);
  const [paymentModal,    setPaymentModal]     = useState(false);
  const [payMethod,       setPayMethod]        = useState('razorpay');
  const [copied,          setCopied]           = useState(false);
  const [payerInfo,       setPayerInfo]        = useState({ name: '', email: '', phone: '' });
  const [rzpLoading,      setRzpLoading]       = useState(false);
  const [rzpError,        setRzpError]         = useState('');
  const [successData,     setSuccessData]      = useState(null);
  const [paymentFailed,   setPaymentFailed]    = useState(false);

  const getAmount = (s) => s?.perHour ? s.price * hours : (s?.price || 0);
  const amount = getAmount(selectedService);
  const meta   = selectedService ? SERVICE_META[selectedService.name] : null;

  const copyUPI = () => {
    navigator.clipboard.writeText(portfolioData.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openModal = () => {
    setRzpError('');
    setSuccessData(null);
    setPaymentFailed(false);
    setPayMethod('razorpay');
    setPaymentModal(true);
  };

  const closeModal = () => {
    if (rzpLoading) return;
    setPaymentModal(false);
    setRzpError('');
    setSuccessData(null);
    setPaymentFailed(false);
  };

  const handleRazorpay = async () => {
    setRzpError('');
    if (!isRazorpayConfigured()) {
      setRzpError('Add VITE_RAZORPAY_KEY_ID to .env to activate');
      return;
    }
    setRzpLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Could not load Razorpay SDK. Check your connection.');

      const order = await createOrder(amount, selectedService?.name);

      await new Promise((resolve, reject) => {
        const options = {
          key:         order.key_id || RAZORPAY_KEY_ID,
          amount:      order.amount,
          currency:    order.currency || 'INR',
          order_id:    order.order_id,
          name:        'Sujoy Ghoshal',
          description: selectedService?.name || 'Portfolio Service',
          image:       '/myphoto.jpeg',
          prefill:     { name: payerInfo.name, email: payerInfo.email, contact: payerInfo.phone },
          notes:       { service: selectedService?.name || '' },
          theme:       { color: '#00D4FF' },
          handler: async (response) => {
            const result = await verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            });
            if (result.verified) resolve(response);
            else reject(new Error('Payment verification failed.'));
          },
          modal: { ondismiss: () => reject(new Error('dismissed')) },
        };
        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', (r) => reject(new Error(r.error?.description || 'Payment failed')));
        rzp.open();
      });

      setSuccessData({ payment_id: `pay_${Date.now()}` });
    } catch (err) {
      if (err.message !== 'dismissed') {
        setRzpError(err.message || 'Payment failed. Try again.');
        setPaymentFailed(true);
        setTimeout(() => setPaymentFailed(false), 4000);
      }
    } finally {
      setRzpLoading(false);
    }
  };

  const handleUPIPaid = () => {
    setSuccessData({ payment_id: `upi_${Date.now()}`, method: 'UPI' });
  };

  /* ── JSX ─────────────────────────────────────────────────── */
  return (
    <section id="payment" className="py-20 px-4 sm:px-6 md:py-24">
      <div className="section-center">

        {/* ── Section header ── */}
        <div className="section-shell">
          <p className="section-sub">Hire Me</p>
          <h2 className="section-title">Services &amp; <span className="gradient-text">Pricing</span></h2>
          <p className="section-copy">
            Transparent pricing, zero hidden fees. Pay securely via Razorpay or direct UPI.
          </p>
        </div>

        {/* ── Service cards ── */}
        <div className="pay-service-grid">
          {portfolioData.services.map((service, i) => {
            const m          = SERVICE_META[service.name] || {};
            const isSelected = selectedService?.name === service.name;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedService(service)}
                className={`pay-service-card ${isSelected ? 'selected' : ''} ${m.popular ? 'popular' : ''}`}
                style={{ '--card-color': m.color }}
                whileHover={{ y: -6 }}
              >
                {m.popular && (
                  <div className="pay-popular-badge">
                    <Star size={10} fill="currentColor" /> Most Popular
                  </div>
                )}

                <div className="pay-svc-header">
                  <div className="pay-svc-icon" style={{ background: m.bg }}>
                    {m.icon}
                  </div>
                  <span className="pay-svc-type">{service.perHour ? 'Hourly' : 'Fixed Price'}</span>
                </div>

                <div className="pay-svc-body">
                  <h3 className="pay-svc-title">{service.name}</h3>
                  <p className="pay-svc-desc">{service.description}</p>
                </div>

                <ul className="pay-svc-features">
                  {(m.features || []).map((f) => (
                    <li key={f}>
                      <Check size={12} style={{ color: m.color, flexShrink: 0 }} />{f}
                    </li>
                  ))}
                </ul>

                <div className="pay-svc-footer">
                  <div>
                    <div className="pay-svc-price" style={{ color: m.color }}>
                      ₹{service.price.toLocaleString()}
                    </div>
                    <div className="pay-svc-price-meta">
                      {service.perHour ? 'per hour' : `Est. ${m.duration || ''}`}
                    </div>
                  </div>
                  <div
                    className={`pay-svc-select-btn ${isSelected ? 'active' : ''}`}
                    style={{ '--btn-color': m.color }}
                  >
                    {isSelected
                      ? <><Check size={13} />Selected</>
                      : <>Select<ArrowRight size={13} /></>
                    }
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Hours picker ── */}
        <AnimatePresence>
          {selectedService?.perHour && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pay-hours-bar"
            >
              <div>
                <p className="pay-hours-label">How many hours?</p>
                <p className="pay-hours-calc">
                  ₹{selectedService.price.toLocaleString()} × {hours} hr
                  {' = '}<strong>₹{amount.toLocaleString()}</strong>
                </p>
              </div>
              <div className="pay-hours-stepper">
                <button type="button" onClick={() => setHours(Math.max(1, hours - 1))}>−</button>
                <span>{hours}</span>
                <button type="button" onClick={() => setHours(hours + 1)}>+</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Proceed CTA ── */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={openModal}
                className="pay-cta-btn"
              >
                <Lock size={16} />
                Pay ₹{amount.toLocaleString()} Securely
                <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════
          CHECKOUT MODAL — 2-panel Stripe-style layout
      ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {paymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pay-overlay"
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              className="pay-modal"
            >
              {/* ── Success screen ── */}
              <AnimatePresence>
                {successData && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 18 }}
                    className="pay-success-state"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1, stiffness: 220, damping: 14 }}
                      className="pay-success-icon"
                    >
                      <CheckCircle size={40} />
                    </motion.div>
                    <h2 className="pay-success-title">Payment Successful!</h2>
                    <p className="pay-success-copy">
                      Thank you for your order. I'll reach out within 24 hours to discuss the next steps for your project.
                    </p>
                    <div className="pay-success-details">
                      <div>
                        <span>Service</span>
                        <strong>{selectedService?.name}</strong>
                      </div>
                      <div>
                        <span>Amount paid</span>
                        <strong>₹{amount.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span>Payment ID</span>
                        <strong className="font-mono text-xs">{successData.payment_id}</strong>
                      </div>
                      <div>
                        <span>Contact</span>
                        <strong>{portfolioData.email}</strong>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      onClick={closeModal}
                      className="btn-primary mt-6 justify-center w-full max-w-xs"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── 2-panel checkout ── */}
              {!successData && (
                <div className="pay-modal-split">

                  {/* LEFT — Order Summary */}
                  <div className="pay-order-panel">
                    {/* Brand */}
                    <div className="pay-order-brand">
                      <div className="pay-order-avatar">SG</div>
                      <div>
                        <p className="pay-order-name">Sujoy Ghoshal</p>
                        <p className="pay-order-role">Software Engineer</p>
                      </div>
                    </div>

                    {/* Selected service */}
                    <div
                      className="pay-order-service-card"
                      style={{ '--srv-color': meta?.color || '#00D4FF' }}
                    >
                      <span className="pay-order-svc-icon">{meta?.icon}</span>
                      <div>
                        <p className="pay-order-svc-name">{selectedService?.name}</p>
                        {selectedService?.perHour
                          ? <p className="pay-order-svc-meta">{hours} hour{hours > 1 ? 's' : ''} × ₹{selectedService.price.toLocaleString()}</p>
                          : <p className="pay-order-svc-meta"><Clock size={11} /> Est. {meta?.duration}</p>
                        }
                      </div>
                    </div>

                    {/* Price breakdown */}
                    <div className="pay-breakdown">
                      <div className="pay-breakdown-row">
                        <span>Subtotal</span>
                        <span>₹{amount.toLocaleString()}</span>
                      </div>
                      <div className="pay-breakdown-row">
                        <span>Platform fee</span>
                        <span style={{ color: '#4ade80' }}>Free</span>
                      </div>
                      <div className="pay-breakdown-row">
                        <span>GST</span>
                        <span>₹0</span>
                      </div>
                      <div className="pay-breakdown-divider" />
                      <div className="pay-breakdown-total">
                        <span>Total due</span>
                        <strong>₹{amount.toLocaleString()}</strong>
                      </div>
                    </div>

                    {/* Trust signals */}
                    <div className="pay-order-trust">
                      <div className="pay-trust-item"><ShieldCheck size={13} /> PCI DSS Level 1 Certified</div>
                      <div className="pay-trust-item"><Lock size={13} /> 256-bit SSL encryption</div>
                      <div className="pay-trust-item"><CheckCircle size={13} /> Verified merchant</div>
                    </div>
                  </div>

                  {/* RIGHT — Payment form */}
                  <div className="pay-form-panel">
                    {/* Header */}
                    <div className="pay-form-header">
                      <div>
                        <p className="pay-form-kicker">Secure Checkout</p>
                        <h3 className="pay-form-title">Complete Payment</h3>
                      </div>
                      <button type="button" onClick={closeModal} className="pay-close-btn">
                        <X size={17} />
                      </button>
                    </div>

                    {/* Amount pill */}
                    <div className="pay-amount-pill">
                      <span>Total</span>
                      <strong>₹{amount.toLocaleString()}</strong>
                    </div>

                    {/* Method selector */}
                    <p className="pay-section-label mt-5">Payment method</p>
                    <div className="pay-method-tabs">
                      <MethodTab
                        id="razorpay" active={payMethod === 'razorpay'} onClick={setPayMethod}
                        icon={<CreditCard size={17} />}
                        label="Razorpay"
                        sublabel="Cards · UPI · Netbanking · Wallets · EMI"
                        recommended
                      />
                      <MethodTab
                        id="upi" active={payMethod === 'upi'} onClick={setPayMethod}
                        icon={<Smartphone size={17} />}
                        label="Direct UPI"
                        sublabel="PhonePe · Google Pay · Paytm · BHIM"
                      />
                    </div>

                    {/* ── Razorpay panel ── */}
                    {payMethod === 'razorpay' && (
                      <div className="pay-panel-razorpay">
                        {/* Accepted methods chips */}
                        <div className="pay-chips-row">
                          {['💳 Cards', '📱 UPI', '🏦 Netbanking', '👛 Wallets', '💰 EMI'].map((m) => (
                            <span key={m} className="pay-chip">{m}</span>
                          ))}
                        </div>

                        {/* Customer details */}
                        <p className="pay-section-label mt-5">Your details <span style={{ fontWeight: 400, opacity: 0.6 }}>(for receipt)</span></p>
                        <div className="pay-fields">
                          {[
                            { key: 'name',  label: 'Full name',    type: 'text'  },
                            { key: 'email', label: 'Email address', type: 'email' },
                            { key: 'phone', label: 'Phone number',  type: 'tel'   },
                          ].map(({ key, label, type }) => (
                            <div key={key} className="pay-field-wrap">
                              <input
                                type={type}
                                id={`pf-${key}`}
                                placeholder=" "
                                value={payerInfo[key]}
                                onChange={(e) => setPayerInfo({ ...payerInfo, [key]: e.target.value })}
                                className="pay-field"
                              />
                              <label htmlFor={`pf-${key}`} className="pay-field-label">{label}</label>
                            </div>
                          ))}
                        </div>

                        {/* Error */}
                        {rzpError && (
                          <div className="pay-error-row">
                            <AlertCircle size={14} className="flex-shrink-0" />
                            {rzpError}
                          </div>
                        )}

                        {/* Pay button */}
                        <motion.button
                          whileHover={{ scale: rzpLoading ? 1 : 1.02 }}
                          whileTap={{ scale: rzpLoading ? 1 : 0.98 }}
                          disabled={rzpLoading}
                          onClick={handleRazorpay}
                          className="pay-pay-btn"
                        >
                          {rzpLoading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              />
                              Creating order…
                            </>
                          ) : (
                            <>
                              <Lock size={15} />
                              Pay ₹{amount.toLocaleString()} with Razorpay
                            </>
                          )}
                        </motion.button>

                        {!isRazorpayConfigured() && (
                          <p className="pay-config-hint">
                            Set <code>VITE_RAZORPAY_KEY_ID</code> in <code>.env</code> to activate
                          </p>
                        )}
                      </div>
                    )}

                    {/* ── Direct UPI panel ── */}
                    {payMethod === 'upi' && (
                      <div className="pay-panel-upi">
                        {/* App logos */}
                        <p className="pay-section-label mb-3">Pay with any UPI app</p>
                        <div className="pay-upi-apps">
                          {[
                            { name: 'PhonePe', color: '#5F259F' },
                            { name: 'Google Pay', color: '#4285F4' },
                            { name: 'Paytm',    color: '#00B9F1' },
                            { name: 'BHIM',     color: '#007BFF' },
                          ].map(({ name, color }) => (
                            <div key={name} className="pay-upi-app" style={{ '--app-color': color }}>
                              {name}
                            </div>
                          ))}
                        </div>

                        {/* UPI ID block */}
                        <p className="pay-section-label mt-5 mb-3">UPI ID</p>
                        <div className="pay-upi-id-wrap">
                          <div className="pay-upi-amount-pill">
                            Pay ₹{amount.toLocaleString()}
                          </div>
                          <div className="pay-upi-id-row">
                            <p className="pay-upi-id-text">{portfolioData.upiId}</p>
                            <button type="button" onClick={copyUPI} className="pay-copy-btn">
                              {copied
                                ? <><Check size={13} className="text-green-400" />Copied!</>
                                : <><Copy size={13} />Copy</>
                              }
                            </button>
                          </div>
                          <p className="pay-upi-hint">
                            Open any UPI app → New payment → Enter UPI ID above → Enter ₹{amount.toLocaleString()} → Pay
                          </p>
                        </div>

                        {/* Done button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          onClick={handleUPIPaid}
                          className="pay-upi-done-btn"
                        >
                          <CheckCircle size={15} />
                          I've completed the payment
                        </motion.button>
                      </div>
                    )}

                    {/* Security strip */}
                    <div className="pay-security-strip">
                      <Lock size={11} />
                      Secured by Razorpay &nbsp;·&nbsp; PCI DSS Level 1 &nbsp;·&nbsp; 256-bit SSL
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Failure toast ── */}
      <AnimatePresence>
        {paymentFailed && (
          <motion.div
            initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 rounded-2xl px-5 py-4 shadow-2xl"
            style={{ background: 'rgba(15,5,5,0.96)', border: '1px solid rgba(248,113,113,0.3)', backdropFilter: 'blur(12px)', minWidth: 300 }}
          >
            <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            <div>
              <p className="text-white font-semibold text-sm">Payment failed</p>
              <p className="text-slate-400 text-xs">Try again or switch to Direct UPI.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
