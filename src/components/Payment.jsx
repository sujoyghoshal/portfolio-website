import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Smartphone, CheckCircle, X, Copy, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export default function Payment() {
  const [selectedService, setSelectedService] = useState(null);
  const [hours, setHours] = useState(1);
  const [paymentModal, setPaymentModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const getAmount = (service) => service?.perHour ? service.price * hours : service?.price || 0;

  const copyUPI = () => {
    navigator.clipboard.writeText(portfolioData.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const amount = getAmount(selectedService);

  return (
    <section id="payment" className="py-20 px-4 sm:px-6 md:py-24">
      <div className="section-center">
        <div className="section-shell">
          <p className="section-sub">Hire Me</p>
          <h2 className="section-title">Services & <span className="gradient-text">Pricing</span></h2>
          <p className="payment-section-copy">Select a service, review the total clearly, and complete payment through a cleaner UPI or card flow.</p>
        </div>

        <div className="payment-grid mb-8">
          {portfolioData.services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedService(service)}
              className={`card payment-service-card ${
                selectedService?.name === service.name ? 'border-orange-500 shadow-lg shadow-orange-500/20' : ''
              }`}
            >
              <div className="payment-service-top">
                <div className="payment-service-icon">{service.icon}</div>
                <div className="payment-service-badge">{service.perHour ? 'Hourly' : 'Fixed'}</div>
              </div>

              <div className="payment-service-body">
                <h3 className="payment-service-title">{service.name}</h3>
                <p className="payment-service-copy">{service.description}</p>
              </div>

              <div className="payment-service-footer">
                <div className="payment-service-price-wrap">
                  <div className="payment-service-price">₹{service.price.toLocaleString()}</div>
                  {service.perHour && <span className="payment-service-price-meta">per hour</span>}
                </div>
              </div>

              {selectedService?.name === service.name && (
                <div className="payment-service-selected">
                  <CheckCircle size={13} /> Selected
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="card payment-summary-card"
            >
              <div className="payment-summary-copy">
                <p className="payment-summary-kicker">Selected Service</p>
                <h3 className="payment-summary-title">{selectedService.name}</h3>
                <p className="payment-summary-text">{selectedService.description}</p>
              </div>

              <div className="payment-summary-price">
                <span>Total</span>
                <strong>₹{amount.toLocaleString()}</strong>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedService?.perHour && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="card payment-hours-card">
              <div>
                <p className="payment-hours-title">How many hours?</p>
                <p className="payment-hours-copy">₹{selectedService.price.toLocaleString()} × {hours} = <span className="text-white font-bold">₹{amount.toLocaleString()}</span></p>
              </div>
              <div className="payment-hours-controls">
                <button type="button" onClick={() => setHours(Math.max(1, hours - 1))} className="payment-hours-btn">−</button>
                <span className="payment-hours-value">{hours}</span>
                <button type="button" onClick={() => setHours(hours + 1)} className="payment-hours-btn">+</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedService && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-center">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => setPaymentModal(true)}
                className="orange-btn text-base px-10 py-3.5 shadow-lg shadow-orange-500/30 payment-cta-btn">
                <CreditCard size={20} /> Pay ₹{amount.toLocaleString()}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {paymentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setPaymentModal(false)}>
            <motion.div initial={{ scale: 0.85, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={{ type: 'spring', stiffness: 120 }}
              className="card p-8 w-full shadow-2xl shadow-black/50 payment-modal-card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="payment-summary-kicker">Checkout</p>
                  <h3 className="text-white font-bold text-lg">Complete Payment</h3>
                </div>
                <button onClick={() => setPaymentModal(false)} className="payment-close-btn"><X size={20} /></button>
              </div>

              <div className="card payment-checkout-card mb-6">
                <div>
                  <p className="payment-checkout-label">Service</p>
                  <p className="payment-checkout-service">{selectedService?.name}</p>
                </div>
                <div className="payment-checkout-total">
                  <span>Total Amount</span>
                  <p className="text-xl font-black gradient-text">₹{amount.toLocaleString()}</p>
                </div>
              </div>

              <p className="payment-method-title">Payment Method</p>
              <div className="payment-method-grid mb-6">
                <div className="card payment-method-card">
                  <div className="payment-method-head">
                    <div className="payment-method-icon"><Smartphone size={17} className="text-white" /></div>
                    <div>
                      <p className="text-white font-semibold text-sm">UPI / PhonePe / GPay</p>
                      <p className="payment-method-note">Fastest option for instant payment</p>
                    </div>
                  </div>
                  <div className="payment-upi-box">
                    <p className="payment-upi-id">{portfolioData.upiId}</p>
                    <button type="button" onClick={copyUPI} className="payment-copy-btn">
                      {copied ? <Check size={15} className="text-green-400" /> : <Copy size={15} />}
                    </button>
                  </div>
                  <p className="payment-method-foot">Copy UPI ID and pay with any UPI app.</p>
                </div>

                <div className="card payment-method-card">
                  <div className="payment-method-head">
                    <div className="payment-method-icon payment-method-icon-alt"><CreditCard size={17} className="text-white" /></div>
                    <div>
                      <p className="text-white font-semibold text-sm">Credit / Debit Card</p>
                      <p className="payment-method-note">Fill in card details for direct payment</p>
                    </div>
                  </div>
                  <div className="space-y-2 payment-card-form">
                    <input placeholder="Card Number" className="input-field" />
                    <div className="grid grid-cols-2 gap-2 payment-card-fields">
                      <input placeholder="MM / YY" className="input-field" />
                      <input placeholder="CVV" className="input-field" />
                    </div>
                  </div>
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => { setPaymentModal(false); setPaymentSuccess(true); setTimeout(() => setPaymentSuccess(false), 3000); }}
                className="orange-btn w-full justify-center py-3.5 shadow-lg shadow-orange-500/25">
                <CreditCard size={18} /> Pay ₹{amount.toLocaleString()} Securely
              </motion.button>
              <p className="payment-security-note">Secure checkout flow with clear pricing and quick confirmation.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentSuccess && (
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 60 }}
            className="fixed payment-toast bottom-8 left-1/2 -translate-x-1/2 z-50 card rounded-xl px-6 py-4 flex items-center gap-3 border-orange-500/30 shadow-lg">
            <CheckCircle size={20} className="text-orange-400" />
            <div>
              <p className="text-white font-semibold text-sm">Payment Initiated!</p>
              <p className="text-slate-400 text-xs">I&apos;ll reach out within 24 hours.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
